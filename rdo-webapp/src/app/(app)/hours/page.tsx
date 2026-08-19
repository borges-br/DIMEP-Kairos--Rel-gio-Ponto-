import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClockIcon } from "@/components/icons";
import { HoursSyncTimer } from "@/components/hours-sync-timer";
import { HoursTable } from "@/components/hours-table";
import { getHoursOverview } from "@/lib/dal";
import { readSyncSchedule } from "@/lib/sync-scheduler";
import { requirePageAccess } from "@/lib/permissions";

export const metadata: Metadata = { title: "Apontamentos" };

export default async function HoursPage() {
  await requirePageAccess("hours");
  const { session, rows, exportableCount } = await getHoursOverview();
  const schedule = await readSyncSchedule(session.organizationId);
  const canSync = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
  return <div className="page-container">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Apontamentos de horas" }]} />
    <header className="page-header"><div><span className="eyebrow">DIMEP × RDO × IMUV</span><h1>Apontamentos de horas</h1><p>Horas declaradas, cobertura do ponto e divergências para revisão.</p></div>{exportableCount > 0 ? <a className="button button-primary" href="/api/exports/imuv/chronometer">Exportar IMUV ({exportableCount})</a> : <button className="button button-secondary" disabled>Sem linhas aprovadas</button>}</header>
    {schedule && <HoursSyncTimer schedule={schedule} canSync={canSync} />}
    {rows.length ? <HoursTable rows={rows} /> : <div className="empty-state panel"><ClockIcon /><h2>Sem jornadas importadas</h2><p>Execute a sincronização DIMEP. Depois, as jornadas aguardando distribuição e os RDOs aparecerão aqui.</p></div>}
  </div>;
}
