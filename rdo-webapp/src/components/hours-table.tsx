"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { reviewHoursDivergenceAction, type HoursReviewState } from "@/app/actions/hours";
import { CloseIcon, WarningIcon } from "@/components/icons";
import type { HoursDivergenceDetail, HoursOverviewRow } from "@/lib/dal";
import { formatDate, formatMinutes } from "@/lib/format";

const issueLabels: Record<string, string> = {
  changed_start: "Início alterado", changed_end: "Fim alterado", changed_both: "Início e fim alterados",
  missing_punch: "Batida ausente", manual_entry: "Lançamento manual", other: "Outra divergência",
  unmatched_employee: "Funcionário não conciliado", invalid_punch: "Batida inválida", missing_end: "Saída ausente",
  duplicate_time: "Batida duplicada", cross_midnight: "Jornada entre dias",
};

function ColumnHelp({ label }: { label: string }) {
  return <span className="column-help" title={label} aria-label={label} tabIndex={0}>?</span>;
}

function SubmitButtons({ source }: { source: "rdo" | "dimep" }) {
  const { pending } = useFormStatus();
  if (source === "dimep") return <button className="button button-secondary" name="decision" value="waived" disabled={pending}>{pending ? "Registrando…" : "Dispensar com justificativa"}</button>;
  return <div className="divergence-actions"><button className="button button-secondary" name="decision" value="correction_requested" disabled={pending}>Solicitar correção</button><button className="button button-primary" name="decision" value="accepted" disabled={pending}>{pending ? "Registrando…" : "Aceitar justificativa"}</button></div>;
}

function ReviewForm({ detail }: { detail: HoursDivergenceDetail }) {
  const [state, action] = useActionState<HoursReviewState, FormData>(reviewHoursDivergenceAction, undefined);
  return <form action={action} className="divergence-review-form">
    <input type="hidden" name="id" value={detail.id} />
    <label className="field-group"><span>{detail.source === "dimep" ? "Motivo da dispensa" : "Parecer da revisão"} <b>*</b></span><textarea className="input-field" name="note" rows={2} minLength={5} maxLength={1000} required placeholder={detail.source === "dimep" ? "Ex.: batida conferida no espelho de ponto; registro duplicado." : "Descreva por que o intervalo pode ser aceito ou o que precisa ser corrigido."} /></label>
    {state?.error && <p className="form-error" role="alert">{state.error}</p>}
    {state?.ok && <p className="readiness-note" role="status">{state.ok}</p>}
    <SubmitButtons source={detail.source} />
  </form>;
}

export function HoursTable({ rows }: { rows: HoursOverviewRow[] }) {
  const [selected, setSelected] = useState<HoursOverviewRow | null>(null);
  useEffect(() => {
    if (!selected) return;
    function close(event: KeyboardEvent) { if (event.key === "Escape") setSelected(null); }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [selected]);

  return <>
    <div className="table-shell"><table className="data-table hours-table"><thead><tr>
      <th>Data <ColumnHelp label="Data da jornada no fuso da organização." /></th>
      <th>Colaborador <ColumnHelp label="Funcionário conciliado pelo CPF/De-Para entre DIMEP, IMUV e aplicativo." /></th>
      <th>Origem / etapa <ColumnHelp label="DIMEP indica jornada importada ainda sem distribuição. RDO indica tempo já distribuído em atividades." /></th>
      <th>Tempo <ColumnHelp label="Soma dos intervalos da jornada DIMEP ou dos horários declarados no RDO." /></th>
      <th>Alocações <ColumnHelp label="Quantidade de intervalos: segmentos de ponto no DIMEP ou linhas de atividade/colaborador no RDO." /></th>
      <th>Conciliação <ColumnHelp label="Compara a jornada original do DIMEP com o tempo distribuído no RDO e aponta o que exige revisão." /></th>
    </tr></thead><tbody>{rows.map((row) => <tr key={`${row.source}-${row.work_date}-${row.collaborator_id}`}>
      <td data-label="Data">{formatDate(row.work_date)}</td>
      <td data-label="Colaborador"><strong>{row.collaborator_name}</strong></td>
      <td data-label="Origem / etapa">{row.source === "dimep" ? <span className="status-badge status-neutral">DIMEP · aguardando RDO</span> : <span className="status-badge status-success">RDO · {row.status}</span>}</td>
      <td data-label="Tempo">{formatMinutes(row.total_minutes)}</td>
      <td data-label="Alocações">{row.allocation_count}</td>
      <td data-label="Conciliação">{Number(row.divergence_count) ? <button type="button" className="status-badge status-warning divergence-button" onClick={() => setSelected(row)}><WarningIcon />Ver {row.divergence_count} divergência(s)</button> : <span className="status-badge status-success">Coberto</span>}</td>
    </tr>)}</tbody></table></div>

    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="sync-modal divergence-modal" role="dialog" aria-modal="true" aria-labelledby="divergence-modal-title">
      <header><div><span className="eyebrow">CONCILIAÇÃO DE HORAS</span><h2 id="divergence-modal-title">Divergências de {selected.collaborator_name}</h2><p>{formatDate(selected.work_date)} · {selected.source === "dimep" ? "origem DIMEP" : "horas distribuídas no RDO"}</p></div><button type="button" className="icon-button" onClick={() => setSelected(null)} aria-label="Fechar"><CloseIcon /></button></header>
      <div className="divergence-list">{selected.divergences.map((detail) => <article className="divergence-card" key={detail.id}>
        <div className="divergence-card-head"><div><span>{detail.source === "dimep" ? "DIMEP" : "RDO"}</span><h3>{issueLabels[detail.issue_type] || detail.issue_type}</h3></div><span className="status-badge status-warning">{detail.status === "rejected" ? "Correção solicitada" : "Pendente"}</span></div>
        {(detail.project_label || detail.task_label) && <p className="divergence-context"><strong>{detail.project_label}</strong>{detail.task_label && <span>{detail.task_label}</span>}</p>}
        {(detail.original_interval || detail.declared_interval) && <dl className="interval-comparison"><div><dt>Jornada DIMEP</dt><dd>{detail.original_interval || "Sem par de batidas"}</dd></div><div><dt>Declarado no RDO</dt><dd>{detail.declared_interval || "Não declarado"}</dd></div></dl>}
        <p className="divergence-explanation">{detail.explanation}</p>
        {detail.rdo_id && <Link className="card-link" href={`/rdos/${detail.rdo_id}`}>Abrir o RDO relacionado</Link>}
        {detail.source === "dimep" && <p className="readiness-note">Corrija a batida no DIMEP e sincronize novamente. Use a dispensa somente quando a ocorrência for conferida e justificável.</p>}
        <ReviewForm detail={detail} />
      </article>)}</div>
    </section></div>}
  </>;
}
