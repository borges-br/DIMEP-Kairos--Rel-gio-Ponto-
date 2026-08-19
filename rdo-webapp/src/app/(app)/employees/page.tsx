import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowIcon, SearchIcon, UsersIcon, WarningIcon } from "@/components/icons";
import { getEmployees } from "@/lib/dal";
import { roleLine } from "@/lib/format";

export const metadata: Metadata = { title: "Colaboradores" };

function maskCpf(cpf: string | null) {
  return cpf ? `***.***.${cpf.slice(6, 9)}-${cpf.slice(9)}` : "CPF não vinculado";
}

export default async function EmployeesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const data = await getEmployees(q);
  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Colaboradores" }]} />
    <header className="page-header"><div><span className="eyebrow">DIMEP + IMUV</span><h1>Colaboradores</h1><p>Cadastro sincronizado, colaboração em projetos e exceções de jornada.</p></div></header>
    <form className="search-bar" action="/employees"><SearchIcon /><input name="q" defaultValue={data.search} placeholder="Pesquisar por nome, matrícula ou CPF…" aria-label="Pesquisar colaboradores" /><button className="button button-secondary" type="submit">Pesquisar</button></form>
    <section className="employee-grid">{data.employees.map((employee) => <article className="employee-card" key={employee.id}><div className="employee-card-head"><span className="employee-avatar"><UsersIcon /></span><div><h2>{employee.name}</h2><p>{roleLine(employee.job_title, employee.department)}</p></div>{employee.has_override && <span className="status-badge status-warning">Correção local</span>}</div><dl><div><dt>Identificação</dt><dd>{employee.employee_number || "Sem matrícula"} · {maskCpf(employee.cpf_digits)}</dd></div><div><dt>Projetos</dt><dd>{employee.project_count}</dd></div><div><dt>Apontamentos</dt><dd>{employee.allocation_count}</dd></div><div><dt>Divergências pendentes</dt><dd className={Number(employee.pending_divergence_count) ? "danger-text" : ""}>{employee.pending_divergence_count}</dd></div></dl><Link href={`/employees/${employee.id}`} className="card-link">Ver histórico e cadastro <ArrowIcon /></Link></article>)}
      {!data.employees.length && <div className="empty-state"><WarningIcon /><h2>Nenhum colaborador encontrado</h2><p>Sincronize o DIMEP ou ajuste a pesquisa.</p></div>}
    </section>
  </div>;
}
