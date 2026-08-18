"use client";

import { useMemo, useState } from "react";
import type { DimepEmployeePreview, DimepPreview, DimepPunchPreview } from "@/lib/integrations/dimep";
import { DIMEP_MAX_PERIOD_DAYS } from "@/lib/integrations/dimep-constants";

const iso = (date: Date) => date.toISOString().slice(0, 10);
const daysBetween = (start: string, end: string) => Math.round((new Date(`${end}T12:00:00Z`).getTime() - new Date(`${start}T12:00:00Z`).getTime()) / 86_400_000) + 1;

async function responseResult(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("json")) return response.json().catch(() => ({ error: `O servidor retornou JSON inválido (HTTP ${response.status}).` }));
  const body = await response.text().catch(() => "");
  if (response.status === 502 || response.status === 504) return { error: "O servidor ou o serviço externo demorou demais para responder. Tente novamente com um período menor." };
  if (response.status === 401 || response.status === 403) return { error: "Sua sessão expirou ou você não possui permissão para executar esta operação." };
  return { error: body.trim() ? `O servidor respondeu HTTP ${response.status}: ${body.replace(/\s+/g, " ").slice(0, 180)}` : `O servidor respondeu HTTP ${response.status}.` };
}

function requestError(error: unknown) {
  if (error instanceof TypeError) return "Não foi possível comunicar com o servidor. Verifique sua conexão e tente novamente.";
  return error instanceof Error ? error.message : "Ocorreu um erro inesperado. Tente novamente.";
}

export function DimepSyncPanel() {
  const defaults = useMemo(() => { const end = new Date(); const start = new Date(end); start.setDate(start.getDate() - 7); return { start: iso(start), end: iso(end) }; }, []);
  const [startDate, setStartDate] = useState(defaults.start); const [endDate, setEndDate] = useState(defaults.end);
  const [preview, setPreview] = useState<DimepPreview | null>(null); const [confirmations, setConfirmations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<"employees" | "punches" | "apply" | null>(null); const [message, setMessage] = useState("");

  async function load(stage: "employees" | "punches") {
    setLoading(stage); setMessage(""); setConfirmations({});
    try {
      if (stage === "punches") {
        if (!startDate || !endDate) throw new Error("Informe as datas inicial e final.");
        const days = daysBetween(startDate, endDate);
        if (days <= 0) throw new Error("A data inicial não pode ser posterior à data final.");
        if (days > DIMEP_MAX_PERIOD_DAYS) throw new Error(`Selecione um período de até ${DIMEP_MAX_PERIOD_DAYS} dias.`);
      }
      const query = new URLSearchParams({ stage }); if (stage === "punches") { query.set("startDate", startDate); query.set("endDate", endDate); }
      const response = await fetch(`/api/integrations/dimep?${query}`, { cache: "no-store" });
      const result = await responseResult(response);
      if (!response.ok) { setPreview(null); setMessage(result.error || "Falha ao preparar a prévia DIMEP."); } else setPreview(result as DimepPreview);
    } catch (error) {
      setPreview(null); setMessage(requestError(error));
    } finally {
      setLoading(null);
    }
  }

  async function apply() {
    if (!preview) return; setLoading("apply"); setMessage("");
    try {
      const selected = preview.stage === "employees" ? Object.entries(confirmations).map(([externalId, candidateId]) => ({ externalId, candidateId })) : [];
      const response = await fetch("/api/integrations/dimep", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stage: preview.stage, digest: preview.digest, startDate: preview.stage === "punches" ? preview.startDate : undefined, endDate: preview.stage === "punches" ? preview.endDate : undefined, confirmations: selected }) });
      const result = await responseResult(response);
      if (!response.ok) { setMessage(result.error || "Falha na sincronização DIMEP."); if (result.preview) setPreview(result.preview); }
      else {
        setPreview(null);
        const pointer = result.pointerError ? ` Batidas salvas, mas o ponteiro não avançou: ${result.pointerError}` : result.pointer ? ` Ponteiro confirmado para ${result.pointer.acknowledged} batida(s).` : "";
        setMessage(`Sincronização concluída: ${result.written} gravado(s), ${result.rejected} pendência(s).${pointer}`);
        window.setTimeout(() => window.location.reload(), 3000);
      }
    } catch (error) {
      setMessage(requestError(error));
    } finally {
      setLoading(null);
    }
  }

  return <section className="panel imuv-sync-panel dimep-sync-panel">
    <div><span className="eyebrow">CONCILIAÇÃO E JORNADA</span><h2>Sincronização DIMEP</h2><p>Primeiro concilie os funcionários. Depois importe as batidas do período; o ponteiro só avança após a gravação local ser confirmada.</p></div>
    <div className="dimep-sync-actions">
      <button className="button button-primary" disabled={Boolean(loading)} onClick={() => load("employees")}>{loading === "employees" ? "Consultando…" : "1. Conciliar funcionários"}</button>
      <label><span>De</span><input className="input-field" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
      <label><span>Até</span><input className="input-field" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></label>
      <button className="button button-secondary" disabled={Boolean(loading)} onClick={() => load("punches")}>{loading === "punches" ? "Consultando…" : "2. Importar batidas"}</button>
    </div>
    <p className="field-help">Períodos de até {DIMEP_MAX_PERIOD_DAYS} dias são divididos automaticamente em blocos seguros de 31 dias.</p>
    {message && <p className="sync-message" role="alert">{message}</p>}
    {preview && <div className="modal-backdrop" role="presentation"><section className="sync-modal" role="dialog" aria-modal="true" aria-labelledby="dimep-modal-title">
      <header><div><span className="eyebrow">PRÉVIA OBRIGATÓRIA</span><h2 id="dimep-modal-title">{preview.stage === "employees" ? "Conciliação de funcionários" : `Batidas de ${preview.startDate.split("-").reverse().join("/")} a ${preview.endDate.split("-").reverse().join("/")}`}</h2></div><button className="icon-button" onClick={() => setPreview(null)} aria-label="Fechar">×</button></header>
      {preview.stage === "employees" ? <EmployeePreview preview={preview} confirmations={confirmations} setConfirmations={setConfirmations} /> : <PunchPreview preview={preview} />}
      <footer><button className="button button-secondary" onClick={() => setPreview(null)} disabled={loading === "apply"}>Cancelar</button><button className="button button-primary" onClick={apply} disabled={loading === "apply" || (preview.stage === "punches" && preview.counts.punches === 0)}>{loading === "apply" ? "Aplicando…" : preview.stage === "employees" ? "Confirmar conciliação" : "Gravar batidas e confirmar ponteiro"}</button></footer>
    </section></div>}
  </section>;
}

