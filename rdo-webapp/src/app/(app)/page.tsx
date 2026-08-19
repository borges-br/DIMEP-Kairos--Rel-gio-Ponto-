import Link from "next/link";
import {
  ArrowIcon, ClipboardIcon, ClockIcon, FolderKanbanIcon, PlusIcon,
  ProjectsIcon, UsersIcon, WarningIcon,
} from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { getDashboardData } from "@/lib/dal";
import { formatDate, formatMinutes } from "@/lib/format";
import { requirePageAccess } from "@/lib/permissions";

function percent(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

export default async function DashboardPage() {
  const { access } = await requirePageAccess("dashboard");
  const { session, overview, recent } = await getDashboardData();
  const firstName = session.displayName.split(/\s+/)[0];

  const punchMinutes = Number(overview.punch_minutes_month);
  const allocatedMinutes = Number(overview.allocated_minutes_month);
  const covered = Number(overview.covered_days);
  const awaiting = Number(overview.awaiting_days);
  const divergences = Number(overview.hour_divergences) + Number(overview.dimep_issues);

  const metrics = [
    { label: "Colaboradores ativos", value: overview.collaborators, hint: `${overview.team_members} em equipes de projeto`, icon: UsersIcon, tone: "blue", href: "/employees" },
    { label: "Projetos ativos", value: overview.active_projects, hint: `${overview.finished_projects} concluído(s)`, icon: ProjectsIcon, tone: "teal", href: "/projects" },
    { label: "RDOs em aberto", value: overview.open_rdos, hint: `${overview.pending_approvals} aguardando aprovação`, icon: ClipboardIcon, tone: "amber", href: "/rdos" },
    { label: "Divergências de horas", value: String(divergences), hint: `${overview.hour_divergences} no RDO · ${overview.dimep_issues} no ponto`, icon: WarningIcon, tone: "rose", href: "/hours" },
  ];

  return <div className="page-container">
    <header className="page-header dashboard-header"><div><h1>Olá, {firstName}.</h1><p>Acompanhe o dia de campo e registre as atividades da equipe.</p></div>{access.rdos === "write" && <Link href="/rdos/new" className="button button-primary"><PlusIcon />Novo RDO</Link>}</header>

    <section className="metric-grid" aria-label="Resumo operacional">{metrics.map(({ label, value, hint, icon: Icon, tone, href }) =>
      <Link className="metric-card" key={label} href={href}>
        <span className={`metric-icon ${tone}`}><Icon /></span>
        <div><strong>{value}</strong><span>{label}</span><small>{hint}</small></div>
      </Link>)}
    </section>

    <section className="insight-grid">
      <article className="panel insight-card">
        <div className="insight-head"><h2>Cobertura do ponto</h2><span>últimos 30 dias</span></div>
        <div className="insight-figure"><strong>{percent(covered, covered + awaiting)}%</strong><span>das jornadas já distribuídas em RDO</span></div>
        <div className="insight-bar" role="img" aria-label={`${covered} jornadas cobertas de ${covered + awaiting}`}>
          <span className="insight-bar-fill" style={{ width: `${percent(covered, covered + awaiting)}%` }} />
        </div>
        <dl className="insight-legend">
          <div><dt>Cobertas</dt><dd>{covered}</dd></div>
          <div><dt>Aguardando RDO</dt><dd className={awaiting ? "danger-text" : ""}>{awaiting}</dd></div>
        </dl>
      </article>

      <article className="panel insight-card">
        <div className="insight-head"><h2>Horas do mês</h2><span><ClockIcon /> DIMEP × RDO</span></div>
        <div className="insight-figure"><strong>{formatMinutes(punchMinutes)}</strong><span>registradas no relógio de ponto</span></div>
        <div className="insight-bar" role="img" aria-label={`${formatMinutes(allocatedMinutes)} distribuídas de ${formatMinutes(punchMinutes)}`}>
          <span className="insight-bar-fill" style={{ width: `${Math.min(100, percent(allocatedMinutes, punchMinutes))}%` }} />
        </div>
        <dl className="insight-legend">
          <div><dt>Distribuídas em RDO</dt><dd>{formatMinutes(allocatedMinutes)}</dd></div>
          <div><dt>RDOs no mês</dt><dd>{overview.rdos_month}</dd></div>
        </dl>
      </article>

      <article className="panel insight-card">
        <div className="insight-head"><h2>Fluxo dos diários</h2><span><FolderKanbanIcon /> situação atual</span></div>
        <ul className="insight-flow">
          <li><span>Em preenchimento</span><strong>{overview.open_rdos}</strong></li>
          <li><span>Aguardando aprovação</span><strong className={Number(overview.pending_approvals) ? "warning-text" : ""}>{overview.pending_approvals}</strong></li>
          <li><span>Aprovados ou revisados</span><strong>{overview.approved_rdos}</strong></li>
          <li><span>Exceções de jornada</span><strong className={Number(overview.open_exceptions) ? "danger-text" : ""}>{overview.open_exceptions}</strong></li>
        </ul>
      </article>
    </section>

    <section className="dashboard-grid">
      <article className="panel recent-panel"><div className="panel-heading"><div><h2>RDOs recentes</h2><p>Últimos diários registrados pela operação.</p></div><Link href="/rdos">Ver todos</Link></div>{recent.length ? <div className="data-list">{recent.map((rdo) => <Link href={`/rdos/${rdo.id}`} className="data-row" key={rdo.id}><span className="data-leading">{rdo.project_code.slice(0, 2).toUpperCase()}</span><span className="data-copy"><strong>{rdo.project_name}</strong><small>{rdo.project_code} · {formatDate(rdo.work_date)}</small></span><StatusBadge status={rdo.status} /><ArrowIcon className="row-arrow" /></Link>)}</div> : <div className="empty-state compact"><ClipboardIcon /><h3>Nenhum RDO registrado</h3><p>Comece pelo primeiro diário de campo.</p></div>}</article>
      <aside className="panel next-action"><span className="next-icon"><ClipboardIcon /></span><span className="eyebrow">PRÓXIMA AÇÃO</span><h2>Fechamento do dia</h2><p>Registre atividades, equipe, segurança e horários antes de encerrar o expediente.</p>{access.rdos === "write" ? <Link href="/rdos/new" className="button button-dark">Preencher RDO <ArrowIcon /></Link> : <Link href="/hours" className="button button-dark">Conferir apontamentos <ArrowIcon /></Link>}<small>Os dados serão salvos como rascunho para conferência.</small></aside>
    </section>
  </div>;
}
