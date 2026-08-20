#!/usr/bin/env node
// Sonda READ-ONLY do tenant IMUV. So faz GET. Nao escreve, nao altera nada.
//
// Objetivo: responder com dado, e nao com entrevista, as perguntas em aberto
// sobre a ligacao Comercial -> OMIE -> IMUV:
//
//   1. O numero de OS/OF aparece em algum campo do projeto IMUV?
//   2. /sale esta em uso? request_number (pedido do cliente) e contract_number
//      estao preenchidos? Apontam para id_project?
//   3. Um mesmo request_number aparece em mais de uma venda/projeto? (1 PO -> N OS)
//   4. /production-order (candidato a "OF") esta em uso?
//   5. As tarefas usam department_id? (candidato a "disciplina")
//   6. /people.id_omie esta preenchido? (De-Para IMUV<->OMIE ja existente)
//
// Uso:
//   node sonda-imuv-comercial.mjs /caminho/para/.env
//   IMUV_API_BASE_URL=... IMUV_API_TOKEN=... node sonda-imuv-comercial.mjs

import { readFileSync } from "node:fs";

const envFile = process.argv[2];
if (envFile) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const baseText = process.env.IMUV_API_BASE_URL?.trim();
const token = process.env.IMUV_API_TOKEN?.trim();
if (!baseText || !token) {
  console.error("Faltam IMUV_API_BASE_URL e/ou IMUV_API_TOKEN.");
  process.exit(1);
}
const base = new URL(baseText.endsWith("/") ? baseText : `${baseText}/`);

async function get(path, query = {}) {
  const url = new URL(path.replace(/^\/+/, ""), base);
  for (const [key, value] of Object.entries({ page: "1", "per-page": "100", ...query })) {
    url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) return { erro: `HTTP ${response.status}`, rows: [] };
  const body = await response.text();
  if (!body) return { rows: [] };
  try {
    const parsed = JSON.parse(body);
    return { rows: Array.isArray(parsed) ? parsed.filter((r) => r && typeof r === "object") : [] };
  } catch {
    return { erro: "resposta nao JSON", rows: [] };
  }
}

const preenchido = (v) => v !== null && v !== undefined && String(v).trim() !== "";
const conta = (rows, campo) => rows.filter((r) => preenchido(r[campo])).length;
// Reconhece "OS 244", "OS-244", "OF 118", "O.S. 244"
const padraoOs = /\bO\.?\s?[SF]\.?\s*-?\s*\d{2,6}\b/i;

function ondeAparece(rows, campos) {
  const achados = {};
  for (const row of rows) {
    for (const campo of campos) {
      const valor = typeof row[campo] === "string" ? row[campo] : null;
      if (valor && padraoOs.test(valor)) {
        achados[campo] = achados[campo] ?? [];
        if (achados[campo].length < 5) achados[campo].push(valor.slice(0, 90));
      }
    }
  }
  return achados;
}

const linha = (t) => console.log(`\n${t}\n${"-".repeat(t.length)}`);

const projects = await get("project");
linha(`1. PROJETOS (${projects.rows.length} ativos${projects.erro ? ` -- ${projects.erro}` : ""})`);
if (projects.rows.length) {
  const campos = ["code", "name", "description", "custom_field", "address"];
  console.log("preenchimento:", Object.fromEntries(
    [...campos, "people_id", "budget", "estimated_hours"].map((c) => [c, conta(projects.rows, c)]),
  ));
  console.log("\nnomes completos:");
  for (const r of projects.rows) console.log(`  [${r.id}] ${r.name}`);
  // O numero no inicio do nome e a identidade que chega ao campo hoje.
  // Saber quantos digitos ele tem separa PI (5-6) de OS do Omie (3).
  const prefixos = projects.rows
    .map((r) => /^\s*(\d{2,8})\b/.exec(String(r.name ?? ""))?.[1])
    .filter(Boolean);
  const porTamanho = new Map();
  for (const p of prefixos) porTamanho.set(p.length, [...(porTamanho.get(p.length) ?? []), p]);
  console.log(`\nprefixo numerico no nome: ${prefixos.length}/${projects.rows.length} projetos`);
  for (const [tamanho, lista] of [...porTamanho].sort((a, b) => a[0] - b[0])) {
    console.log(`  ${tamanho} digitos (${lista.length}x): ${lista.join(", ")}`);
  }
  const achados = ondeAparece(projects.rows, campos);
  console.log(Object.keys(achados).length
    ? `>> padrao OS/OF encontrado em: ${JSON.stringify(achados, null, 2)}`
    : ">> NENHUM campo do projeto contem padrao 'OS nnn' / 'OF nnn'.");
  const porCliente = new Map();
  for (const r of projects.rows) porCliente.set(r.people_id, (porCliente.get(r.people_id) ?? 0) + 1);
  console.log(`clientes distintos: ${porCliente.size} | max projetos num mesmo cliente: ${Math.max(0, ...porCliente.values())}`);
}

