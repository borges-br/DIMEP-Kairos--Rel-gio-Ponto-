"use client";

import { useState } from "react";
import type { ImuvDirection, ImuvPreview } from "@/lib/integrations/imuv";

const entityLabel = { client: "Cliente", collaborator: "Funcionário", project: "Projeto", task: "Tarefa" };

export function ImuvSyncPanel() {
  const [preview, setPreview] = useState<ImuvPreview | null>(null);
  const [loading, setLoading] = useState<ImuvDirection | "apply" | null>(null);
  const [message, setMessage] = useState("");

  async function load(direction: ImuvDirection) {
    setLoading(direction); setMessage("");
    const response = await fetch(`/api/integrations/imuv?direction=${direction}`, { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) setMessage(result.error || "Falha ao preparar a prévia."); else setPreview(result);
    setLoading(null);
  }

  async function apply() {
    if (!preview) return;
    setLoading("apply"); setMessage("");
    const response = await fetch("/api/integrations/imuv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ direction: preview.direction, digest: preview.digest }) });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || "Falha na sincronização.");
      if (result.preview) setPreview(result.preview);
    } else {
      setPreview(null); setMessage(`Sincronização concluída: ${result.written} registro(s) processado(s), ${result.rejected} rejeitado(s).`);
      window.location.reload();
    }
    setLoading(null);
  }

  return <section className="panel imuv-sync-panel">
    <div><span className="eyebrow">CONTROLE BIDIRECIONAL</span><h2>Sincronização IMUV</h2><p>Nenhuma alteração é aplicada antes da conferência. A saída é restrita ao cadastro de funcionários: nome, CPF, e-mail, telefone e situação ativa.</p></div>
    <div className="sync-buttons">
      <button className="button button-primary" disabled={Boolean(loading)} onClick={() => load("pull")}>{loading === "pull" ? "Consultando…" : "Puxar informações do IMUV"}</button>
      <button className="button button-secondary" disabled={Boolean(loading)} onClick={() => load("push")}>{loading === "push" ? "Comparando…" : "Enviar alterações ao IMUV"}</button>
    </div>
    {message && <p className="sync-message" role="status">{message}</p>}
    {preview && <div className="modal-backdrop" role="presentation">
      <section className="sync-modal" role="dialog" aria-modal="true" aria-labelledby="sync-modal-title">
        <header><div><span className="eyebrow">PRÉVIA OBRIGATÓRIA</span><h2 id="sync-modal-title">{preview.direction === "pull" ? "Dados que serão substituídos no APP" : "Dados que serão substituídos no IMUV"}</h2></div><button className="icon-button" onClick={() => setPreview(null)} aria-label="Fechar">×</button></header>
        <div className="sync-summary"><span>{preview.counts.create} inclusões</span><span>{preview.counts.update} alterações</span><span>{preview.counts.skip} ignorados</span></div>
        <div className="sync-diff-list">
          {preview.items.length === 0 && <div className="empty-state"><h3>Nenhuma diferença encontrada</h3><p>Os dois lados já estão equivalentes para os campos suportados.</p></div>}
          {preview.items.map((item) => <article key={`${item.entity}:${item.externalId}`} className={`sync-diff-item ${item.action}`}>
            <div><span>{entityLabel[item.entity]} · {item.action === "create" ? "Novo" : item.action === "update" ? "Alterar" : "Ignorar"}</span><strong>{item.label}</strong></div>
            {item.note && <p>{item.note}</p>}
            {item.fields.length > 0 && <table><thead><tr><th>Campo</th><th>Valor atual</th><th>Novo valor</th></tr></thead><tbody>{item.fields.map((field) => <tr key={field.field}><td>{field.field}</td><td>{field.current || "—"}</td><td>{field.incoming || "—"}</td></tr>)}</tbody></table>}
          </article>)}
        </div>
        <footer><button className="button button-secondary" onClick={() => setPreview(null)} disabled={loading === "apply"}>Cancelar</button><button className="button button-primary" onClick={apply} disabled={loading === "apply" || preview.items.every((item) => item.action === "skip")}>{loading === "apply" ? "Aplicando…" : preview.direction === "pull" ? "Confirmar importação" : "Confirmar envio ao IMUV"}</button></footer>
      </section>
    </div>}
  </section>;
}
