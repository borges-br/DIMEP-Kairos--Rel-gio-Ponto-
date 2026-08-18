import Link from "next/link";
import { ArrowIcon, ClipboardIcon, ClockIcon, PlusIcon, ProjectsIcon, WarningIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { getDashboardData } from "@/lib/dal";
import { formatDate } from "@/lib/format";

export default async function DashboardPage() {
  const { session, overview, recent } = await getDashboardData();
  const firstName = session.displayName.split(/\s+/)[0];
  const metrics = [
    { label: "Projetos ativos", value: overview.active_projects, icon: ProjectsIcon, tone: "blue" },
    { label: "RDOs em aberto", value: overview.open_rdos, icon: ClipboardIcon, tone: "teal" },
    { label: "Aguardando aprovação", value: overview.pending_approvals, icon: ClockIcon, tone: "amber" },
    { label: "Exceções de horas", value: overview.open_exceptions, icon: WarningIcon, tone: "rose" },
  ];
  return <div className="page-container">
    <header className="page-header dashboard-header"><div><span className="eyebrow">GLB TECH · OPERAÇÃO PILOTO</span><h1>Bom trabalho, {firstName}.</h1><p>Acompanhe o dia de campo e registre as atividades da equipe.</p></div><Link href="/rdos/new" className="button button-primary"><PlusIcon />Novo RDO</Link></header>
    <section className="metric-grid" aria-label="Resumo operacional">{metrics.map(({ label, value, icon: Icon, tone }) => <article className="metric-card" key={label}><span className={`metric-icon ${tone}`}><Icon /></span><div><strong>{value}</strong><span>{label}</span></div></article>)}</section>
    <section className="dashboard-grid">
      <article className="panel recent-panel"><div className="panel-heading"><div><h2>RDOs recentes</h2><p>Últimos diários registrados pela operação.</p></div><Link href="/rdos">Ver todos</Link></div>{recent.length ? <div className="data-list">{recent.map((rdo) => <Link href={`/rdos/${rdo.id}`} className="data-row" key={rdo.id}><span className="data-leading">{rdo.project_code.slice(0, 2).toUpperCase()}</span><span className="data-copy"><strong>{rdo.project_name}</strong><small>{rdo.project_code} · {formatDate(rdo.work_date)}</small></span><StatusBadge status={rdo.status} /><ArrowIcon className="row-arrow" /></Link>)}</div> : <div className="empty-state compact"><ClipboardIcon /><h3>Nenhum RDO registrado</h3><p>Comece pelo primeiro diário de campo.</p></div>}</article>
      <aside className="panel next-action"><span className="next-icon"><ClipboardIcon /></span><span className="eyebrow">PRÓXIMA AÇÃO</span><h2>Fechamento do dia</h2><p>Registre atividades, equipe, segurança e horários antes de encerrar o expediente.</p><Link href="/rdos/new" className="button button-dark">Preencher RDO <ArrowIcon /></Link><small>Os dados serão salvos como rascunho para conferência.</small></aside>
    </section>
  </div>;
}