const sales = await get("sale");
linha(`2. VENDAS /sale (${sales.rows.length}${sales.erro ? ` -- ${sales.erro}` : ""})`);
if (sales.rows.length) {
  console.log("preenchimento:", Object.fromEntries(
    ["code", "request_number", "contract_number", "id_project", "task_id", "subject", "total"]
      .map((c) => [c, conta(sales.rows, c)]),
  ));
  const porPedido = new Map();
  for (const r of sales.rows) {
    if (!preenchido(r.request_number)) continue;
    const chave = String(r.request_number).trim();
    porPedido.set(chave, [...(porPedido.get(chave) ?? []), r.id_project ?? null]);
  }
  const multiplos = [...porPedido].filter(([, projetos]) => projetos.length > 1);
  console.log(multiplos.length
    ? `>> 1 PEDIDO -> N VENDAS confirmado em dados: ${JSON.stringify(multiplos.slice(0, 5))}`
    : ">> nenhum request_number repetido: cada pedido aparece em uma venda so.");
  // O subject e o unico texto livre da venda. Se ele repetir o nome do projeto,
  // a venda E a proposta e o id_project vazio vira so um campo nao preenchido.
  console.log("\nvendas COM pedido do cliente (request_number):");
  for (const r of sales.rows.filter((v) => preenchido(v.request_number))) {
    console.log(`  ${r.code} | pedido ${r.request_number} | id_project=${r.id_project ?? "null"} | ${String(r.subject ?? "").slice(0, 80)}`);
  }
  console.log("\nsubject das 15 vendas mais recentes:");
  for (const r of sales.rows.slice(0, 15)) console.log(`  ${r.code}: ${String(r.subject ?? "").slice(0, 80)}`);
}

const leads = await get("lead");
linha(`3. LEADS /lead (${leads.rows.length}${leads.erro ? ` -- ${leads.erro}` : ""})`);
console.log(leads.rows.length ? "pipeline comercial EM USO no IMUV." : "sem leads: pipeline comercial vive fora do IMUV.");
for (const r of leads.rows) {
  console.log(`  [${r.id}] ${String(r.name ?? "").slice(0, 60)} | valor=${r.lead_value ?? "-"} | convertido=${r.converted ?? "-"}`);
}

// Cruzamento: o mesmo negocio aparece como venda e como projeto?
linha("3b. CRUZAMENTO venda <-> projeto (por texto)");
const palavras = (t) => new Set(String(t ?? "").toUpperCase().match(/[A-Z0-9]{4,}/g) ?? []);
let casados = 0;
for (const venda of sales.rows) {
  const alvo = palavras(venda.subject);
  if (!alvo.size) continue;
  for (const projeto of projects.rows) {
    const comuns = [...palavras(projeto.name)].filter((p) => alvo.has(p));
    if (comuns.length >= 2) {
      casados += 1;
      console.log(`  venda ${venda.code} <-> projeto [${projeto.id}] por ${JSON.stringify(comuns)}`);
      break;
    }
  }
}
console.log(casados
  ? `>> ${casados} vendas descrevem o mesmo negocio de um projeto, mas com id_project vazio.`
  : ">> nenhuma venda casa por texto com um projeto: sao universos separados.");

