import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WorkDistribution } from "@/components/work-distribution";
import { getWorkDistributionData } from "@/lib/dal";

export const metadata: Metadata = { title: "Distribuir trabalho" };

export default async function DistributionPage() {
  const { projects, assignments } = await getWorkDistributionData();
  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Distribuir trabalho" }]} />
    <header className="page-header"><div><span className="eyebrow">IMUV × PLANEJAMENTO × DIMEP</span><h1>Distribuir trabalho</h1><p>Programe quem executará cada tarefa e acompanhe a cobertura da jornada real.</p></div></header>
    <WorkDistribution projects={projects} assignments={assignments} />
  </div>;
}
