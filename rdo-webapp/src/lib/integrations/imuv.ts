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

const asText = (input: unknown): string | null => {
  if (input === null || input === undefined || Array.isArray(input)) return null;
  if (isObject(input)) {
    for (const key of ["name", "description", "label", "title", "code", "value"]) {
      const nested = input[key];
      if (nested !== null && nested !== undefined && typeof nested !== "object") {
        const result = String(nested).trim();
        if (result) return result;
      }
    }
    return null;
  }
  const result = String(input).trim();
  return result && result !== "[object Object]" ? result : null;
};
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
    pages(resource("PROJECTS"), { expand: "projectCollaborators,people" }), pages(resource("TASKS"), { expand: "taskCollaborators,taskRelations" }),
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
    client.query(`select er.external_id, c.full_name as source_full_name,
                         coalesce(o.full_name_override,c.full_name) as full_name,
                         c.cpf_digits, c.email as source_email, coalesce(o.email_override,c.email) as email,
                         c.phone as source_phone, coalesce(o.phone_override,c.phone) as phone,
                         c.job_title as source_job_title, coalesce(o.job_title_override,c.job_title) as job_title,
                         c.department as source_department, coalesce(o.department_override,c.department) as department,
                         c.active as source_active, coalesce(o.active_override,c.active) as active
                    from rdo.collaborator_external_refs er
                   join rdo.collaborators c on c.id=er.collaborator_id
                   join rdo.integration_connections ic on ic.id=er.connection_id and ic.organization_id=er.organization_id
              left join rdo.collaborator_profile_overrides o on o.collaborator_id=c.id
                  where er.organization_id=$1 and ic.provider='imuv'`, [organizationId]),
    client.query("select imuv_external_id,code,name,starts_on,active from rdo.projects where organization_id=$1", [organizationId]),
    client.query("select imuv_external_id,code,name,description,active from rdo.tasks where organization_id=$1", [organizationId]),
  ]);
  // Vinculos ativos de origem imuv, agrupados por projeto, para a previa poder
  // mostrar quem entra e quem sai da equipe antes de gravar.
  const members = await client.query<{ imuv_external_id: string; full_name: string }>(
    `select p.imuv_external_id, c.full_name
       from rdo.project_members pm
       join rdo.projects p on p.id = pm.project_id
       join rdo.collaborators c on c.id = pm.collaborator_id
      where pm.organization_id = $1 and pm.active and pm.source = 'imuv'
        and p.imuv_external_id is not null`, [organizationId]);
  const projectMembers = new Map<string, string[]>();
  for (const row of members.rows) {
    const list = projectMembers.get(row.imuv_external_id) ?? [];
    list.push(row.full_name); projectMembers.set(row.imuv_external_id, list);
  }

  const map = (rows: Obj[], key: string) => new Map(rows.map((row) => [String(row[key]), row]));
  return { clients: map(clients.rows as Obj[], "imuv_external_id"), collaborators: map(collaborators.rows as Obj[], "external_id"), projects: map(projects.rows as Obj[], "imuv_external_id"), tasks: map(tasks.rows as Obj[], "imuv_external_id"), projectMembers };
}

/**
 * Tarefas do IMUV que na verdade sao frentes publicadas por este app. Sem esse
 * filtro elas voltariam pelo GET /task e apareceriam como atividade, duplicando
 * a mesma frente em duas telas.
 */
async function publishedTaskIds(client: PoolClient, organizationId: string) {
  const result = await client.query<{ imuv_task_id: string }>(
    `select imuv_task_id from rdo.work_locations
      where organization_id = $1 and imuv_task_id is not null`, [organizationId]);
  return new Set(result.rows.map((row) => row.imuv_task_id));
}

