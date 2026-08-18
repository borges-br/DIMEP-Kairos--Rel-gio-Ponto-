import "server-only";

import { createHash } from "node:crypto";
import type { PoolClient } from "pg";
import { externalRequest } from "@/lib/integrations/http";

type Obj = Record<string, unknown>;
export type ImuvDirection = "pull" | "push";
export type ImuvDiff = { field: string; current: string | null; incoming: string | null };
export type ImuvPreviewItem = {
  entity: "client" | "collaborator" | "project" | "task";
  externalId: string;
  label: string;
  action: "create" | "update" | "skip";
  fields: ImuvDiff[];
  note?: string;
};
export type ImuvPreview = {
  direction: ImuvDirection;
  digest: string;
  generatedAt: string;
  items: ImuvPreviewItem[];
  counts: { create: number; update: number; skip: number; totalRemote: number };
};
export type ImuvData = { people: Obj[]; collaborators: Obj[]; projects: Obj[]; tasks: Obj[] };

const asText = (value: unknown) => value === null || value === undefined ? null : String(value).trim() || null;
const asDigits = (value: unknown) => asText(value)?.replace(/\D/g, "") || null;
const active = (value: unknown) => value === true || value === 1 || value === "1";
const date = (value: unknown) => { const result = asText(value); return result && /^\d{4}-\d{2}-\d{2}/.test(result) ? result.slice(0, 10) : null; };
const normalized = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const isObject = (value: unknown): value is Obj => Boolean(value) && typeof value === "object" && !Array.isArray(value);

function validCpf(value: string | null) {
  if (!value || !/^\d{11}$/.test(value) || /^(\d)\1+$/.test(value)) return false;
  const n = value.split("").map(Number);
  for (let d = 9; d < 11; d += 1) {
    const sum = n.slice(0, d).reduce((acc, item, index) => acc + item * (d + 1 - index), 0);
    if (n[d] !== (sum % 11 < 2 ? 0 : 11 - sum % 11)) return false;
  }
  return true;
}

function resource(name: "PROJECTS" | "TASKS" | "PEOPLE" | "COLLABORATORS") {
  const defaults = { PROJECTS: "project", TASKS: "task", PEOPLE: "people", COLLABORATORS: "collaborator" };
  return process.env[`IMUV_${name}_PATH`]?.trim() || defaults[name];
}

async function pages(path: string, extras: Record<string, string> = {}) {
  const result: Obj[] = [];
  for (let page = 1; page <= 100; page += 1) {
    const query = new URLSearchParams({ active: "1", page: String(page), "per-page": "100", ...extras });
    const response = await externalRequest("IMUV", `${path}${path.includes("?") ? "&" : "?"}${query}`);
    if (!Array.isArray(response)) throw new Error(`IMUV: ${path} não retornou uma lista JSON`);
    const rows = response.filter(isObject);
    result.push(...rows);
    if (rows.length < 100) return result;
  }
  throw new Error(`IMUV: limite de paginação excedido em ${path}`);
}

export async function fetchImuvData(): Promise<ImuvData> {
  const [people, collaborators, projects, tasks] = await Promise.all([
    pages(resource("PEOPLE")), pages(resource("COLLABORATORS")),
    pages(resource("PROJECTS"), { expand: "members" }), pages(resource("TASKS")),
  ]);
  return { people, collaborators, projects, tasks };
}

const fieldDiffs = (fields: Array<[string, unknown, unknown]>) => fields.flatMap(([field, oldValue, newValue]) => {
  const current = asText(oldValue); const incoming = asText(newValue);
  return current === incoming ? [] : [{ field, current, incoming }];
});

