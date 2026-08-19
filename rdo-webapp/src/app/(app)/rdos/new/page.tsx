import type { Metadata } from "next";
import { NewRdoForm } from "@/components/new-rdo-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getRdoFormOptions } from "@/lib/dal";

export const metadata: Metadata = { title: "Novo RDO" };

export default async function NewRdoPage({ searchParams }: { searchParams: Promise<{ project?: string; task?: string }> }) {
  const { session, projects, materials, equipment } = await getRdoFormOptions();
  const query = await searchParams;
  const selectedProject = projects.find((project) => project.id === query.project);
  const selectedTask = selectedProject?.tasks.find((task) => task.id === query.task);
  const crumbs: { label: string; href?: string }[] = [{ label: "Visão geral", href: "/" }, { label: "Projetos", href: "/projects" }];
  if (selectedProject) crumbs.push({ label: `${selectedProject.code} · ${selectedProject.name}`, href: `/projects/${selectedProject.id}` });
  crumbs.push({ label: "Novo RDO" });
  const globalProjectAccess = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
  return <div className="page-container wide-page"><Breadcrumbs items={crumbs} /><header className="page-header"><div><span className="eyebrow">NOVO REGISTRO</span><h1>Diário de campo</h1><p>Registre as atividades do líder para toda a equipe sem repetir linhas individuais.</p></div></header><NewRdoForm projects={projects} materials={materials} equipment={equipment} initialProjectId={selectedProject?.id} initialTaskId={selectedTask?.id} globalProjectAccess={globalProjectAccess} /></div>;
}
