import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IntegrationHealth } from "@/components/integration-health";
import { ImuvSyncPanel } from "@/components/imuv-sync-panel";
import { DimepSyncPanel } from "@/components/dimep-sync-panel";
import { getSettingsData } from "@/lib/dal";
import { requirePageAccess } from "@/lib/permissions";

export const metadata: Metadata = { title: "Configurações" };

export default async function SettingsPage() {
  const { level } = await requirePageAccess("settings");
  const { session } = await getSettingsData();
  const canSync = level === "write";
  return <div className="page-container">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Configurações" }]} />
    <header className="page-header"><div><span className="eyebrow">AMBIENTE E INTEGRAÇÕES</span><h1>Configurações</h1><p>Estado das integrações e sincronizações manuais.</p></div></header>
    <IntegrationHealth />
    {canSync && session.roles.some((role) => role === "admin" || role === "director") && <DimepSyncPanel />}
    {canSync && session.roles.some((role) => role === "admin" || role === "director" || role === "hr") && <ImuvSyncPanel />}
  </div>;
}
