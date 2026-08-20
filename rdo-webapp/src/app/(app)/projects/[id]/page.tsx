import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowIcon, ClipboardIcon, UsersIcon } from "@/components/icons";
import { getProjectDetail } from "@/lib/dal";
import { requirePageAccess } from "@/lib/permissions";
import { WorkLocationsPanel } from "@/components/work-locations-panel";

export const metadata: Metadata = { title: "Detalhes do projeto" };

export default async function ProjectDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ task?: string; edit?: string }> }) {
  const { id } = await params;
  const { level } = await requirePageAccess("projects");
  const detail = await getProjectDetail(id);
  if (!detail) notFound();
  const query = await searchParams;
  const requestedTask = query.task;
  const selectedTask = detail.tasks.find((task) => task.id === requestedTask) || detail.tasks[0];

  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Projetos", href: "/projects" }, { label: `${detail.project.code} · ${detail.project.name}` }]} />
    <header className="page-header"><div><span className="eyebrow">{detail.project.code} · PROJETO IMUV</span><h1>{detail.project.name}</h1><p>Cliente: {detail.project.client_name}</p></div><Link href={`/rdos/new?project=${detail.project.id}`} className="button button-primary">Novo RDO <ArrowIcon /></Link></header>
    <section className="detail-summary"><article><ClipboardIcon /><span><small>Tarefas ativas</small><strong>{detail.tasks.length}</strong></span></article>
      {/* details nativo: o cartao continua mostrando so o numero e a pagina segue
          sendo Server Component, sem estado de cliente para uma lista estatica. */}
      <article className="team-card"><UsersIcon /><span><small>Equipe vinculada</small><strong>{detail.members.length}</strong></span>
        {detail.members.length > 0 && <details className="team-reveal"><summary aria-label="Mostrar a equipe vinculada">Ver equipe</summary>
          <ul>{detail.members.map((member) => <li key={member.id}><b>{member.name}</b>{member.job_title && <small>{member.job_title}</small>}</li>)}</ul>
        </details>}
      </article></section>
    <section className="panel detail-panel"><div className="panel-heading"><div><h2>Etapas e tarefas do projeto</h2><p>Abas sincronizadas do IMUV; Instalação, Manutenção, Testes e Comissionamento aparecem quando existirem na fonte mestre.</p></div></div>
      {detail.tasks.length > 0 ? <><nav className="task-tabs" aria-label="Tarefas do projeto">{detail.tasks.map((task) => <Link key={task.id} href={`/projects/${detail.project.id}?task=${task.id}`} className={selectedTask?.id === task.id ? "active" : ""}><span>{task.code}</span><strong>{task.name}</strong></Link>)}</nav>{selectedTask && <article className="selected-task-panel"><div><span className="project-code">{selectedTask.code} · TAREFA IMUV</span><h3>{selectedTask.name}</h3><p>{selectedTask.description || "Sem descrição adicional na tarefa sincronizada."}</p></div><Link className="button button-primary" href={`/rdos/new?project=${detail.project.id}&task=${selectedTask.id}`}>Novo RDO nesta tarefa <ArrowIcon /></Link></article>}</> : <div className="empty-state"><ClipboardIcon /><h2>Sem tarefas ativas</h2><p>Sincronize as tarefas do IMUV antes de registrar um diário.</p></div>}
    </section>
    <WorkLocationsPanel
      projectId={detail.project.id}
      locations={detail.locations}
      canWrite={level === "write"}
      canPublish={level === "write" && detail.session.roles.some((role) => role === "admin" || role === "director" || role === "leader")}
    />
    {detail.session.roles.some((role) => role === "admin" || role === "director" || role === "hr") && <section className="panel detail-panel read-only-panel">
      <div className="panel-heading"><div><h2>Origem dos dados do projeto</h2><p>Projetos e tarefas são somente leitura neste aplicativo. Altere-os no IMUV e use “Puxar informações do IMUV” em Configurações. O envio de volta ao IMUV é permitido apenas para dados cadastrais de funcionários.</p></div></div>
    </section>}
  </div>;
}
