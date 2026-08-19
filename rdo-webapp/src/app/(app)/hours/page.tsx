import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClockIcon, WarningIcon } from "@/components/icons";
import { getHoursOverview } from "@/lib/dal";
import { formatDate, formatMinutes } from "@/lib/format";

export const metadata: Metadata = { title: "Apontamentos" };

export default async function HoursPage() {
  const { rows, exportableCount } = await getHoursOverview();
  return <div className="page-container">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Apontamentos de horas" }]} />
    <header className="page-header"><div><span className="eyebrow">DIMEP × RDO × IMUV</span><h1>Apontamentos de horas</h1><p>Horas declaradas, cobertura do ponto e divergências para revisão.</p></div>{exportableCount > 0 ? <a className="button button-primary" href="/api/exports/imuv/chronometer">Exportar IMUV ({exportableCount})</a> : <button className="button button-secondary" disabled>Sem linhas aprovadas</button>}</header>
    <div className="info-banner"><ClockIcon /><div><strong>O DIMEP é a referência da jornada.</strong><span>O líder distribui o tempo entre atividades; qualquer lacuna ou alteração permanece rastreável. Só RDOs aprovados ou revisados entram na planilha.</span></div></div>
    {rows.length ? <div className="table-shell"><table className="data-table"><thead><tr><th>Data</th><th>Colaborador</th><th>Origem / etapa</th><th>Tempo</th><th>Linhas</th><th>Conciliação</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.source}-${row.work_date}-${row.collaborator_name}`}><td data-label="Data">{formatDate(row.work_date)}</td><td data-label="Colaborador"><strong>{row.collaborator_name}</strong></td><td data-label="Origem / etapa">{row.source === "dimep" ? <span className="status-badge status-neutral">DIMEP · aguardando RDO</span> : <span className="status-badge status-success">RDO · {row.status}</span>}</td><td data-label="Tempo">{formatMinutes(row.total_minutes)}</td><td data-label="Linhas">{row.allocation_count}</td><td data-label="Conciliação">{Number(row.divergence_count) ? <span className="status-badge status-warning"><WarningIcon />{row.divergence_count} divergência(s)</span> : <span className="status-badge status-success">Coberto</span>}</td></tr>)}</tbody></table></div> : <div className="empty-state panel"><ClockIcon /><h2>Sem jornadas importadas</h2><p>Execute a sincronização DIMEP. Depois, as jornadas aguardando distribuição e os RDOs aparecerão aqui.</p></div>}
  </div>;
}
