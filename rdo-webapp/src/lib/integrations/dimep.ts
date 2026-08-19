import "server-only";

import { createHash } from "node:crypto";
import type { PoolClient } from "pg";
import { DIMEP_MAX_PERIOD_DAYS, DIMEP_PAGE_WINDOW_DAYS } from "@/lib/integrations/dimep-constants";
import { externalRequest } from "@/lib/integrations/http";

type Obj = Record<string, unknown>;
type EmployeeAction = "create" | "update" | "link" | "review" | "skip";
export type DimepEmployeePreviewItem = {
  externalId: string; name: string; cpf: string | null; employeeNumber: string | null;
  action: EmployeeAction; candidateId?: string; candidateName?: string; note?: string;
};
export type DimepEmployeePreview = {
  stage: "employees"; digest: string; generatedAt: string; items: DimepEmployeePreviewItem[];
  counts: Record<EmployeeAction, number> & { total: number };
};
export type DimepPunchPreviewItem = {
  externalEmployeeId: string; employeeName: string; workDate: string; punches: number;
  pairs: number; issues: number; linked: boolean;
};
export type DimepPunchPreview = {
  stage: "punches"; digest: string; generatedAt: string; startDate: string; endDate: string;
  items: DimepPunchPreviewItem[]; counts: { punches: number; employees: number; pairs: number; issues: number; unlinked: number; invalid: number };
};
export type DimepPreview = DimepEmployeePreview | DimepPunchPreview;
export type DimepEmployeeConfirmation = { externalId: string; candidateId: string };

