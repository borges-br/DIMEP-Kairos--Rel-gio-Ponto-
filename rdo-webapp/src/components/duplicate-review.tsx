"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { resolveDuplicateAction, type DuplicateState } from "@/app/actions/duplicates";
import { UsersIcon, WarningIcon } from "@/components/icons";
import type { DuplicateCandidate } from "@/lib/dal";

const reasonLabels: Record<DuplicateCandidate["reason"], string> = {
  employee_number: "Mesma matrícula", cpf: "Mesmo CPF", name: "Mesmo nome",
};

function maskCpf(cpf: string | null) {
  return cpf ? `***.***.${cpf.slice(6, 9)}-${cpf.slice(9)}` : "sem CPF";
}

function Buttons() {
  const { pending } = useFormStatus();
  return <div className="divergence-actions">
    <button className="button button-secondary" name="decision" value="distinct" disabled={pending}>São pessoas diferentes</button>
    <button className="button button-primary" name="decision" value="merged" disabled={pending}>{pending ? "Processando…" : "Consolidar cadastros"}</button>
  </div>;
}

function Card({ candidate }: { candidate: DuplicateCandidate }) {
  const [state, action] = useActionState<DuplicateState, FormData>(resolveDuplicateAction, undefined);
  // Por padrão fica o cadastro com mais histórico; empate resolve pelo mais antigo.
  const suggested = Number(candidate.duplicate_allocations) > Number(candidate.primary_allocations)
    ? candidate.duplicate_id : candidate.primary_id;
  const [keepId, setKeepId] = useState(suggested);
  const lados = [
    { id: candidate.primary_id, name: candidate.primary_name, number: candidate.primary_number, cpf: candidate.primary_cpf, allocations: candidate.primary_allocations, created: candidate.primary_created },
    { id: candidate.duplicate_id, name: candidate.duplicate_name, number: candidate.duplicate_number, cpf: candidate.duplicate_cpf, allocations: candidate.duplicate_allocations, created: candidate.duplicate_created },
  ];

  if (state?.ok) return <article className="duplicate-card resolved"><UsersIcon /><p>{state.ok}</p></article>;

  return <article className="duplicate-card">
    <header><span className="status-badge status-warning"><WarningIcon />{reasonLabels[candidate.reason]}</span></header>
    <form action={action}>
      <input type="hidden" name="keepId" value={keepId} />
      <input type="hidden" name="dropId" value={lados.find((lado) => lado.id !== keepId)!.id} />
      <div className="duplicate-sides">{lados.map((lado) => <label key={lado.id} className={`duplicate-side${keepId === lado.id ? " keep" : ""}`}>
        <input type="radio" name="keepChoice" checked={keepId === lado.id} onChange={() => setKeepId(lado.id)} />
        <span>
          <strong>{lado.name}</strong>
          <small>Matrícula {lado.number || "não informada"} · {maskCpf(lado.cpf)}</small>
          <small>{lado.allocations} apontamento(s) · cadastrado em {new Intl.DateTimeFormat("pt-BR").format(new Date(lado.created))}</small>
        </span>
        <em>{keepId === lado.id ? "Manter este" : "Consolidar neste"}</em>
      </label>)}</div>
      <label className="field-group"><span>Motivo da decisão <b>*</b></span><textarea className="input-field" name="reason" rows={2} minLength={10} maxLength={1000} required placeholder="Ex.: mesma pessoa recadastrada após troca de matrícula no DIMEP." /></label>
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      <p className="readiness-note">Consolidar move apontamentos, batidas, vínculos e pendências para o cadastro mantido e desativa o outro. Nada é apagado.</p>
      <Buttons />
    </form>
  </article>;
}

export function DuplicateReview({ candidates }: { candidates: DuplicateCandidate[] }) {
  const [open, setOpen] = useState(false);
  if (!candidates.length) return null;
  return <section className="duplicate-panel">
    <button type="button" className="duplicate-alert" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
      <WarningIcon />
      <span>
        <strong>{candidates.length} possível(is) cadastro(s) duplicado(s)</strong>
        <small>Confirme se são a mesma pessoa para consolidar, ou marque como diferentes para silenciar o alerta.</small>
      </span>
      <em>{open ? "Fechar" : "Revisar"}</em>
    </button>
    {open && <div className="duplicate-list">{candidates.map((candidate) =>
      <Card key={`${candidate.primary_id}-${candidate.duplicate_id}-${candidate.reason}`} candidate={candidate} />)}</div>}
  </section>;
}
