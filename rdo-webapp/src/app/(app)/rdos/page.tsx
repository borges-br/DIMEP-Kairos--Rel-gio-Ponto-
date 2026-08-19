import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DraftCleanup } from "@/components/draft-cleanup";
import { ArrowIcon, ClipboardIcon, PlusIcon, UsersIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { getRdos } from "@/lib/dal";
import { formatDate } from "@/lib/format";
import { requirePageAccess } from "@/lib/permissions";

export const metadata: Metadata = { title: "Diários de campo" };

export default async function RdosPage({ searchParams }: { searchParams: Promise<{ created?: string }> }) {
  await requirePageAccess("rdos");
  const { rdos } = await getRdos();
  const created = (await searchParams).created === "1";
  return <div className="page-container">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Diários de campo" }]} />
    <header className="page-header"><div><span className="eyebrow">EXECUÇÃO DE CAMPO</span><h1>Diários de campo</h1><p>Histórico versionado da execução, horas e aprovações.</p></div><Link href="/rdos/new" className="button button-primary"><PlusIcon />Novo RDO</Link></header>
    {created && <DraftCleanup />}
    {created && <div className="success-banner" role="status">RDO salvo como rascunho. A conciliação de horas deve ser concluída antes do envio.</div>}
    {rdos.length ? <div className="rdo-list">{rdos.map((rdo) => <article className="rdo-card" key={rdo.id}><div className="date-block"><strong>{formatDate(rdo.work_date).slice(0, 5)}</strong><span>{formatDate(rdo.work_date).slice(-4)}</span></div><div className="rdo-copy"><span className="project-code">{rdo.project_code} · V{rdo.version_number}</span><h2>{rdo.project_name}</h2><p><UsersIcon /> {rdo.allocation_count} apontamentos · Líder: {rdo.leader_name}</p></div><StatusBadge status={rdo.status} /><Link className="icon-button" href={`/rdos/${rdo.id}`} aria-label={`Abrir RDO de ${rdo.project_name}`}><ArrowIcon /></Link></article>)}</div> : <div className="empty-state panel"><ClipboardIcon /><h2>Nenhum RDO registrado</h2><p>O primeiro diário aparecerá aqui após ser salvo.</p><Link href="/rdos/new" className="button button-primary">Criar primeiro RDO</Link></div>}
  </div>;
}
