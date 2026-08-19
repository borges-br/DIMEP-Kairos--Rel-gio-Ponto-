"use client";

import { useEffect, useState } from "react";
import { DivergenceList } from "@/components/divergence-list";
import { CloseIcon, WarningIcon } from "@/components/icons";
import type { HoursOverviewRow } from "@/lib/dal";
import { formatDate, formatMinutes } from "@/lib/format";

/** Etapa da versao do RDO, exibida abaixo do status da linha. */
const versionLabels: Record<string, string> = {
  draft: "Rascunho em preenchimento", submitted: "Enviado para aprovação", returned: "Devolvido para correção",
  approved: "Aprovado", reviewed: "Revisado", superseded: "Substituído", cancelled: "Cancelado",
};

function ColumnHelp({ label }: { label: string }) {
  return <span className="column-help" title={label} aria-label={label} tabIndex={0}>?</span>;
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
      <th>Origem / etapa <ColumnHelp label="Toda jornada nasce sincronizada com o DIMEP. Quando o colaborador é atribuído a um RDO, a linha passa a RDO ativo." /></th>
      <th>Tempo <ColumnHelp label="Soma dos intervalos da jornada DIMEP ou dos horários declarados no RDO." /></th>
      <th>Alocações <ColumnHelp label="Quantidade de intervalos: segmentos de ponto no DIMEP ou linhas de atividade/colaborador no RDO." /></th>
      <th>Conciliação <ColumnHelp label="Compara a jornada original do DIMEP com o tempo distribuído no RDO e aponta o que exige revisão." /></th>
    </tr></thead><tbody>{rows.map((row) => <tr key={`${row.source}-${row.work_date}-${row.collaborator_id}`}>
      <td data-label="Data">{formatDate(row.work_date)}</td>
      <td data-label="Colaborador"><strong>{row.collaborator_name}</strong></td>
      <td data-label="Origem / etapa"><span className="origin-cell">{row.source === "dimep"
        ? <><span className="status-badge status-neutral">Aguardando RDO</span><small>Sincronizado com DIMEP</small></>
        : <><span className="status-badge status-success">RDO ativo</span><small>{versionLabels[row.status] || row.status}</small></>}</span></td>
      <td data-label="Tempo">{formatMinutes(row.total_minutes)}</td>
      <td data-label="Alocações">{row.allocation_count}</td>
      <td data-label="Conciliação">{Number(row.divergence_count) ? <button type="button" className="status-badge status-warning divergence-button" onClick={() => setSelected(row)}><WarningIcon />Ver {row.divergence_count} divergência(s)</button> : <span className="status-badge status-success">Coberto</span>}</td>
    </tr>)}</tbody></table></div>

    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="sync-modal divergence-modal" role="dialog" aria-modal="true" aria-labelledby="divergence-modal-title">
      <header><div><span className="eyebrow">CONCILIAÇÃO DE HORAS</span><h2 id="divergence-modal-title">Divergências de {selected.collaborator_name}</h2><p>{formatDate(selected.work_date)} · {selected.source === "dimep" ? "origem DIMEP" : "horas distribuídas no RDO"}</p></div><button type="button" className="icon-button" onClick={() => setSelected(null)} aria-label="Fechar"><CloseIcon /></button></header>
      <DivergenceList divergences={selected.divergences} />
    </section></div>}
  </>;
}