function EmployeePreview({ preview, confirmations, setConfirmations }: { preview: DimepEmployeePreview; confirmations: Record<string, string>; setConfirmations: (value: Record<string, string>) => void }) {
  return <><div className="sync-summary"><span>{preview.counts.create} novos</span><span>{preview.counts.update} alterações</span><span>{preview.counts.link} por CPF</span><span>{preview.counts.review} para revisar</span><span>{preview.counts.skip} ignorados</span></div><div className="sync-diff-list">
    {preview.items.map((item) => <article key={item.externalId} className={`sync-diff-item ${item.action === "skip" ? "skip" : item.action === "create" ? "create" : "update"}`}><div><span>{item.action === "create" ? "Novo" : item.action === "link" ? "Vincular por CPF" : item.action === "review" ? "Revisão manual" : item.action === "update" ? "Atualizar" : "Ignorar"}</span><strong>{item.name}</strong><small>Matrícula: {item.employeeNumber || "—"} · CPF: {item.cpf ? `***.***.${item.cpf.slice(6, 9)}-${item.cpf.slice(9)}` : "não informado"}</small></div>{item.note && <p>{item.note}</p>}{item.action === "review" && item.candidateId && <label className="check-row"><input type="checkbox" checked={confirmations[item.externalId] === item.candidateId} onChange={(event) => { const next = { ...confirmations }; if (event.target.checked) next[item.externalId] = item.candidateId!; else delete next[item.externalId]; setConfirmations(next); }} /><span>Confirmo que <strong>{item.candidateName}</strong> é a mesma pessoa</span></label>}</article>)}
  </div></>;
}

function PunchPreview({ preview }: { preview: DimepPunchPreview }) {
  return <><div className="sync-summary"><span>{preview.counts.punches} batidas</span><span>{preview.counts.employees} funcionários</span><span>{preview.counts.pairs} intervalos</span><span>{preview.counts.issues} pendências</span><span>{preview.counts.unlinked} sem vínculo</span></div><div className="sync-diff-list">
    {!preview.items.length && <div className="empty-state"><h3>Nenhuma batida pendente</h3><p>O DIMEP não retornou marcações não coletadas para o período.</p></div>}
    {preview.items.map((item) => <article key={`${item.externalEmployeeId}:${item.workDate}`} className={`sync-diff-item ${item.linked ? "update" : "skip"}`}><div><span>{item.workDate.split("-").reverse().join("/")} · {item.linked ? "Funcionário conciliado" : "Sem vínculo DIMEP"}</span><strong>{item.employeeName}</strong></div><p>{item.punches} batida(s) · {item.pairs} intervalo(s) · {item.issues} pendência(s)</p></article>)}
  </div></>;
}
