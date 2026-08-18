import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowIcon, ClipboardIcon, UsersIcon } from "@/components/icons";
import { getProjectDetail } from "@/lib/dal";
import { saveProjectForImuvAction } from "@/app/actions/projects";

export const metadata: Metadata = { title: "Detalhes do projeto" };

export default async function ProjectDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ task?: string; edit?: string }> }) {
  const { id } = await params;
  const detail = await getProjectDetail(id);
  if (!detail) notFound();
  const query = await searchParams;
  const requestedTask = query.task;
  const selectedTask = detail.tasks.find((task) => task.id === requestedTask) || detail.tasks[0];

  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Projetos", href: "/projects" }, { label: `${detail.project.code} · ${detail.project.name}` }]} />
    <header className="page-header"><div><span className="eyebrow">{detail.project.code} · PROJETO IMUV</span><h1>{detail.project.name}</h1><p>Cliente: {detail.project.client_name}</p></div><Link href={`/rdos/new?project=${detail.project.id}`} className="button button-primary">Novo RDO <ArrowIcon /></Link></header>
    {query.edit === "ok" && <div className="success-banner">Alteração local salva. Revise-a em Configurações antes de enviar ao IMUV.</div>}
    <section className="detail-summary"><article><ClipboardIcon /><span><small>Tarefas ativas</small><strong>{detail.tasks.length}</strong></span></article><article><UsersIcon /><span><small>Equipe vinculada</small><strong>{detail.members.length}</strong></span></article></section>
    <section className="panel detail-panel"><div className="panel-heading"><div><h2>Etapas e tarefas do projeto</h2><p>Abas sincronizadas do IMUV; Instalação, Manutenção, Testes e Comissionamento aparecem quando existirem na fonte mestre.</p></div></div>
      {detail.tasks.length > 0 ? <><nav className="task-tabs" aria-label="Tarefas do projeto">{detail.tasks.map((task) => <Link key={task.id} href={`/projects/${detail.project.id}?task=${task.id}`} className={selectedTask?.id === task.id ? "active" : ""}><span>{task.code}</span><strong>{task.name}</strong></Link>)}</nav>{selectedTask && <article className="selected-task-panel"><div><span className="project-code">{selectedTask.code} · TAREFA IMUV</span><h3>{selectedTask.name}</h3><p>{selectedTask.description || "Sem descrição adicional na tarefa sincronizada."}</p></div><Link className="button button-primary" href={`/rdos/new?project=${detail.project.id}&task=${selectedTask.id}`}>Novo RDO nesta tarefa <ArrowIcon /></Link></article>}</> : <div className="empty-state"><ClipboardIcon /><h2>Sem tarefas ativas</h2><p>Sincronize as tarefas do IMUV antes de registrar um diário.</p></div>}
    </section>
    {detail.session.roles.some((role) => role === "admin" || role === "director") && <section className="panel detail-panel">
      <div className="panel-heading"><div><h2>Alterações pendentes para o IMUV</h2><p>Somente campos documentados pelo IMUV são editáveis. Salvar não envia nada; o envio exige uma segunda confirmação em Configurações.</p></div></div>
      <form action={saveProjectForImuvAction} className="correction-form"><input type="hidden" name="projectId" value={detail.project.id} /><div className="form-grid three-columns"><label className="field-group"><span>Código</span><input className="input-field" name="code" defaultValue={detail.project.code} required maxLength={100} /></label><label className="field-group"><span>Nome</span><input className="input-field" name="name" defaultValue={detail.project.name} required maxLength={250} /></label><label className="field-group"><span>Data inicial</span><input className="input-field" type="date" name="startsOn" defaultValue={detail.project.starts_on || ""} required /></label></div><label className="field-group"><span>Motivo da alteração</span><textarea className="input-field" name="reason" minLength={10} maxLength={1000} required rows={2} /></label><button className="button button-secondary" type="submit">Salvar alteração local</button></form>
    </section>}
  </div>;
}
