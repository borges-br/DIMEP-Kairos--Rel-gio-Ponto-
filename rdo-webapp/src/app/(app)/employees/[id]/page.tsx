import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { saveEmployeeCorrectionAction } from "@/app/actions/employees";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClockIcon, ProjectsIcon, UsersIcon, WarningIcon } from "@/components/icons";
import { getEmployeeDetail } from "@/lib/dal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Detalhes do funcionário" };

function maskCpf(cpf: string | null) {
  return cpf ? `***.***.${cpf.slice(6, 9)}-${cpf.slice(9)}` : "Não vinculado";
}

export default async function EmployeeDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ correction?: string }> }) {
  const { id } = await params;
  const detail = await getEmployeeDetail(id);
  if (!detail) notFound();
  const correction = (await searchParams).correction;
  const canCorrect = detail.session.roles.some((role) => ["director", "admin"].includes(role));
  const employee = detail.employee;
  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Funcionários", href: "/employees" }, { label: employee.name }]} />
    <header className="page-header"><div><span className="eyebrow">COLABORADOR</span><h1>{employee.name}</h1><p>{employee.job_title || "Função não informada"} · {employee.department || "Sem departamento"}</p></div><span className={`status-badge ${employee.employment_status === "active" ? "status-success" : "status-neutral"}`}>{employee.employment_status === "active" ? "Ativo" : employee.employment_status}</span></header>
    {correction === "ok" && <div className="success-banner">Correção local salva com trilha de auditoria.</div>}
    {correction === "invalid" && <div className="form-error">Revise os campos e informe um motivo com pelo menos 10 caracteres.</div>}
    {correction === "empty" && <div className="form-error">Informe pelo menos um campo para sobrepor.</div>}
    <section className="detail-summary"><article><ProjectsIcon /><span><small>Projetos vinculados</small><strong>{detail.projects.length}</strong></span></article><article><ClockIcon /><span><small>Apontamentos</small><strong>{detail.workHistory.length}</strong></span></article><article><WarningIcon /><span><small>Divergências pendentes</small><strong>{detail.workHistory.filter((item) => item.divergence_status === "pending").length}</strong></span></article></section>
    <div className="employee-detail-grid">
      <section className="panel detail-box"><h2>Cadastro efetivo</h2><dl className="profile-list"><div><dt>CPF</dt><dd>{maskCpf(employee.cpf_digits)} {employee.cpf_is_valid ? "· validado" : "· não validado"}</dd></div><div><dt>Matrícula</dt><dd>{employee.employee_number || "Não informada"}</dd></div><div><dt>Nome na origem</dt><dd>{employee.source_name}</dd></div><div><dt>Função</dt><dd>{employee.job_title || "Não informada"}</dd></div><div><dt>Departamento</dt><dd>{employee.department || "Não informado"}</dd></div></dl><p className="readiness-note">O CPF é chave de conciliação e não é editado aqui. Divergências de identidade devem passar pela revisão DIMEP/IMUV.</p></section>
      <section className="panel detail-box"><h2>Projetos</h2>{detail.projects.map((project) => <Link key={project.id} href={`/projects/${project.id}`} className="history-link"><span><strong>{project.code} · {project.name}</strong><small>{project.source} · {project.status}</small></span><ProjectsIcon /></Link>)}{!detail.projects.length && <p className="empty-copy">Sem projeto ativo vinculado.</p>}</section>
    </div>
    {canCorrect && <section className="panel detail-box detail-wide"><h2>Correção cadastral auditável</h2><p>Preencha somente os campos que precisam sobrepor temporariamente a origem. A sincronização continua preservada.</p><form action={saveEmployeeCorrectionAction} className="correction-form"><input type="hidden" name="collaboratorId" value={employee.id} /><div className="form-grid two-columns"><label className="field-group"><span>Nome exibido</span><input className="input-field" name="fullName" defaultValue={employee.full_name_override || ""} placeholder={employee.source_name} /></label><label className="field-group"><span>Matrícula exibida</span><input className="input-field" name="employeeNumber" defaultValue={employee.employee_number_override || ""} placeholder={employee.source_employee_number || "Não informada"} /></label><label className="field-group"><span>Função exibida</span><input className="input-field" name="jobTitle" defaultValue={employee.job_title_override || ""} placeholder={employee.source_job_title || "Não informada"} /></label><label className="field-group"><span>Departamento exibido</span><input className="input-field" name="department" defaultValue={employee.department_override || ""} placeholder={employee.source_department || "Não informado"} /></label></div><label className="field-group"><span>Motivo da correção <b>*</b></span><textarea className="input-field" name="reason" rows={2} minLength={10} maxLength={1000} defaultValue={employee.override_reason || ""} required /></label>{employee.override_updated_at && <label className="check-row danger-zone"><input type="checkbox" name="removeOverride" /><span>Remover todas as correções locais e voltar aos dados sincronizados</span></label>}<button className="button button-primary" type="submit">Salvar correção</button></form></section>}
    <section className="panel detail-box detail-wide"><h2>Colaboração e horários</h2><div className="history-table"><div className="history-row history-head"><span>Data</span><span>Projeto / tarefa</span><span>Intervalo</span><span>Conciliação</span></div>{detail.workHistory.map((item, index) => <Link href={`/rdos/${item.rdo_id}`} className="history-row" key={`${item.rdo_id}-${index}`}><span>{formatDate(item.work_date)}</span><span><strong>{item.project_code} · {item.project_name}</strong><small>{item.task_code} · {item.task_name}</small></span><span>{new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(item.starts_at)}–{new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(item.ends_at)}</span><span className={item.divergence_status === "pending" ? "danger-text" : ""}>{item.divergence_type ? `${item.divergence_type} · ${item.divergence_status}` : "Sem divergência"}</span></Link>)}{!detail.workHistory.length && <p className="empty-copy">Nenhuma participação em RDO registrada.</p>}</div></section>
    {(detail.occurrences.length > 0 || detail.quality.length > 0) && <section className="panel detail-box detail-wide"><h2>Ocorrências e qualidade nos RDOs em que participou</h2><p className="readiness-note">Estes registros pertencem ao RDO da equipe; não atribuem responsabilidade individual automaticamente.</p>{detail.occurrences.map((item) => <Link href={`/rdos/${item.rdo_id}`} className="event-row" key={item.id}><WarningIcon /><span><strong>{formatDate(item.work_date)} · {item.project_name} · {item.severity}</strong><small>{item.description} · {item.status}</small></span></Link>)}{detail.quality.map((item) => <Link href={`/rdos/${item.rdo_id}`} className="event-row" key={item.id}><UsersIcon /><span><strong>{formatDate(item.work_date)} · {item.project_name} · {item.record_type}</strong><small>{item.description} · {item.result}</small></span></Link>)}</section>}
  </div>;
}