const isObject = (value: unknown): value is Obj => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const text = (input: unknown): string | null => {
  if (input === null || input === undefined || Array.isArray(input)) return null;
  if (isObject(input)) {
    for (const key of ["Descricao", "Description", "Nome", "Name", "Titulo", "Title", "Label", "Codigo", "Code"]) {
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
const digits = (value: unknown) => text(value)?.replace(/\D/g, "") || null;
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const normalized = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
const value = (row: Obj, ...names: string[]) => { for (const name of names) if (row[name] !== undefined && row[name] !== null) return row[name]; return null; };

function rows(response: unknown): Obj[] {
  if (Array.isArray(response)) return response.filter(isObject);
  if (!isObject(response)) return [];
  for (const key of ["Obj", "obj", "Data", "data", "Items", "items", "Result", "result"]) {
    if (Array.isArray(response[key])) return (response[key] as unknown[]).filter(isObject);
  }
  return [];
}

type DimepPage = { items: Obj[]; currentPage: number | null; totalPages: number | null };

function positiveInteger(value: unknown) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function page(response: unknown): DimepPage {
  if (isObject(response) && value(response, "Sucesso", "Success") === false) {
    throw new Error(`DIMEP: ${text(value(response, "Mensagem", "Message")) || "consulta recusada"}`);
  }
  return {
    items: rows(response),
    currentPage: isObject(response) ? positiveInteger(value(response, "PaginaAtual", "CurrentPage", "Page")) : null,
    totalPages: isObject(response) ? positiveInteger(value(response, "TotalPagina", "TotalPaginas", "TotalPages")) : null,
  };
}

function logDimep(event: string, details: Record<string, unknown>) {
  console.info(`[dimep] ${event}`, JSON.stringify(details));
}

function validCpf(cpf: string | null) {
  if (!cpf || !/^\d{11}$/.test(cpf) || /^(\d)\1+$/.test(cpf)) return false;
  const n = cpf.split("").map(Number);
  for (let d = 9; d < 11; d += 1) {
    const sum = n.slice(0, d).reduce((acc, item, index) => acc + item * (d + 1 - index), 0);
    if (n[d] !== (sum % 11 < 2 ? 0 : 11 - sum % 11)) return false;
  }
  return true;
}

function resource(name: "EMPLOYEES" | "MARKS" | "POINTER_ACK") {
  const defaults = {
    EMPLOYEES: "RestServiceApi/People/SearchPeople",
    MARKS: "RestServiceApi/Appointment/GetAppointmentsPointer",
    POINTER_ACK: "RestServiceApi/Appointment/SetAppointmentsPointer",
  };
  return process.env[`DIMEP_${name}_PATH`]?.trim() || defaults[name];
}

function employee(row: Obj) {
  const externalId = text(value(row, "Id", "ID", "PessoaID", "PessoaId", "id"));
  const sourceName = text(value(row, "Nome", "Name", "NomePessoa", "Pessoa", "name"));
  const name = sourceName || (externalId ? `Funcionário DIMEP ${externalId}` : "Funcionário DIMEP");
  const rawCpf = digits(value(row, "CPF", "Cpf", "CpfPessoa", "cpf"));
  return {
    externalId, name, hasName: Boolean(sourceName), normalizedName: normalized(name), cpf: rawCpf?.length === 11 ? rawCpf : null,
    cpfRaw: text(value(row, "CPF", "Cpf", "CpfPessoa", "cpf")),
    employeeNumber: text(value(row, "Matricula", "MATRICULA", "Numero", "matricula")),
    jobTitle: text(value(row, "Cargo", "DescricaoCargo", "Funcao", "JobTitle")),
    department: text(value(row, "Estrutura", "EstruturaOrganizacional", "Departamento", "Department")),
    active: !(value(row, "Excluido", "Deleted", "deleted") === true || value(row, "Excluido", "Deleted", "deleted") === "true"),
    row,
  };
}

async function paged(path: string, requestBody: (page: number) => Obj) {
  const all: Obj[] = []; let previous = ""; const startedAt = Date.now();
  logDimep("consulta iniciada", { path });
  for (let requestedPage = 1; requestedPage <= 100; requestedPage += 1) {
    const pageStartedAt = Date.now();
    const result = page(await externalRequest("DIMEP", path, { method: "POST", body: requestBody(requestedPage) }));
    logDimep("página recebida", {
      path, requestedPage, currentPage: result.currentPage, totalPages: result.totalPages,
      records: result.items.length, durationMs: Date.now() - pageStartedAt,
    });
    if (!result.items.length) {
      logDimep("consulta concluída", { path, pages: requestedPage, records: all.length, durationMs: Date.now() - startedAt });
      return all;
    }
    const signature = hash(result.items);
    if (signature === previous) {
      logDimep("paginação repetida interrompida", { path, requestedPage, records: all.length, durationMs: Date.now() - startedAt });
      return all;
    }
    previous = signature; all.push(...result.items);
    const currentPage = result.currentPage ?? requestedPage;
    if (result.totalPages !== null && currentPage >= result.totalPages) {
      logDimep("consulta concluída", { path, pages: currentPage, records: all.length, durationMs: Date.now() - startedAt });
      return all;
    }
  }
  throw new Error(`DIMEP: limite de paginação excedido em ${path}`);
}

export function validateDimepPeriod(startDate: string, endDate: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) throw new Error("Período DIMEP inválido.");
  const start = new Date(`${startDate}T12:00:00Z`); const end = new Date(`${endDate}T12:00:00Z`);
  const days = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (days < 0) throw new Error("A data inicial não pode ser posterior à data final.");
  if (days >= DIMEP_MAX_PERIOD_DAYS) throw new Error(`Selecione um período de até ${DIMEP_MAX_PERIOD_DAYS} dias.`);
}

const brDate = (date: string) => date.split("-").reverse().join("-");
const isoDate = (date: Date) => date.toISOString().slice(0, 10);

function dimepPeriodWindows(startDate: string, endDate: string) {
  const windows: Array<{ startDate: string; endDate: string }> = [];
  const cursor = new Date(`${startDate}T12:00:00Z`); const limit = new Date(`${endDate}T12:00:00Z`);
  while (cursor <= limit) {
    const windowStart = new Date(cursor); const windowEnd = new Date(cursor);
    windowEnd.setUTCDate(windowEnd.getUTCDate() + DIMEP_PAGE_WINDOW_DAYS - 1);
    if (windowEnd > limit) windowEnd.setTime(limit.getTime());
    windows.push({ startDate: isoDate(windowStart), endDate: isoDate(windowEnd) });
    cursor.setTime(windowEnd.getTime()); cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return windows;
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, work: (item: T, index: number) => Promise<R>) {
  const results = new Array<R>(items.length); let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next; next += 1;
      results[index] = await work(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

export async function fetchDimepEmployees() {
  return paged(resource("EMPLOYEES"), (Pagina) => ({ Excluido: false, Pagina, CarregarBiometrias: false }));
}

export async function fetchDimepPunches(startDate: string, endDate: string) {
  validateDimepPeriod(startDate, endDate);
  const windows = dimepPeriodWindows(startDate, endDate);
  logDimep("período dividido", { startDate, endDate, windows: windows.length, windowDays: DIMEP_PAGE_WINDOW_DAYS });
  const result = await mapWithConcurrency(windows, 2, async (window, index) => {
    logDimep("bloco iniciado", { block: index + 1, blocks: windows.length, ...window });
    const records = await paged(resource("MARKS"), (Pagina) => ({
      IdsPessoa: [0], MarcacaoColetadaAPI: false, DataInicio: brDate(window.startDate), DataFim: brDate(window.endDate), ResponseType: "AS400V1", Pagina,
    }));
    logDimep("bloco concluído", { block: index + 1, blocks: windows.length, records: records.length, ...window });
    return records;
  });
  return result.flat();
}

type LocalEmployee = { id: string; full_name: string; normalized_name: string; cpf_digits: string | null; cpf_is_valid: boolean; employee_number: string | null };

async function localEmployees(client: PoolClient, organizationId: string) {
  const [locals, refs] = await Promise.all([
    client.query<LocalEmployee>("select id,full_name,normalized_name,cpf_digits,cpf_is_valid,employee_number from rdo.collaborators where organization_id=$1", [organizationId]),
    client.query<{ external_id: string; collaborator_id: string }>(`select er.external_id,er.collaborator_id from rdo.collaborator_external_refs er
      join rdo.integration_connections ic on ic.id=er.connection_id and ic.organization_id=er.organization_id
      where er.organization_id=$1 and ic.provider='dimep'`, [organizationId]),
  ]);
  return { locals: locals.rows, refs: new Map(refs.rows.map((row) => [row.external_id, row.collaborator_id])) };
}

export async function previewDimepEmployees(client: PoolClient, organizationId: string, data: Obj[]): Promise<DimepEmployeePreview> {
  const local = await localEmployees(client, organizationId);
  const byId = new Map(local.locals.map((item) => [item.id, item]));
  const byCpf = new Map(local.locals.filter((item) => item.cpf_is_valid && item.cpf_digits).map((item) => [item.cpf_digits!, item]));
  const byName = new Map<string, LocalEmployee[]>();
  for (const item of local.locals) byName.set(item.normalized_name, [...(byName.get(item.normalized_name) || []), item]);
  const items: DimepEmployeePreviewItem[] = [];
  for (const row of data) {
    const person = employee(row);
    if (!person.externalId) { items.push({ externalId: `sem-id:${hash(row).slice(0, 12)}`, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: "skip", note: "Registro sem ID de pessoa." }); continue; }
    if (!person.hasName) { items.push({ externalId: person.externalId, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: "skip", note: "A API retornou somente o ID, sem nome suficiente para conciliação." }); continue; }
    const linked = byId.get(local.refs.get(person.externalId) || "");
    if (linked) {
      const changed = linked.full_name !== person.name || linked.employee_number !== person.employeeNumber || (validCpf(person.cpf) && linked.cpf_digits !== person.cpf);
      items.push({ externalId: person.externalId, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: changed ? "update" : "skip", candidateId: linked.id, candidateName: linked.full_name, note: changed ? "Vínculo DIMEP existente; cadastro local será atualizado." : "Já sincronizado." }); continue;
    }
    const cpfMatch = validCpf(person.cpf) ? byCpf.get(person.cpf!) : undefined;
    if (cpfMatch) { items.push({ externalId: person.externalId, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: "link", candidateId: cpfMatch.id, candidateName: cpfMatch.full_name, note: "Vínculo automático por CPF válido." }); continue; }
    const names = byName.get(person.normalizedName) || [];
    if (names.length === 1 && (!names[0].cpf_is_valid || !names[0].cpf_digits)) {
      items.push({ externalId: person.externalId, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: "review", candidateId: names[0].id, candidateName: names[0].full_name, note: "Nome normalizado coincide, mas exige confirmação do administrador." }); continue;
    }
    if (names.length) { items.push({ externalId: person.externalId, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: "skip", note: "Nome coincide com cadastro que possui outro CPF ou com múltiplos candidatos." }); continue; }
    items.push({ externalId: person.externalId, name: person.name, cpf: person.cpf, employeeNumber: person.employeeNumber, action: "create", note: "Novo funcionário vindo do DIMEP." });
  }
  items.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  const digest = hash(items.map(({ externalId, name, cpf, employeeNumber, action, candidateId }) => ({ externalId, name, cpf, employeeNumber, action, candidateId })));
  const count = (action: EmployeeAction) => items.filter((item) => item.action === action).length;
  return { stage: "employees", digest, generatedAt: new Date().toISOString(), items, counts: { create: count("create"), update: count("update"), link: count("link"), review: count("review"), skip: count("skip"), total: items.length } };
}

async function connection(client: PoolClient, organizationId: string) {
  const tenant = process.env.DIMEP_TENANT?.trim(); const base = process.env.DIMEP_API_BASE_URL?.trim();
  if (!tenant || !base || !process.env.DIMEP_API_TOKEN?.trim()) throw new Error("DIMEP não configurado.");
  const result = await client.query<{ id: string }>(`insert into rdo.integration_connections
    (organization_id,provider,external_tenant_key,base_url,secret_ref,settings,enabled)
    values ($1,'dimep',$2,$3,'env:DIMEP_API_TOKEN','{}',true)
    on conflict (organization_id,provider,external_tenant_key) do update set base_url=excluded.base_url,enabled=true returning id`, [organizationId, tenant, base]);
  return result.rows[0].id;
}

async function snapshot(client: PoolClient, organizationId: string, connectionId: string, runId: string, type: string, externalId: string, row: Obj) {
  await client.query(`insert into rdo.integration_snapshots
    (organization_id,connection_id,sync_run_id,object_type,external_id,payload,payload_sha256)
    values ($1,$2,$3,$4,$5,$6::jsonb,$7) on conflict do nothing`, [organizationId, connectionId, runId, type, externalId, JSON.stringify(row), hash(row)]);
}

export async function applyDimepEmployees(client: PoolClient, organizationId: string, userId: string, data: Obj[], preview: DimepEmployeePreview, confirmations: DimepEmployeeConfirmation[]) {
  await client.query("select pg_advisory_xact_lock(hashtext($1),hashtext('dimep-employees'))", [organizationId]);
  const connectionId = await connection(client, organizationId);
  const run = await client.query<{ id: string }>(`insert into rdo.sync_runs (organization_id,connection_id,object_type,direction,status,records_read,started_at)
    values ($1,$2,'employee','inbound','running',$3,now()) returning id`, [organizationId, connectionId, data.length]);
  const runId = run.rows[0].id; const confirmed = new Map(confirmations.map((item) => [item.externalId, item.candidateId]));
  const previewById = new Map(preview.items.map((item) => [item.externalId, item])); let written = 0; let rejected = 0;
  for (const row of data) {
    const person = employee(row); if (!person.externalId) { rejected += 1; continue; }
    const item = previewById.get(person.externalId); if (!item) { rejected += 1; continue; }
    let collaboratorId = item.candidateId;
    if (item.action === "review" && confirmed.get(person.externalId) !== item.candidateId) {
      await client.query(`insert into rdo.identity_match_reviews (organization_id,source_connection_id,source_external_id,candidate_collaborator_id,match_score,match_reasons)
        values ($1,$2,$3,$4,.75,'["normalized_name"]'::jsonb) on conflict do nothing`, [organizationId, connectionId, person.externalId, item.candidateId]);
      rejected += 1; await snapshot(client, organizationId, connectionId, runId, "employee", person.externalId, row); continue;
    }
    if (item.action === "skip" && !collaboratorId) { rejected += 1; await snapshot(client, organizationId, connectionId, runId, "employee", person.externalId, row); continue; }
    if (!collaboratorId) {
      const made = await client.query<{ id: string }>(`insert into rdo.collaborators
        (organization_id,full_name,normalized_name,cpf_raw,cpf_digits,cpf_is_valid,employee_number,job_title,department,employment_status,active)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning id`, [organizationId, person.name, person.normalizedName, person.cpfRaw, person.cpf, validCpf(person.cpf), person.employeeNumber, person.jobTitle, person.department, person.active ? "active" : "inactive", person.active]);
      collaboratorId = made.rows[0].id;
    } else {
      await client.query(`update rdo.collaborators set full_name=$3,normalized_name=$4,
        cpf_raw=case when $6 then $5 else cpf_raw end,cpf_digits=case when $6 then $5 else cpf_digits end,
        cpf_is_valid=case when $6 then true else cpf_is_valid end,employee_number=coalesce($7,employee_number),
        job_title=coalesce($8,job_title),department=coalesce($9,department),employment_status=$10,active=$11
        where organization_id=$1 and id=$2`, [organizationId, collaboratorId, person.name, person.normalizedName, person.cpf, validCpf(person.cpf), person.employeeNumber, person.jobTitle, person.department, person.active ? "active" : "inactive", person.active]);
    }
    await client.query(`insert into rdo.collaborator_external_refs
      (organization_id,collaborator_id,connection_id,external_id,external_name,external_document_raw,external_document_digits,last_seen_at)
      values ($1,$2,$3,$4,$5,$6,$7,now()) on conflict (connection_id,external_id) do update set
      collaborator_id=excluded.collaborator_id,external_name=excluded.external_name,external_document_raw=excluded.external_document_raw,
      external_document_digits=excluded.external_document_digits,last_seen_at=now()`, [organizationId, collaboratorId, connectionId, person.externalId, person.name, person.cpfRaw, person.cpf]);
    if (item.action === "review") await client.query(`insert into rdo.identity_match_reviews
      (organization_id,source_connection_id,source_external_id,candidate_collaborator_id,match_score,match_reasons,status,reviewed_by_user_id,reviewed_at)
      values ($1,$2,$3,$4,.75,'["normalized_name","admin_confirmation"]'::jsonb,'confirmed',$5,now())
      on conflict (source_connection_id,source_external_id,candidate_collaborator_id) do update set status='confirmed',reviewed_by_user_id=$5,reviewed_at=now()`, [organizationId, connectionId, person.externalId, collaboratorId, userId]);
    written += 1; await snapshot(client, organizationId, connectionId, runId, "employee", person.externalId, row);
  }
  await client.query(`update rdo.sync_runs set status=$3,records_written=$4,records_rejected=$5,finished_at=now() where organization_id=$1 and id=$2`, [organizationId, runId, rejected ? "partial" : "succeeded", written, rejected]);
  await client.query("update rdo.integration_connections set last_success_at=now() where organization_id=$1 and id=$2", [organizationId, connectionId]);
  await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason)
    values ($1,$2,'sync_runs',$3,'insert',$4::jsonb,'Conciliação de funcionários DIMEP confirmada')`, [organizationId, userId, runId, JSON.stringify({ digest: preview.digest, written, rejected })]);
  return { runId, written, rejected };
}

function punch(row: Obj) {
  const year = Number(value(row, "Ano", "Year")); const month = Number(value(row, "Mes", "Month")); const day = Number(value(row, "Dia", "Day"));
  const hour = Number(value(row, "Hora", "Hour")); const minute = Number(value(row, "Minuto", "Minute"));
  const valid = year >= 2000 && month >= 1 && month <= 12 && day >= 1 && day <= 31 && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  const workDate = valid ? `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}` : null;
  const occurredAt = workDate ? `${workDate}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00-03:00` : null;
  const externalEmployeeId = text(value(row, "PessoaID", "PessoaId", "IdPessoa", "EmployeeId", "Matricula")) || "desconhecido";
  const pointerId = text(value(row, "Id", "ID")); const appointmentId = text(value(row, "IdApont", "AppointmentId"));
  const externalRecordId = (pointerId && pointerId !== "0" ? pointerId : null) || appointmentId || hash({ externalEmployeeId, occurredAt, nsr: value(row, "NSR"), serial: value(row, "NumeroSerieRep") });
  const kindRaw = text(value(row, "TipoMarcacao", "MarkType"))?.toUpperCase();
  // Alguns tenants retornam "O" (marcação original), que não informa direção.
  // Nesses casos o pareamento continua cronológico e o dado bruto permanece no payload.
  const kind = value(row, "Indevido") === true ? "void" : kindRaw === "E" ? "in" : kindRaw === "S" ? "out" : "unknown";
  return { externalEmployeeId, pointerId: pointerId && pointerId !== "0" ? pointerId : null, externalRecordId, occurredAt, workDate, valid, kind, row };
}

async function dimepMappings(client: PoolClient, organizationId: string) {
  const result = await client.query<{ external_id: string; collaborator_id: string; full_name: string }>(`select er.external_id,er.collaborator_id,c.full_name
    from rdo.collaborator_external_refs er join rdo.integration_connections ic on ic.id=er.connection_id and ic.organization_id=er.organization_id
    join rdo.collaborators c on c.id=er.collaborator_id and c.organization_id=er.organization_id
    where er.organization_id=$1 and ic.provider='dimep'`, [organizationId]);
  return new Map(result.rows.map((row) => [row.external_id, row]));
}

export async function previewDimepPunches(client: PoolClient, organizationId: string, data: Obj[], startDate: string, endDate: string): Promise<DimepPunchPreview> {
  const mappings = await dimepMappings(client, organizationId); const groups = new Map<string, ReturnType<typeof punch>[]>(); let invalid = 0;
  for (const row of data) { const item = punch(row); if (!item.valid || !item.workDate) { invalid += 1; continue; } const key = `${item.externalEmployeeId}:${item.workDate}`; groups.set(key, [...(groups.get(key) || []), item]); }
  const items: DimepPunchPreviewItem[] = [];
  for (const list of groups.values()) {
    const first = list[0]; const mapping = mappings.get(first.externalEmployeeId); const usable = list.filter((item) => item.kind !== "void");
    items.push({ externalEmployeeId: first.externalEmployeeId, employeeName: mapping?.full_name || `Pessoa DIMEP ${first.externalEmployeeId}`, workDate: first.workDate!, punches: list.length, pairs: Math.floor(usable.length / 2), issues: (usable.length % 2) + (mapping ? 0 : 1), linked: Boolean(mapping) });
  }
  items.sort((a, b) => `${b.workDate}:${a.employeeName}`.localeCompare(`${a.workDate}:${b.employeeName}`, "pt-BR"));
  const digest = hash(data.map((row) => hash(row)).sort());
  return { stage: "punches", digest, generatedAt: new Date().toISOString(), startDate, endDate, items, counts: { punches: data.length, employees: new Set(items.map((item) => item.externalEmployeeId)).size, pairs: items.reduce((sum, item) => sum + item.pairs, 0), issues: items.reduce((sum, item) => sum + item.issues, 0) + invalid, unlinked: items.filter((item) => !item.linked).reduce((sum, item) => sum + item.punches, 0), invalid } };
}

async function issue(client: PoolClient, organizationId: string, connectionId: string, collaboratorId: string | null, employeeId: string, workDate: string | null, type: string, details: Obj) {
  const fingerprint = hash({ employeeId, workDate, type, details });
  await client.query(`insert into rdo.dimep_sync_issues (organization_id,connection_id,collaborator_id,external_employee_id,work_date,issue_type,fingerprint,details)
    values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb) on conflict (connection_id,fingerprint) do update set last_seen_at=now(),resolution_status='open',resolved_at=null`, [organizationId, connectionId, collaboratorId, employeeId, workDate, type, fingerprint, JSON.stringify(details)]);
}

export async function applyDimepPunches(client: PoolClient, organizationId: string, userId: string, data: Obj[], preview: DimepPunchPreview) {
  await client.query("select pg_advisory_xact_lock(hashtext($1),hashtext('dimep-punches'))", [organizationId]);
  const connectionId = await connection(client, organizationId); const mappings = await dimepMappings(client, organizationId);
  const run = await client.query<{ id: string }>(`insert into rdo.sync_runs (organization_id,connection_id,object_type,direction,status,records_read,started_at)
    values ($1,$2,'appointment','inbound','running',$3,now()) returning id`, [organizationId, connectionId, data.length]);
  const runId = run.rows[0].id; const affected = new Set<string>(); const ackIds = new Set<string>(); let written = 0; let rejected = 0;
  for (const row of data) {
    const item = punch(row); const mapping = mappings.get(item.externalEmployeeId); await snapshot(client, organizationId, connectionId, runId, "appointment", item.externalRecordId, row);
    if (!item.valid || !item.occurredAt || !item.workDate) { rejected += 1; await issue(client, organizationId, connectionId, mapping?.collaborator_id || null, item.externalEmployeeId, null, "invalid_punch", { externalRecordId: item.externalRecordId }); continue; }
    if (!mapping) { rejected += 1; await issue(client, organizationId, connectionId, null, item.externalEmployeeId, item.workDate, "unmatched_employee", { externalRecordId: item.externalRecordId }); continue; }
    const payloadHash = hash(row);
    const prior = await client.query<{ id: string; source_sequence: number; payload_sha256: string }>(`select id,source_sequence,payload_sha256 from rdo.time_punches
      where organization_id=$1 and connection_id=$2 and external_record_id=$3 order by source_sequence desc limit 1`, [organizationId, connectionId, item.externalRecordId]);
    const latest = prior.rows[0];
    if (!latest || latest.payload_sha256 !== payloadHash) {
      const inserted = await client.query<{ id: string }>(`insert into rdo.time_punches
        (organization_id,connection_id,collaborator_id,external_record_id,external_employee_id,occurred_at,mark_kind,source_sequence,supersedes_punch_id,payload,payload_sha256)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11) on conflict do nothing returning id`, [organizationId, connectionId, mapping.collaborator_id, item.externalRecordId, item.externalEmployeeId, item.occurredAt, item.kind, (latest?.source_sequence || 0) + 1, latest?.id || null, JSON.stringify(row), payloadHash]);
      if (inserted.rowCount) written += 1;
    }
    affected.add(`${mapping.collaborator_id}:${item.externalEmployeeId}:${item.workDate}`); if (item.pointerId) ackIds.add(item.pointerId);
  }
  for (const key of affected) {
    const [collaboratorId, employeeId, workDate] = key.split(":");
    await client.query(`update rdo.dimep_sync_issues set resolution_status='resolved',resolved_at=now() where organization_id=$1 and connection_id=$2 and collaborator_id=$3 and work_date=$4 and issue_type in ('missing_end','duplicate_time') and resolution_status='open'`, [organizationId, connectionId, collaboratorId, workDate]);
    const result = await client.query<{ id: string; occurred_at: Date }>(`select id,occurred_at from (
      select distinct on (external_record_id) id,occurred_at,mark_kind from rdo.time_punches
       where organization_id=$1 and connection_id=$2 and collaborator_id=$3 and (occurred_at at time zone 'America/Sao_Paulo')::date=$4
       order by external_record_id,source_sequence desc
    ) latest where mark_kind<>'void' order by occurred_at,id`, [organizationId, connectionId, collaboratorId, workDate]);
    const unique: typeof result.rows = []; const seen = new Set<string>();
    for (const mark of result.rows) { const instant = mark.occurred_at.toISOString(); if (seen.has(instant)) { await issue(client, organizationId, connectionId, collaboratorId, employeeId, workDate, "duplicate_time", { occurredAt: instant }); continue; } seen.add(instant); unique.push(mark); }
    for (let index = 0; index < unique.length; index += 2) {
      const start = unique[index]; const end = unique[index + 1]; const fingerprint = hash({ algorithm: "dimep-pair-v1", start: start.id, end: end?.id || null });
      await client.query(`insert into rdo.time_segments (organization_id,collaborator_id,work_date,start_punch_id,end_punch_id,original_start_at,original_end_at,segment_status,algorithm_version,source_fingerprint)
        values ($1,$2,$3,$4,$5,$6,$7,$8,'dimep-pair-v1',$9) on conflict do nothing`, [organizationId, collaboratorId, workDate, start.id, end?.id || null, start.occurred_at, end?.occurred_at || null, end ? "closed" : "missing_end", fingerprint]);
      if (!end) await issue(client, organizationId, connectionId, collaboratorId, employeeId, workDate, "missing_end", { startPunchId: start.id, occurredAt: start.occurred_at.toISOString() });
    }
  }
  await client.query(`update rdo.sync_runs set status=$3,records_written=$4,records_rejected=$5,finished_at=now() where organization_id=$1 and id=$2`, [organizationId, runId, rejected ? "partial" : "succeeded", written, rejected]);
  await client.query("update rdo.integration_connections set last_success_at=now() where organization_id=$1 and id=$2", [organizationId, connectionId]);
  await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason)
    values ($1,$2,'sync_runs',$3,'insert',$4::jsonb,'Importação de batidas DIMEP confirmada')`, [organizationId, userId, runId, JSON.stringify({ digest: preview.digest, written, rejected, pointerCandidates: ackIds.size })]);
  return { runId, written, rejected, ackIds: [...ackIds], connectionId };
}