async function localData(client: PoolClient, organizationId: string) {
  const [clients, collaborators, projects, tasks] = await Promise.all([
    client.query("select imuv_external_id,legal_name,document_digits,active from rdo.clients where organization_id=$1", [organizationId]),
    client.query(`select er.external_id,c.full_name,c.cpf_digits,c.active from rdo.collaborator_external_refs er
                   join rdo.collaborators c on c.id=er.collaborator_id
                   join rdo.integration_connections ic on ic.id=er.connection_id and ic.organization_id=er.organization_id
                  where er.organization_id=$1 and ic.provider='imuv'`, [organizationId]),
    client.query("select imuv_external_id,code,name,starts_on,active from rdo.projects where organization_id=$1", [organizationId]),
    client.query("select imuv_external_id,code,name,description,active from rdo.tasks where organization_id=$1", [organizationId]),
  ]);
  const map = (rows: Obj[], key: string) => new Map(rows.map((row) => [String(row[key]), row]));
  return { clients: map(clients.rows as Obj[], "imuv_external_id"), collaborators: map(collaborators.rows as Obj[], "external_id"), projects: map(projects.rows as Obj[], "imuv_external_id"), tasks: map(tasks.rows as Obj[], "imuv_external_id") };
}

const taskProject = (row: Obj) => asText(row.related_id ?? row.project_id ?? row.id_project);

