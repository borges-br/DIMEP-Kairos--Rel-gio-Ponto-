"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { cancelWorkAssignmentAction, createWorkAssignmentAction, type DistributionState } from "@/app/actions/distribution";
import { CalendarRangeIcon, CheckIcon, ClockIcon, SearchIcon, WarningIcon } from "@/components/icons";
import type { RdoFormProject, WorkAssignmentRow } from "@/lib/dal";
import { formatDate } from "@/lib/format";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className="button button-primary" type="submit" disabled={pending}>{pending ? "Distribuindo…" : "Distribuir tarefa"}</button>;
}

function normalized(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

const dimepLabels = {
  awaiting: "Aguardando jornada DIMEP", covered: "Coberto pelo DIMEP",
  divergent: "Divergência no DIMEP", no_punches: "Sem batidas DIMEP",
};

export function WorkDistribution({ projects, assignments }: { projects: RdoFormProject[]; assignments: WorkAssignmentRow[] }) {
  const [state, action] = useActionState<DistributionState, FormData>(createWorkAssignmentAction, undefined);
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const project = projects.find((item) => item.id === projectId);
  const [taskId, setTaskId] = useState(projects[0]?.tasks[0]?.id || "");
  const [collaboratorId, setCollaboratorId] = useState("");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const collaborators = project?.collaborators || [];
  const selectedCollaborator = collaborators.find((item) => item.id === collaboratorId);
  const query = normalized(search.trim());
  const searchDigits = search.replace(/\D/g, "");
  const filtered = collaborators.filter((item) => !query || normalized(`${item.name} ${item.jobTitle || ""}`).includes(query) || Boolean(searchDigits && item.cpfDigits?.includes(searchDigits))).slice(0, 80);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());

  function changeProject(id: string) {
    const next = projects.find((item) => item.id === id);
    setProjectId(id);
    setTaskId(next?.tasks[0]?.id || "");
    setCollaboratorId("");
    setSearch("");
  }

  return <>
    <form action={action} className="panel distribution-form">
      <input type="hidden" name="collaboratorId" value={collaboratorId} />
      <div className="section-heading"><span className="step-number"><CalendarRangeIcon /></span><div><h2>Nova distribuição</h2><p>Escolha a tarefa do IMUV, programe o intervalo e indique quem irá executá-la.</p></div></div>
      <div className="form-grid two-columns">
        <label className="field-group"><span>Projeto <b>*</b></span><select className="input-field" name="projectId" value={projectId} onChange={(event) => changeProject(event.target.value)} required><option value="">Selecione…</option>{projects.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.name}</option>)}</select></label>
        <label className="field-group"><span>Tarefa IMUV <b>*</b></span><select className="input-field" name="taskId" value={taskId} onChange={(event) => setTaskId(event.target.value)} required><option value="">Selecione…</option>{project?.tasks.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.name}</option>)}</select></label>
      </div>
      <div className="form-grid three-columns distribution-time-grid">
        <label className="field-group"><span>Data <b>*</b></span><input className="input-field" type="date" name="workDate" defaultValue={today} required /></label>
        <label className="field-group"><span>Início <b>*</b></span><input className="input-field" type="time" name="startTime" defaultValue="07:30" required /></label>
        <label className="field-group"><span>Fim <b>*</b></span><input className="input-field" type="time" name="endTime" defaultValue="17:00" required /></label>
      </div>
      <div className="field-group searchable-collaborator"><span>Colaborador <b>*</b></span>
        <div className="searchable-input"><SearchIcon /><input className="input-field" value={search} onFocus={() => setSearchOpen(true)} onChange={(event) => { setSearch(event.target.value); setSearchOpen(true); }} placeholder="Pesquisar..." aria-label="Pesquisar por nome, CPF ou função" /></div>
        {selectedCollaborator && <div className="selected-collaborator"><CheckIcon /><span><strong>{selectedCollaborator.name}</strong>{selectedCollaborator.jobTitle && <small>{selectedCollaborator.jobTitle}</small>}</span><button type="button" onClick={() => { setCollaboratorId(""); setSearch(""); }}>Trocar</button></div>}
        {searchOpen && !selectedCollaborator && <div className="searchable-results">{filtered.map((item) => <button type="button" key={item.id} onClick={() => { setCollaboratorId(item.id); setSearch(item.name); setSearchOpen(false); }}><span><strong>{item.name}</strong><small>{item.jobTitle || (item.projectMember ? "Equipe do projeto" : "Cadastro de colaboradores")}</small></span>{item.projectMember && <em>Projeto</em>}</button>)}{!filtered.length && <p>Nenhum colaborador encontrado.</p>}</div>}
      </div>
      <label className="field-group"><span>Orientações</span><textarea className="input-field" name="instructions" rows={3} maxLength={2000} placeholder="Resultado esperado, local, materiais ou cuidados importantes…" /></label>
      <div className="integration-readiness"><span><strong>IMUV</strong>Tarefa e vínculos externos preservados; envio depende de homologação do tenant.</span><span><strong>DIMEP</strong>A jornada real será comparada com este planejamento após a sincronização.</span></div>
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      {state?.ok && <p className="readiness-note" role="status">{state.ok}</p>}
      <div className="distribution-submit"><SubmitButton /></div>
    </form>

    <section className="distribution-list-section"><div className="resource-heading"><div><h2>Trabalho programado</h2><p>Planejamento local ligado à tarefa IMUV e conferido posteriormente com a jornada DIMEP.</p></div></div>
      {assignments.length ? <div className="distribution-list">{assignments.map((item) => <article className={`distribution-card${item.status === "cancelled" ? " cancelled" : ""}`} key={item.id}>
        <div className="distribution-date"><strong>{formatDate(item.work_date)}</strong><span><ClockIcon />{item.planned_start}–{item.planned_end}</span></div>
        <div className="distribution-main"><span>{item.project_label}</span><h3>{item.task_label}</h3><strong>{item.collaborator_name}</strong>{item.instructions && <p>{item.instructions}</p>}</div>
        <div className="distribution-integrations"><span className={`status-badge ${item.imuv_linked ? "status-success" : "status-neutral"}`}>{item.imuv_linked ? "Vínculos IMUV prontos" : "Sem vínculo IMUV"}</span><span className={`status-badge ${item.dimep_status === "covered" ? "status-success" : item.dimep_status === "divergent" ? "status-warning" : "status-neutral"}`}>{item.dimep_status === "divergent" && <WarningIcon />}{dimepLabels[item.dimep_status]}</span>{item.status === "planned" ? <form action={cancelWorkAssignmentAction}><input type="hidden" name="id" value={item.id} /><button className="text-button danger" type="submit">Cancelar</button></form> : <span className="status-badge status-neutral">Cancelado</span>}</div>
      </article>)}</div> : <div className="empty-state panel"><CalendarRangeIcon /><h2>Nenhum trabalho distribuído</h2><p>Use o formulário acima para programar a primeira tarefa.</p></div>}
    </section>
  </>;
}