export async function acknowledgeDimepPunches(ids: string[]) {
  if (!ids.length) return { acknowledged: 0, skipped: true, reason: "A resposta do Kairos não forneceu Id para o avanço seguro do ponteiro." };
  const numeric = ids.map(Number).filter((id) => Number.isSafeInteger(id) && id > 0);
  if (!numeric.length) return { acknowledged: 0, skipped: true, reason: "Nenhum Id de ponteiro válido foi retornado pelo Kairos." };
  const response = await externalRequest("DIMEP", resource("POINTER_ACK"), { method: "POST", body: { IdsMarcacoes: numeric, MarcacaoColetadaAPI: false, ResponseType: "AS400V1" } });
  const responseRows = rows(response); const failed = (isObject(response) && value(response, "Success", "Sucesso") === false)
    || responseRows.some((row) => value(row, "Success", "Sucesso") === false);
  if (failed) throw new Error("DIMEP recusou o avanço do ponteiro de marcações.");
  return { acknowledged: numeric.length, skipped: false, reason: null };
}

export async function recordDimepPointerResult(client: PoolClient, organizationId: string, runId: string, success: boolean, detail: string) {
  await client.query(`update rdo.sync_runs set status=case when $3 then status else 'partial' end,cursor_value=$4,
    error_summary=case when $3 then error_summary else concat_ws(' | ',error_summary,$4) end where organization_id=$1 and id=$2`, [organizationId, runId, success, detail]);
}