export async function previewImuv(client: PoolClient, organizationId: string, direction: ImuvDirection, data: ImuvData): Promise<ImuvPreview> {
  const local = await localData(client, organizationId);
  const items: ImuvPreviewItem[] = [];
  if (direction === "pull") {
    for (const row of data.people) {
      const id = asText(row.id); if (!id) continue;
      const old = local.clients.get(id); const name = asText(row.company_name) || asText(row.name) || `Cliente ${id}`;
      const rawDocument = asDigits(row.cpf_cnpj); const document = rawDocument?.length === 11 || rawDocument?.length === 14 ? rawDocument : null;
      const fields = fieldDiffs([["Nome do cliente", old?.legal_name, name], ["CPF/CNPJ", old?.document_digits, document], ["Ativo", old?.active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "client", externalId: id, label: name, action: old ? "update" : "create", fields });
    }
    for (const row of data.collaborators) {
      const id = asText(row.id); if (!id) continue;
      const old = local.collaborators.get(id); const name = asText(row.name) || `Colaborador ${id}`;
      const rawCpf = asDigits(row.cpf_cnpj); const cpf = rawCpf?.length === 11 ? rawCpf : null;
      const fields = fieldDiffs([["Nome", old?.full_name, name], ["CPF", old?.cpf_digits, cpf], ["Ativo", old?.active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "collaborator", externalId: id, label: name, action: old ? "update" : "create", fields });
    }
    const projectIds = new Set(data.projects.map((row) => asText(row.id)).filter(Boolean));
    for (const row of data.projects) {
      const id = asText(row.id); if (!id) continue;
      const old = local.projects.get(id); const name = asText(row.name) || `Projeto ${id}`; const code = asText(row.code) || id;
      const fields = fieldDiffs([["Código", old?.code, code], ["Nome", old?.name, name], ["Data inicial", date(old?.starts_on), date(row.start_date)], ["Ativo", old?.active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "project", externalId: id, label: `${code} · ${name}`, action: old ? "update" : "create", fields });
    }
    for (const row of data.tasks) {
      const id = asText(row.id); if (!id) continue;
      const projectId = taskProject(row); const name = asText(row.name) || `Tarefa ${id}`; const code = asText(row.code) || id;
      if (!projectId || !projectIds.has(projectId)) {
        items.push({ entity: "task", externalId: id, label: name, action: "skip", fields: [], note: "Sem vínculo de projeto reconhecido no IMUV." }); continue;
      }
      const old = local.tasks.get(id);
      const fields = fieldDiffs([["Código", old?.code, code], ["Nome", old?.name, name], ["Descrição", old?.description, asText(row.description)], ["Ativo", old?.active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "task", externalId: id, label: `${code} · ${name}`, action: old ? "update" : "create", fields });
    }
  } else {
    const remote = new Map(data.projects.map((row) => [asText(row.id), row]));
    for (const [id, project] of local.projects) {
      const row = remote.get(id); if (!row) continue;
      const fields = fieldDiffs([["Código", row.code, project.code], ["Nome", row.name, project.name], ["Data inicial", date(row.start_date), date(project.starts_on)]]);
      if (fields.length) items.push({ entity: "project", externalId: id, label: `${project.code} · ${project.name}`, action: "update", fields });
    }
  }
  items.sort((a, b) => `${a.entity}:${a.externalId}`.localeCompare(`${b.entity}:${b.externalId}`));
  const digest = hash(items.map(({ entity, externalId, action, fields }) => ({ entity, externalId, action, fields })));
  return { direction, digest, generatedAt: new Date().toISOString(), items, counts: { create: items.filter((i) => i.action === "create").length, update: items.filter((i) => i.action === "update").length, skip: items.filter((i) => i.action === "skip").length, totalRemote: data.people.length + data.collaborators.length + data.projects.length + data.tasks.length } };
}

async function getConnection(client: PoolClient, organizationId: string) {
  const tenant = process.env.IMUV_TENANT?.trim(); const base = process.env.IMUV_API_BASE_URL?.trim();
  if (!tenant || !base) throw new Error("IMUV não configurado");
  const result = await client.query<{ id: string }>(`insert into rdo.integration_connections
    (organization_id,provider,external_tenant_key,base_url,secret_ref,settings,enabled)
    values ($1,'imuv',$2,$3,'env:IMUV_API_TOKEN','{}',true)
    on conflict (organization_id,provider,external_tenant_key) do update set base_url=excluded.base_url,enabled=true returning id`, [organizationId, tenant, base]);
  return result.rows[0].id;
}

async function saveSnapshot(client: PoolClient, organizationId: string, connectionId: string, runId: string, type: string, row: Obj) {
  const id = asText(row.id); if (!id) return;
  await client.query(`insert into rdo.integration_snapshots
    (organization_id,connection_id,sync_run_id,object_type,external_id,source_updated_at,payload,payload_sha256)
    values ($1,$2,$3,$4,$5,$6,$7::jsonb,$8) on conflict do nothing`,
    [organizationId, connectionId, runId, type, id, asText(row.updated_at), JSON.stringify(row), hash(row)]);
}

export async function applyImuvPull(client: PoolClient, organizationId: string, userId: string, data: ImuvData, preview: ImuvPreview) {
  await client.query("select pg_advisory_xact_lock(hashtext($1),hashtext('imuv-sync'))", [organizationId]);
  const connectionId = await getConnection(client, organizationId);
  const runResult = await client.query<{ id: string }>(`insert into rdo.sync_runs
    (organization_id,connection_id,object_type,direction,status,records_read,started_at)
    values ($1,$2,'master_data','inbound','running',$3,now()) returning id`, [organizationId, connectionId, preview.counts.totalRemote]);
  const runId = runResult.rows[0].id; let written = 0; const rejected = preview.counts.skip;
  const clientIds = new Map<string, string>();
  for (const row of data.people) {
    const id = asText(row.id); if (!id) continue; const name = asText(row.company_name) || asText(row.name) || `Cliente ${id}`; const rawDocument = asDigits(row.cpf_cnpj); const document = rawDocument?.length === 11 || rawDocument?.length === 14 ? rawDocument : null;
    const saved = await client.query<{ id: string }>(`insert into rdo.clients
      (organization_id,imuv_external_id,legal_name,normalized_name,document_raw,document_digits,document_type,document_is_valid,active,source_updated_at)
      values ($1,$2,$3,$4,$5,$6,$7,false,$8,$9) on conflict (organization_id,imuv_external_id) do update set
      legal_name=excluded.legal_name,normalized_name=excluded.normalized_name,document_raw=excluded.document_raw,
      document_digits=excluded.document_digits,document_type=excluded.document_type,active=excluded.active,source_updated_at=excluded.source_updated_at returning id`,
      [organizationId,id,name,normalized(name),asText(row.cpf_cnpj),document,document?.length===14?"cnpj":document?.length===11?"cpf":"unknown",active(row.active),asText(row.updated_at)]);
    clientIds.set(id,saved.rows[0].id); written += 1; await saveSnapshot(client,organizationId,connectionId,runId,"people",row);
  }
  const collaboratorIds = new Map<string,string>();
  for (const row of data.collaborators) {
    const id=asText(row.id); if(!id) continue; const name=asText(row.name)||`Colaborador ${id}`; const rawCpf=asDigits(row.cpf_cnpj); const cpf=rawCpf?.length===11?rawCpf:null;
    const linked=await client.query<{id:string}>(`select c.id from rdo.collaborator_external_refs er join rdo.collaborators c on c.id=er.collaborator_id
      where er.organization_id=$1 and er.connection_id=$2 and er.external_id=$3`,[organizationId,connectionId,id]);
    let collaboratorId=linked.rows[0]?.id;
    if(!collaboratorId&&validCpf(cpf)){const same=await client.query<{id:string}>("select id from rdo.collaborators where organization_id=$1 and cpf_digits=$2 and cpf_is_valid limit 1",[organizationId,cpf]);collaboratorId=same.rows[0]?.id;}
    if(collaboratorId) await client.query(`update rdo.collaborators set full_name=$3,normalized_name=$4,cpf_raw=$5,cpf_digits=$6,cpf_is_valid=$7,employment_status=$8,active=$9 where organization_id=$1 and id=$2`,[organizationId,collaboratorId,name,normalized(name),asText(row.cpf_cnpj),cpf,validCpf(cpf),active(row.active)?"active":"inactive",active(row.active)]);
    else {const made=await client.query<{id:string}>(`insert into rdo.collaborators (organization_id,full_name,normalized_name,cpf_raw,cpf_digits,cpf_is_valid,employment_status,active)
      values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`,[organizationId,name,normalized(name),asText(row.cpf_cnpj),cpf,validCpf(cpf),active(row.active)?"active":"inactive",active(row.active)]);collaboratorId=made.rows[0].id;}
    await client.query(`insert into rdo.collaborator_external_refs (organization_id,collaborator_id,connection_id,external_id,external_name,external_document_raw,external_document_digits,last_seen_at)
      values ($1,$2,$3,$4,$5,$6,$7,now()) on conflict (connection_id,external_id) do update set collaborator_id=excluded.collaborator_id,external_name=excluded.external_name,external_document_raw=excluded.external_document_raw,external_document_digits=excluded.external_document_digits,last_seen_at=now()`,[organizationId,collaboratorId,connectionId,id,name,asText(row.cpf_cnpj),cpf]);
    collaboratorIds.set(id,collaboratorId);written+=1;await saveSnapshot(client,organizationId,connectionId,runId,"collaborator",row);
  }
  const projectIds=new Map<string,string>();
  for(const row of data.projects){const id=asText(row.id);if(!id)continue;const peopleId=asText(row.people_id)||`project:${id}`;let clientId=clientIds.get(peopleId);if(!clientId){const fallbackName=asText(row.client_name)||`Cliente IMUV ${peopleId}`;const fallback=await client.query<{id:string}>(`insert into rdo.clients (organization_id,imuv_external_id,legal_name,normalized_name,document_type,document_is_valid,active) values ($1,$2,$3,$4,'unknown',false,true) on conflict (organization_id,imuv_external_id) do update set active=true returning id`,[organizationId,peopleId,fallbackName,normalized(fallbackName)]);clientId=fallback.rows[0].id;clientIds.set(peopleId,clientId);}const name=asText(row.name)||`Projeto ${id}`;const code=asText(row.code)||id;const completed=Boolean(date(row.date_finished));
    const saved=await client.query<{id:string}>(`insert into rdo.projects (organization_id,client_id,imuv_external_id,code,name,normalized_name,status_raw,status_normalized,starts_on,ends_on,address_line,active,source_updated_at)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) on conflict (organization_id,imuv_external_id) do update set client_id=excluded.client_id,code=excluded.code,name=excluded.name,normalized_name=excluded.normalized_name,status_raw=excluded.status_raw,status_normalized=excluded.status_normalized,starts_on=excluded.starts_on,ends_on=excluded.ends_on,address_line=excluded.address_line,active=excluded.active,source_updated_at=excluded.source_updated_at returning id`,[organizationId,clientId,id,code,name,normalized(name),asText(row.status),completed?"completed":active(row.active)?"active":"cancelled",date(row.start_date),date(row.deadline),asText(row.address),active(row.active),asText(row.updated_at)]);
    projectIds.set(id,saved.rows[0].id);written+=1;await saveSnapshot(client,organizationId,connectionId,runId,"project",row);
    await client.query("update rdo.project_members set active=false where organization_id=$1 and project_id=$2 and source='imuv'",[organizationId,saved.rows[0].id]);
    const members=Array.isArray(row.members)?row.members:[];for(const member of members){const memberId=isObject(member)?asText(member.id??member.collaborator_id):asText(member);const collaboratorId=memberId?collaboratorIds.get(memberId):null;if(collaboratorId)await client.query(`insert into rdo.project_members (organization_id,project_id,collaborator_id,source,active,source_updated_at) values ($1,$2,$3,'imuv',true,$4) on conflict (project_id,collaborator_id) do update set active=true,source_updated_at=excluded.source_updated_at`,[organizationId,saved.rows[0].id,collaboratorId,asText(row.updated_at)]);}
    await client.query(`insert into rdo.work_locations (organization_id,project_id,location_type,label,normalized_label,active) values ($1,$2,'front','Local principal','LOCAL PRINCIPAL',true) on conflict (project_id,normalized_label) do update set active=true`,[organizationId,saved.rows[0].id]);
  }
  for(const row of data.tasks){const id=asText(row.id);if(!id)continue;const projectId=projectIds.get(taskProject(row)||"");if(!projectId)continue;const name=asText(row.name)||`Tarefa ${id}`;const code=asText(row.code)||id;const completed=Boolean(date(row.date_finished));
    await client.query(`insert into rdo.tasks (organization_id,project_id,imuv_external_id,code,name,normalized_name,description,status_raw,status_normalized,active,source_updated_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) on conflict (organization_id,imuv_external_id) do update set project_id=excluded.project_id,code=excluded.code,name=excluded.name,normalized_name=excluded.normalized_name,description=excluded.description,status_raw=excluded.status_raw,status_normalized=excluded.status_normalized,active=excluded.active,source_updated_at=excluded.source_updated_at`,[organizationId,projectId,id,code,name,normalized(name),asText(row.description),asText(row.status),completed?"completed":active(row.active)?"active":"cancelled",active(row.active),asText(row.updated_at)]);written+=1;await saveSnapshot(client,organizationId,connectionId,runId,"task",row);}
  await client.query(`update rdo.sync_runs set status=$3,records_written=$4,records_rejected=$5,finished_at=now() where organization_id=$1 and id=$2`,[organizationId,runId,rejected?"partial":"succeeded",written,rejected]);
  await client.query("update rdo.integration_connections set last_success_at=now() where organization_id=$1 and id=$2",[organizationId,connectionId]);
  await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason) values ($1,$2,'sync_runs',$3,'insert',$4::jsonb,'Importação IMUV confirmada')`,[organizationId,userId,runId,JSON.stringify({digest:preview.digest,written,rejected})]);
  return {runId,written,rejected};
}

export async function applyImuvPush(client:PoolClient,organizationId:string,userId:string,preview:ImuvPreview){
  const connectionId=await getConnection(client,organizationId);const runResult=await client.query<{id:string}>(`insert into rdo.sync_runs (organization_id,connection_id,object_type,direction,status,records_read,started_at) values ($1,$2,'project','outbound','running',$3,now()) returning id`,[organizationId,connectionId,preview.items.length]);const runId=runResult.rows[0].id;let written=0;const errors:string[]=[];
  for(const item of preview.items.filter((i)=>i.entity==="project"&&i.action==="update")){const result=await client.query<{code:string;name:string;starts_on:string|null}>("select code,name,starts_on from rdo.projects where organization_id=$1 and imuv_external_id=$2",[organizationId,item.externalId]);const project=result.rows[0];if(!project?.starts_on){errors.push(`${item.label}: data inicial obrigatória`);continue;}try{await externalRequest("IMUV",`${resource("PROJECTS")}/${encodeURIComponent(item.externalId)}`,{method:"PUT",body:{name:project.name,code:project.code,start_date:date(project.starts_on)}});written+=1;}catch(error){errors.push(`${item.label}: ${error instanceof Error?error.message:"erro desconhecido"}`);}}
  const status=errors.length?(written?"partial":"failed"):"succeeded";await client.query(`update rdo.sync_runs set status=$3,records_written=$4,records_rejected=$5,error_summary=$6,finished_at=now() where organization_id=$1 and id=$2`,[organizationId,runId,status,written,errors.length,errors.join(" | ").slice(0,4000)||null]);await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason) values ($1,$2,'sync_runs',$3,'export',$4::jsonb,'Envio de projetos ao IMUV confirmado')`,[organizationId,userId,runId,JSON.stringify({digest:preview.digest,written,errors:errors.length})]);return{runId,written,rejected:errors.length,errors};
}