/**
 * Projeto ao qual a tarefa pertence.
 *
 * O GET /task nao devolve related_id nem project_id no corpo — esses nomes so
 * existem como filtro de consulta. O vinculo real vem em `taskRelations`
 * (expand), uma lista de relacionamentos polimorficos onde `type` e a classe do
 * modelo e `type_id` o id do registro. Ler os campos antigos fazia
 * taskProject() devolver null para toda tarefa, e o sync descartava todas.
 */
const projectModel = "app\\modules\\administrator\\models\\Project";

function taskProject(row: Obj) {
  const relations = Array.isArray(row.taskRelations) ? row.taskRelations : [];
  for (const entry of relations) {
    if (!isObject(entry)) continue;
    if (entry.active !== undefined && !active(entry.active)) continue;
    if (asText(entry.type) !== projectModel) continue;
    const id = asText(entry.type_id);
    if (id) return id;
  }
  // Formas alternativas, caso algum ambiente exponha o vinculo direto.
  return asText(row.related_id ?? row.project_id ?? row.id_project);
}

export async function previewImuv(client: PoolClient, organizationId: string, direction: ImuvDirection, data: ImuvData): Promise<ImuvPreview> {
  const local = await localData(client, organizationId);
  const ownFronts = await publishedTaskIds(client, organizationId);
  const items: ImuvPreviewItem[] = [];
  if (direction === "pull") {
    for (const row of data.people) {
      const id = asText(row.id); if (!id) continue;
      const old = local.clients.get(id); const name = asText(row.name) || asText(row.company_name) || `Cliente ${id}`;
      const rawDocument = asDigits(row.cpf_cnpj); const document = rawDocument?.length === 11 || rawDocument?.length === 14 ? rawDocument : null;
      const fields = fieldDiffs([["Nome do cliente", old?.legal_name, name], ["CPF/CNPJ", old?.document_digits, document], ["Ativo", old?.active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "client", externalId: id, label: name, action: old ? "update" : "create", fields });
    }
    for (const row of data.collaborators) {
      const id = asText(row.id); if (!id) continue;
      const old = local.collaborators.get(id); const name = asText(row.name) || `Colaborador ${id}`;
      const rawCpf = asDigits(row.cpf_cnpj); const cpf = rawCpf?.length === 11 ? rawCpf : null;
      const jobTitle = asText(row.job_level ?? row.profession ?? row.job_title ?? row.function);
      const department = asText(row.department ?? row.department_name);
      const fields = fieldDiffs([["Nome", old?.source_full_name, name], ["CPF", old?.cpf_digits, cpf], ["Função", old?.source_job_title, jobTitle], ["Departamento", old?.source_department, department], ["E-mail", old?.source_email, row.email], ["Telefone", old?.source_phone, row.phone], ["Ativo", old?.source_active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "collaborator", externalId: id, label: name, action: old ? "update" : "create", fields });
    }
    const projectIds = new Set(data.projects.map((row) => asText(row.id)).filter(Boolean));
    // Nome do colaborador por id do IMUV, para a previa listar pessoas e nao ids.
    const remoteCollaborators = new Map(data.collaborators.flatMap((row) => {
      const id = asText(row.id); const name = asText(row.name);
      return id ? [[id, name || `Colaborador ${id}`] as [string, string]] : [];
    }));
    const teamLabel = (names: string[]) => names.length ? [...names].sort().join(", ") : "Sem colaboradores";
    for (const row of data.projects) {
      const id = asText(row.id); if (!id) continue;
      const old = local.projects.get(id); const name = asText(row.name) || `Projeto ${id}`; const code = asText(row.code) || id;
      // Ids que a aplicacao nao conseguira resolver nao entram na previa como
      // vinculo futuro: o laco de gravacao tambem os descarta. Contamos a parte
      // para nao dar a impressao de que a equipe ficara menor sem explicacao.
      const incomingIds = projectMemberIds(row);
      const incomingNames = incomingIds.flatMap((memberId) => {
        const found = remoteCollaborators.get(memberId); return found ? [found] : [];
      });
      const unresolved = incomingIds.length - incomingNames.length;
      const fields = fieldDiffs([["Código", old?.code, code], ["Nome", old?.name, name], ["Data inicial", date(old?.starts_on), date(row.start_date)], ["Ativo", old?.active, active(row.active)],
        ["Colaboradores", old ? teamLabel(local.projectMembers.get(id) ?? []) : null, teamLabel(incomingNames)]]);
      const note = unresolved ? `${unresolved} vínculo(s) ignorado(s): colaborador não encontrado no IMUV.` : undefined;
      if (!old || fields.length) items.push({ entity: "project", externalId: id, label: `${code} · ${name}`, action: old ? "update" : "create", fields, note });
    }
    for (const row of data.tasks) {
      const id = asText(row.id); if (!id) continue;
      if (ownFronts.has(id)) continue;
      const projectId = taskProject(row); const name = asText(row.name) || `Tarefa ${id}`; const code = asText(row.code) || id;
      if (!projectId || !projectIds.has(projectId)) {
        items.push({ entity: "task", externalId: id, label: name, action: "skip", fields: [], note: "Sem vínculo de projeto reconhecido no IMUV." }); continue;
      }
      const old = local.tasks.get(id);
      const fields = fieldDiffs([["Código", old?.code, code], ["Nome", old?.name, name], ["Descrição", old?.description, asText(row.description)], ["Ativo", old?.active, active(row.active)]]);
      if (!old || fields.length) items.push({ entity: "task", externalId: id, label: `${code} · ${name}`, action: old ? "update" : "create", fields });
    }
  } else {
    const remote = new Map(data.collaborators.flatMap((row) => { const id = asText(row.id); return id ? [[id, row] as const] : []; }));
    for (const [id, collaborator] of local.collaborators) {
      const row = remote.get(id); if (!row) continue;
      const fields = fieldDiffs([
        ["Nome", row.name, collaborator.full_name], ["CPF", asDigits(row.cpf_cnpj), collaborator.cpf_digits],
        ["E-mail", row.email, collaborator.email], ["Telefone", row.phone, collaborator.phone],
        ["Ativo", active(row.active), collaborator.active],
      ]);
      if (fields.length) items.push({ entity: "collaborator", externalId: id, label: asText(collaborator.full_name) || `Colaborador ${id}`, action: "update", fields });
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

/**
 * Vinculos projeto-colaborador vindos de `expand=projectCollaborators`. A linha
 * e um pivo: `id` e o identificador do proprio vinculo (144, 145...), NAO do
 * colaborador, entao `collaborator_id` tem que vir primeiro na precedencia.
 * `members` fica aceito como forma alternativa por compatibilidade.
 */
function projectMemberIds(row: Obj): string[] {
  const raw = Array.isArray(row.projectCollaborators) ? row.projectCollaborators
    : Array.isArray(row.members) ? row.members : [];
  const ids: string[] = [];
  for (const entry of raw) {
    if (!isObject(entry)) { const plain = asText(entry); if (plain) ids.push(plain); continue; }
    // Vinculo desativado no IMUV nao entra: o laco abaixo ja zerou os locais.
    if (entry.active !== undefined && !active(entry.active)) continue;
    const nested = isObject(entry.collaborator) ? entry.collaborator : null;
    const id = asText(entry.collaborator_id) || asText(nested?.id) || asText(entry.id);
    if (id) ids.push(id);
  }
  return ids;
}

/**
 * Nome fantasia (`name`) na frente da razao social (`company_name`): e mais curto
 * no card e distingue unidades do mesmo grupo ("BRIDGESTONE CAMPINAS - BANDAS"
 * contra "BRIDGESTONE DO BRASIL INDUSTRIA E COMERCIO LTDA."). A mesma ordem vale
 * no preview e no laco de pessoas, para o mesmo cliente nao receber dois nomes.
 *
 * Cliente embutido no projeto via `expand=people`. Serve de rede de seguranca
 * quando o /people paginado nao trouxe a pessoa (ela esta inativa, por exemplo)
 * e o projeto ficaria com o rotulo sintetico "Cliente IMUV {id}".
 */
function embeddedClient(row: Obj) {
  const people = isObject(row.people) ? row.people : null;
  if (!people) return null;
  const name = asText(people.name) || asText(people.company_name);
  if (!name) return null;
  const digits = asDigits(people.cpf_cnpj);
  const document = digits?.length === 11 || digits?.length === 14 ? digits : null;
  return { name, document, documentRaw: asText(people.cpf_cnpj), updatedAt: asText(people.updated_at) };
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
    const id = asText(row.id); if (!id) continue; const name = asText(row.name) || asText(row.company_name) || `Cliente ${id}`; const rawDocument = asDigits(row.cpf_cnpj); const document = rawDocument?.length === 11 || rawDocument?.length === 14 ? rawDocument : null;
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
    const id=asText(row.id); if(!id) continue; const name=asText(row.name)||`Colaborador ${id}`; const rawCpf=asDigits(row.cpf_cnpj); const cpf=rawCpf?.length===11?rawCpf:null; const email=asText(row.email); const phone=asText(row.phone); const jobTitle=asText(row.job_level??row.profession??row.job_title??row.function); const department=asText(row.department??row.department_name); const employeeNumber=asText(row.registration??row.employee_number??row.code);
    const linked=await client.query<{id:string}>(`select c.id from rdo.collaborator_external_refs er join rdo.collaborators c on c.id=er.collaborator_id
      where er.organization_id=$1 and er.connection_id=$2 and er.external_id=$3`,[organizationId,connectionId,id]);
    let collaboratorId=linked.rows[0]?.id;
    if(!collaboratorId&&validCpf(cpf)){const same=await client.query<{id:string}>("select id from rdo.collaborators where organization_id=$1 and cpf_digits=$2 and cpf_is_valid limit 1",[organizationId,cpf]);collaboratorId=same.rows[0]?.id;}
    if(collaboratorId) await client.query(`update rdo.collaborators set full_name=$3,normalized_name=$4,cpf_raw=$5,cpf_digits=$6,cpf_is_valid=$7,employment_status=$8,active=$9,email=$10,phone=$11,job_title=coalesce($12,job_title),department=coalesce($13,department),employee_number=coalesce($14,employee_number) where organization_id=$1 and id=$2`,[organizationId,collaboratorId,name,normalized(name),asText(row.cpf_cnpj),cpf,validCpf(cpf),active(row.active)?"active":"inactive",active(row.active),email,phone,jobTitle,department,employeeNumber]);
    else {const made=await client.query<{id:string}>(`insert into rdo.collaborators (organization_id,full_name,normalized_name,cpf_raw,cpf_digits,cpf_is_valid,employment_status,active,email,phone,job_title,department,employee_number)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning id`,[organizationId,name,normalized(name),asText(row.cpf_cnpj),cpf,validCpf(cpf),active(row.active)?"active":"inactive",active(row.active),email,phone,jobTitle,department,employeeNumber]);collaboratorId=made.rows[0].id;}
    await client.query(`insert into rdo.collaborator_external_refs (organization_id,collaborator_id,connection_id,external_id,external_name,external_document_raw,external_document_digits,last_seen_at)
      values ($1,$2,$3,$4,$5,$6,$7,now()) on conflict (connection_id,external_id) do update set collaborator_id=excluded.collaborator_id,external_name=excluded.external_name,external_document_raw=excluded.external_document_raw,external_document_digits=excluded.external_document_digits,last_seen_at=now()`,[organizationId,collaboratorId,connectionId,id,name,asText(row.cpf_cnpj),cpf]);
    collaboratorIds.set(id,collaboratorId);written+=1;await saveSnapshot(client,organizationId,connectionId,runId,"collaborator",row);
  }
  const projectIds=new Map<string,string>();
  for(const row of data.projects){const id=asText(row.id);if(!id)continue;const peopleId=asText(row.people_id)||`project:${id}`;let clientId=clientIds.get(peopleId);if(!clientId){const embedded=embeddedClient(row);const fallbackName=embedded?.name||`Cliente IMUV ${peopleId}`;const documentType=embedded?.document?.length===14?"cnpj":embedded?.document?.length===11?"cpf":"unknown";
    // Com nome real vindo do expand, corrige tambem os registros que ficaram
    // gravados com o rotulo sintetico. Sem nome real, nunca sobrescreve o que
    // ja esta no banco: um rotulo sintetico nao pode apagar um nome bom.
    const fallback=await client.query<{id:string}>(`insert into rdo.clients (organization_id,imuv_external_id,legal_name,normalized_name,document_raw,document_digits,document_type,document_is_valid,active,source_updated_at) values ($1,$2,$3,$4,$5,$6,$7,false,true,$8) on conflict (organization_id,imuv_external_id) do update set active=true${embedded?",legal_name=excluded.legal_name,normalized_name=excluded.normalized_name,document_raw=excluded.document_raw,document_digits=excluded.document_digits,document_type=excluded.document_type,source_updated_at=excluded.source_updated_at":""} returning id`,[organizationId,peopleId,fallbackName,normalized(fallbackName),embedded?.documentRaw??null,embedded?.document??null,documentType,embedded?.updatedAt??null]);clientId=fallback.rows[0].id;clientIds.set(peopleId,clientId);}const name=asText(row.name)||`Projeto ${id}`;const code=asText(row.code)||id;const completed=Boolean(date(row.date_finished));
    const saved=await client.query<{id:string}>(`insert into rdo.projects (organization_id,client_id,imuv_external_id,code,name,normalized_name,status_raw,status_normalized,starts_on,ends_on,address_line,active,source_updated_at)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) on conflict (organization_id,imuv_external_id) do update set client_id=excluded.client_id,code=excluded.code,name=excluded.name,normalized_name=excluded.normalized_name,status_raw=excluded.status_raw,status_normalized=excluded.status_normalized,starts_on=excluded.starts_on,ends_on=excluded.ends_on,address_line=excluded.address_line,active=excluded.active,source_updated_at=excluded.source_updated_at returning id`,[organizationId,clientId,id,code,name,normalized(name),asText(row.status),completed?"completed":active(row.active)?"active":"cancelled",date(row.start_date),date(row.deadline),asText(row.address),active(row.active),asText(row.updated_at)]);
    projectIds.set(id,saved.rows[0].id);written+=1;await saveSnapshot(client,organizationId,connectionId,runId,"project",row);
    await client.query("update rdo.project_members set active=false where organization_id=$1 and project_id=$2 and source='imuv'",[organizationId,saved.rows[0].id]);
    for(const memberId of projectMemberIds(row)){const collaboratorId=collaboratorIds.get(memberId);if(collaboratorId)await client.query(`insert into rdo.project_members (organization_id,project_id,collaborator_id,source,active,source_updated_at) values ($1,$2,$3,'imuv',true,$4) on conflict (project_id,collaborator_id) do update set active=true,source_updated_at=excluded.source_updated_at`,[organizationId,saved.rows[0].id,collaboratorId,asText(row.updated_at)]);}
    await client.query(`insert into rdo.work_locations (organization_id,project_id,location_type,label,normalized_label,active) values ($1,$2,'front','Local principal','LOCAL PRINCIPAL',true) on conflict (project_id,normalized_label) do update set active=true`,[organizationId,saved.rows[0].id]);
  }
  const ownFronts=await publishedTaskIds(client,organizationId);
  for(const row of data.tasks){const id=asText(row.id);if(!id)continue;if(ownFronts.has(id))continue;const projectId=projectIds.get(taskProject(row)||"");if(!projectId)continue;const name=asText(row.name)||`Tarefa ${id}`;const code=asText(row.code)||id;const completed=Boolean(date(row.date_finished));
    const savedTask=await client.query<{id:string}>(`insert into rdo.tasks (organization_id,project_id,imuv_external_id,code,name,normalized_name,description,status_raw,status_normalized,active,source_updated_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) on conflict (organization_id,imuv_external_id) do update set project_id=excluded.project_id,code=excluded.code,name=excluded.name,normalized_name=excluded.normalized_name,description=excluded.description,status_raw=excluded.status_raw,status_normalized=excluded.status_normalized,active=excluded.active,source_updated_at=excluded.source_updated_at returning id`,[organizationId,projectId,id,code,name,normalized(name),asText(row.description),asText(row.status),completed?"completed":active(row.active)?"active":"cancelled",active(row.active),asText(row.updated_at)]);
    await client.query("update rdo.task_assignees set active=false where organization_id=$1 and task_id=$2 and source='imuv'",[organizationId,savedTask.rows[0].id]);
    const rawAssignees=Array.isArray(row.taskCollaborators)?row.taskCollaborators:Array.isArray(row.task_collaborators)?row.task_collaborators:Array.isArray(row.collaborators)?row.collaborators:[];
    for(const entry of rawAssignees){const nested=isObject(entry)&&isObject(entry.collaborator)?entry.collaborator:null;const externalId=isObject(entry)?asText(entry.id_collaborator??entry.collaborator_id??nested?.id??entry.id):asText(entry);const collaboratorId=externalId?collaboratorIds.get(externalId):null;if(collaboratorId)await client.query(`insert into rdo.task_assignees (organization_id,task_id,collaborator_id,source,active,source_updated_at) values ($1,$2,$3,'imuv',true,$4) on conflict (task_id,collaborator_id) do update set active=true,source_updated_at=excluded.source_updated_at`,[organizationId,savedTask.rows[0].id,collaboratorId,asText(row.updated_at)]);}
    written+=1;await saveSnapshot(client,organizationId,connectionId,runId,"task",row);}
  await client.query(`update rdo.sync_runs set status=$3,records_written=$4,records_rejected=$5,finished_at=now() where organization_id=$1 and id=$2`,[organizationId,runId,rejected?"partial":"succeeded",written,rejected]);
  await client.query("update rdo.integration_connections set last_success_at=now() where organization_id=$1 and id=$2",[organizationId,connectionId]);
  await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason) values ($1,$2,'sync_runs',$3,'insert',$4::jsonb,'Importação IMUV confirmada')`,[organizationId,userId,runId,JSON.stringify({digest:preview.digest,written,rejected})]);
  return {runId,written,rejected};
}

/**
 * Publica uma frente no IMUV como Tarefa.
 *
 * O IMUV esta em producao ha tempo, entao esta funcao e deliberadamente a mais
 * estreita possivel:
 *
 * - **So cria.** Um unico POST /task. Nao existe PUT nem DELETE neste modulo,
 *   e nada aqui toca em registro que ja existia no IMUV.
 * - **Payload minimo.** Apenas `name`, `start_date` e o vinculo com o projeto.
 *   Nada de status, orcamento, responsaveis ou prioridade: campo que nao e
 *   enviado e campo que nao pode ser estragado.
 *
 *   `start_date` entra contrariando a documentacao, que o marca como optional:
 *   na pratica o IMUV recusa sem ele ("Data de inicio nao pode ficar em
 *   branco"). Usamos a data de hoje em America/Sao_Paulo, mesma convencao do
 *   resto do app, porque a frente passa a existir no momento do cadastro.
 * - **Desligada por padrao.** Sem IMUV_ALLOW_TASK_PUBLISH=true a funcao nem
 *   chega a montar a requisicao.
 */
function taskPublishEnabled() {
  return process.env.IMUV_ALLOW_TASK_PUBLISH?.trim() === "true";
}

export async function publishFrontAsImuvTask(input: { label: string; projectExternalId: string }) {
  if (!taskPublishEnabled()) throw new Error("IMUV_PUBLISH_DISABLED");
  // O id do projeto vai para dentro do corpo: so aceitamos o formato que o IMUV
  // usa, para nao mandar lixo a um sistema em producao.
  if (!/^\d+$/.test(input.projectExternalId)) throw new Error("IMUV_PROJECT_ID_INVALID");
  const name = input.label.trim().slice(0, 200);
  if (!name) throw new Error("IMUV_TASK_NAME_REQUIRED");

  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
  const created = await externalRequest("IMUV", resource("TASKS"), {
    method: "POST",
    body: {
      name,
      start_date: today,
      relations: [{
        type: "app\\modules\\administrator\\models\\Project",
        type_id: Number(input.projectExternalId),
      }],
    },
  });

  const taskId = isObject(created) ? asText(created.id) : null;
  // Sem o id nao ha como o sync reconhecer a tarefa como nossa, e ela voltaria
  // como atividade. Falhar alto e melhor do que perder o rastro: a mensagem
  // precisa deixar claro que existe uma tarefa orfa a conferir no IMUV.
  if (!taskId) throw new Error("IMUV_TASK_ID_MISSING");
  return { taskId };
}

export async function applyImuvPush(client:PoolClient,organizationId:string,userId:string,preview:ImuvPreview){
  const connectionId=await getConnection(client,organizationId);const runResult=await client.query<{id:string}>(`insert into rdo.sync_runs (organization_id,connection_id,object_type,direction,status,records_read,started_at) values ($1,$2,'collaborator','outbound','running',$3,now()) returning id`,[organizationId,connectionId,preview.items.length]);const runId=runResult.rows[0].id;let written=0;const errors:string[]=[];
  for(const item of preview.items.filter((i)=>i.entity==="collaborator"&&i.action==="update")){
    const result=await client.query<{full_name:string;cpf_digits:string|null;email:string|null;phone:string|null;active:boolean}>(`select coalesce(o.full_name_override,c.full_name) as full_name,c.cpf_digits,
      coalesce(o.email_override,c.email) as email,coalesce(o.phone_override,c.phone) as phone,
      coalesce(o.active_override,c.active) as active from rdo.collaborator_external_refs er
      join rdo.collaborators c on c.id=er.collaborator_id
      left join rdo.collaborator_profile_overrides o on o.collaborator_id=c.id
      where er.organization_id=$1 and er.external_id=$2 and er.connection_id=$3`,[organizationId,item.externalId,connectionId]);
    const collaborator=result.rows[0];if(!collaborator){errors.push(`${item.label}: vínculo IMUV não encontrado`);continue;}
    const form=new FormData();form.set("name",collaborator.full_name);form.set("active",collaborator.active?"1":"0");
    if(collaborator.cpf_digits)form.set("cpf_cnpj",collaborator.cpf_digits);if(collaborator.email)form.set("email",collaborator.email);if(collaborator.phone)form.set("phone",collaborator.phone);
    try{await externalRequest("IMUV",`${resource("COLLABORATORS")}/${encodeURIComponent(item.externalId)}`,{method:"PUT",body:form});written+=1;}catch(error){errors.push(`${item.label}: ${error instanceof Error?error.message:"erro desconhecido"}`);}
  }
  const status=errors.length?(written?"partial":"failed"):"succeeded";await client.query(`update rdo.sync_runs set status=$3,records_written=$4,records_rejected=$5,error_summary=$6,finished_at=now() where organization_id=$1 and id=$2`,[organizationId,runId,status,written,errors.length,errors.join(" | ").slice(0,4000)||null]);await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason) values ($1,$2,'sync_runs',$3,'export',$4::jsonb,'Envio cadastral de funcionários ao IMUV confirmado')`,[organizationId,userId,runId,JSON.stringify({digest:preview.digest,written,errors:errors.length})]);return{runId,written,rejected:errors.length,errors};
}
