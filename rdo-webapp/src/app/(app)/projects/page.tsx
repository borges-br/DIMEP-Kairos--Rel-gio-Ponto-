import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/dal";
import { requirePageAccess } from "@/lib/permissions";

export const metadata: Metadata = { title: "Projetos" };

export default async function ProjectsPage() {
  await requirePageAccess("projects");
  const { projects } = await getProjects();
  return <div className="page-container"><Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Projetos" }]} /><header className="page-header"><div><span className="eyebrow">DADOS MESTRES · IMUV</span><h1>Projetos</h1><p>Somente projetos ativos e vinculados ao seu perfil aparecem aqui.</p></div></header><ProjectList projects={projects} /></div>;
}
