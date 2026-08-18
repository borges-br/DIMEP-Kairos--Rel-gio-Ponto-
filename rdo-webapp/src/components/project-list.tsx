"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowIcon, ProjectsIcon, SearchIcon, UsersIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";

type Project = { id: string; code: string; name: string; client_name: string; status: string; task_count: string; member_count: string };

export function ProjectList({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return normalized ? projects.filter((project) => `${project.code} ${project.name} ${project.client_name}`.toLocaleLowerCase("pt-BR").includes(normalized)) : projects;
  }, [projects, query]);
  return <>
    <label className="search-box"><SearchIcon /><span className="sr-only">Pesquisar projeto</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por projeto, código ou cliente…" /></label>
    <div className="project-grid">
      {filtered.map((project) => <article className="project-card" key={project.id}>
        <div className="project-card-top"><span className="project-code">{project.code}</span><StatusBadge status={project.status} /></div>
        <h2>{project.name}</h2><p>{project.client_name}</p>
        <div className="project-meta"><span><ProjectsIcon />{project.task_count} tarefas</span><span><UsersIcon />{project.member_count} pessoas</span></div>
        <Link href={`/projects/${project.id}`} className="card-link">Abrir projeto <ArrowIcon /></Link>
      </article>)}
      {!filtered.length && <div className="empty-state"><ProjectsIcon /><h2>Nenhum projeto encontrado</h2><p>Ajuste a pesquisa ou verifique a sincronização com o IMUV.</p></div>}
    </div>
  </>;
}
