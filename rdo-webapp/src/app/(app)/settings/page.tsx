import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CloudIcon, DatabaseIcon, ShieldIcon } from "@/components/icons";
import { ImuvSyncPanel } from "@/components/imuv-sync-panel";
import { DimepSyncPanel } from "@/components/dimep-sync-panel";
import { getSettingsData } from "@/lib/dal";
import { roleLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Configurações" };

function ConfigStatus({ configured }: { configured: boolean }) {
  return <span className={`status-badge ${configured ? "status-success" : "status-warning"}`}>{configured ? "Configurado" : "Pendente"}</span>;
}

export default async function SettingsPage() {
  const { session, env, connections } = await getSettingsData();
  const connection = (provider: "imuv" | "dimep") => connections.find((item) => item.provider === provider);
  return <div className="page-container">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Configurações" }]} />
    <header className="page-header"><div><span className="eyebrow">AMBIENTE E INTEGRAÇÕES</span><h1>Configurações</h1><p>Status seguro do backend. Credenciais nunca são exibidas no navegador.</p></div></header>
    <div className="settings-grid">
      <article className="integration-card"><span className="integration-icon dimep"><DatabaseIcon /></span><div className="integration-title"><div><span>RELÓGIO DE PONTO</span><h2>DIMEP Kairos</h2></div><ConfigStatus configured={env.dimep.configured} /></div><p>Importa colaboradores, batidas imutáveis e segmentos de jornada.</p><dl><div><dt>Variáveis do servidor</dt><dd>{env.dimep.configured ? "Completas" : `${env.dimep.missing.length} pendente(s)`}</dd></div><div><dt>Conexão do tenant</dt><dd>{connection("dimep")?.enabled ? "Ativa" : "Não cadastrada"}</dd></div><div><dt>Última sincronização</dt><dd>{connection("dimep")?.last_status ?? "Ainda não executada"}</dd></div></dl></article>
      <article className="integration-card"><span className="integration-icon imuv"><CloudIcon /></span><div className="integration-title"><div><span>GESTÃO DE PROJETOS</span><h2>IMUV</h2></div><ConfigStatus configured={env.imuv.configured} /></div><p>Sincroniza projetos, tarefas, clientes e equipes; prepara a exportação de horas.</p><dl><div><dt>Variáveis do servidor</dt><dd>{env.imuv.configured ? "Completas" : `${env.imuv.missing.length} pendente(s)`}</dd></div><div><dt>Conexão do tenant</dt><dd>{connection("imuv")?.enabled ? "Ativa" : "Não cadastrada"}</dd></div><div><dt>Última sincronização</dt><dd>{connection("imuv")?.last_status ?? "Ainda não executada"}</dd></div></dl></article>
      <article className="integration-card"><span className="integration-icon storage"><DatabaseIcon /></span><div className="integration-title"><div><span>EVIDÊNCIAS</span><h2>Armazenamento</h2></div><ConfigStatus configured={env.storage.configured} /></div><p>Fotos, vídeos e documentos ficam fora do banco, com hash e metadados auditáveis.</p><dl><div><dt>Provedor</dt><dd>{env.storage.provider}</dd></div><div><dt>Endpoint</dt><dd>{env.storage.endpointConfigured ? "Definido" : "Pendente"}</dd></div><div><dt>Credenciais</dt><dd>{env.storage.configured ? "Completas" : `${env.storage.missing.length} pendente(s)`}</dd></div></dl></article>
    </div>
    {session.roles.some((role) => role === "admin" || role === "director") && <DimepSyncPanel />}
    {session.roles.some((role) => role === "admin" || role === "director" || role === "hr") && <ImuvSyncPanel />}
    <section className="security-panel"><ShieldIcon /><div><h2>Segurança e acesso</h2><p>Usuário: <strong>{session.displayName}</strong> · Perfis: {session.roles.map(roleLabel).join(", ")}. O webapp usa sessão HttpOnly, isolamento por empresa no banco e integrações somente pelo backend.</p></div></section>
    <p className="settings-note">As chaves devem ser configuradas como secrets da Stack no Portainer a partir do <code>.env.example</code>. Elas não devem ser cadastradas por telas do navegador.</p>
  </div>;
}