const production = await get("production-order");
linha(`4. ORDENS DE PRODUCAO /production-order (${production.rows.length}${production.erro ? ` -- ${production.erro}` : ""})`);
if (production.rows.length) {
  console.log("preenchimento:", Object.fromEntries(
    ["project_id", "sale_id", "collaborator_id", "warehouse_id", "status", "observation"]
      .map((c) => [c, conta(production.rows, c)]),
  ));
  console.log("amostra:", production.rows.slice(0, 5).map((r) => ({ id: r.id, project_id: r.project_id, sale_id: r.sale_id })));
}

const tasks = await get("task", { expand: "taskRelations" });
linha(`5. TAREFAS /task (${tasks.rows.length}${tasks.erro ? ` -- ${tasks.erro}` : ""})`);
if (tasks.rows.length) {
  console.log("preenchimento:", Object.fromEntries(
    ["code", "name", "department_id", "budget", "weight", "priority", "type"].map((c) => [c, conta(tasks.rows, c)]),
  ));
  const deps = new Map();
  for (const r of tasks.rows) {
    if (preenchido(r.department_id)) deps.set(String(r.department_id), (deps.get(String(r.department_id)) ?? 0) + 1);
  }
  console.log(deps.size
    ? `>> department_id EM USO -- ${deps.size} departamentos: ${JSON.stringify([...deps])}`
    : ">> department_id vazio em todas as tarefas.");
  const achados = ondeAparece(tasks.rows, ["code", "name"]);
  console.log(Object.keys(achados).length
    ? `>> padrao OS/OF na tarefa: ${JSON.stringify(achados, null, 2)}`
    : ">> nenhum padrao OS/OF no nome/codigo das tarefas.");

  // Mesma resolucao de vinculo que o conector usa (imuv.ts taskProject).
  const modeloProjeto = "app\\modules\\administrator\\models\\Project";
  const projetoDaTarefa = (row) => {
    for (const rel of Array.isArray(row.taskRelations) ? row.taskRelations : []) {
      if (rel && typeof rel === "object" && rel.type === modeloProjeto && rel.type_id) return String(rel.type_id);
    }
    return row.related_id ?? row.project_id ?? row.id_project ?? null;
  };
  const nomeProjeto = new Map(projects.rows.map((r) => [String(r.id), String(r.name ?? "")]));
  const comTarefa = new Set();
  console.log("\ntarefas e seus projetos:");
  for (const r of tasks.rows) {
    const pid = projetoDaTarefa(r);
    if (pid) comTarefa.add(String(pid));
    console.log(`  [${r.id}] ${String(r.name ?? "").slice(0, 55)} -> projeto ${pid ?? "SEM VINCULO"} ${pid ? `(${nomeProjeto.get(String(pid))?.slice(0, 40) ?? "fora da lista de ativos"})` : ""}`);
  }
  const semTarefa = projects.rows.filter((p) => !comTarefa.has(String(p.id)));
  console.log(`\n>> ${comTarefa.size} de ${projects.rows.length} projetos ativos tem alguma tarefa.`);
  console.log(`>> ${semTarefa.length} projetos SEM NENHUMA TAREFA -- nesses o RDO nao tem o que selecionar:`);
  for (const p of semTarefa) console.log(`     ${String(p.name ?? "").slice(0, 70)}`);
}

const departments = await get("department", { "per-page": "50" });
linha(`6. DEPARTAMENTOS /department (${departments.rows.length}${departments.erro ? ` -- ${departments.erro}` : ""})`);
console.log(departments.rows.map((r) => `${r.id}: ${r.name}`).slice(0, 30));

const people = await get("people", { "per-page": "50" });
linha(`7. PESSOAS /people -- De-Para OMIE (${people.rows.length}${people.erro ? ` -- ${people.erro}` : ""})`);
if (people.rows.length) {
  const comOmie = conta(people.rows, "id_omie");
  console.log(`id_omie preenchido em ${comOmie}/${people.rows.length}`);
  console.log(comOmie ? ">> IMUV e OMIE JA CONVERSAM em nivel de cliente." : ">> nenhum id_omie: sem De-Para OMIE ativo hoje.");
}

linha("FIM -- nada foi escrito em nenhum sistema.");
