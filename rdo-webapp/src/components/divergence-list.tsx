"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { reviewHoursDivergenceAction, type HoursReviewState } from "@/app/actions/hours";
import type { HoursDivergenceDetail } from "@/lib/dal";
import { formatDate } from "@/lib/format";

export const divergenceLabels: Record<string, string> = {
  changed_start: "Início alterado", changed_end: "Fim alterado", changed_both: "Início e fim alterados",
  missing_punch: "Batida ausente", manual_entry: "Lançamento manual", other: "Outra divergência",
  unmatched_employee: "Funcionário não conciliado", invalid_punch: "Batida inválida", missing_end: "Saída ausente",
  duplicate_time: "Batida duplicada", cross_midnight: "Jornada entre dias",
};

function SubmitButtons({ source }: { source: "rdo" | "dimep" }) {
  const { pending } = useFormStatus();
  if (source === "dimep") return <button className="button button-secondary" name="decision" value="waived" disabled={pending}>{pending ? "Registrando…" : "Dispensar com justificativa"}</button>;
  return <div className="divergence-actions">
    <button className="button button-secondary" name="decision" value="correction_requested" disabled={pending}>Solicitar correção</button>
    <button className="button button-primary" name="decision" value="accepted" disabled={pending}>{pending ? "Registrando…" : "Aceitar justificativa"}</button>
  </div>;
}

function ReviewForm({ detail }: { detail: HoursDivergenceDetail }) {
  const [state, action] = useActionState<HoursReviewState, FormData>(reviewHoursDivergenceAction, undefined);
  return <form action={action} className="divergence-review-form">
    <input type="hidden" name="id" value={detail.id} />
    <label className="field-group">
      <span>{detail.source === "dimep" ? "Motivo da dispensa" : "Parecer da revisão"} <b>*</b></span>
      <textarea className="input-field" name="note" rows={2} minLength={5} maxLength={1000} required
        placeholder={detail.source === "dimep"
          ? "Ex.: batida conferida no espelho de ponto; registro duplicado."
          : "Descreva por que o intervalo pode ser aceito ou o que precisa ser corrigido."} />
    </label>
    {state?.error && <p className="form-error" role="alert">{state.error}</p>}
    {state?.ok && <p className="readiness-note" role="status">{state.ok}</p>}
    <SubmitButtons source={detail.source} />
  </form>;
}

/** Cartao de divergencia com comparacao DIMEP x RDO e as acoes de revisao. */
export function DivergenceCard({ detail, showDate }: { detail: HoursDivergenceDetail; showDate?: boolean }) {
  return <article className="divergence-card">
    <div className="divergence-card-head">
      <div>
        <span>{detail.source === "dimep" ? "DIMEP" : "RDO"}{showDate ? ` · ${formatDate(detail.work_date)}` : ""}</span>
        <h3>{divergenceLabels[detail.issue_type] || detail.issue_type}</h3>
      </div>
      <span className="status-badge status-warning">{detail.status === "rejected" ? "Correção solicitada" : "Pendente"}</span>
    </div>
    {(detail.project_label || detail.task_label) && <p className="divergence-context">
      <strong>{detail.project_label}</strong>{detail.task_label && <span>{detail.task_label}</span>}
    </p>}
    {(detail.original_interval || detail.declared_interval) && <dl className="interval-comparison">
      <div><dt>Jornada DIMEP</dt><dd>{detail.original_interval || "Sem par de batidas"}</dd></div>
      <div><dt>Declarado no RDO</dt><dd>{detail.declared_interval || "Não declarado"}</dd></div>
    </dl>}
    <p className="divergence-explanation">{detail.explanation}</p>
    {detail.rdo_id && <Link className="card-link" href={`/rdos/${detail.rdo_id}`}>Abrir o RDO relacionado</Link>}
    {detail.source === "dimep" && <p className="readiness-note">Corrija a batida no DIMEP e sincronize novamente. Use a dispensa somente quando a ocorrência for conferida e justificável.</p>}
    <ReviewForm detail={detail} />
  </article>;
}

export function DivergenceList({ divergences, showDate }: { divergences: HoursDivergenceDetail[]; showDate?: boolean }) {
  if (!divergences.length) return <p className="empty-copy">Nenhuma divergência pendente.</p>;
  return <div className="divergence-list">{divergences.map((detail) =>
    <DivergenceCard key={detail.id} detail={detail} showDate={showDate} />)}</div>;
}
