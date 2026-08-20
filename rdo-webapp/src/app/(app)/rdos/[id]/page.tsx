import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { approveRdoAction, returnRdoAction, reviewRdoAction, submitRdoAction } from "@/app/actions/workflow";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CheckIcon, ClockIcon, ShieldIcon, UsersIcon, WarningIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { MediaManager } from "@/components/media-manager";
import { getRdoDetail } from "@/lib/dal";
import { formatDate } from "@/lib/format";
import { requirePageAccess } from "@/lib/permissions";

export const metadata: Metadata = { title: "Detalhes do RDO" };

const workflowMessages: Record<string, string> = {
  ok: "Etapa do fluxo registrada com sucesso.",
  blocked: "O RDO ainda tem pendências obrigatórias — atividade sem equipe, checklist de segurança ou ocorrência sem evidência. A conciliação DIMEP não impede o envio.",
  "invalid-status": "Esta ação não é permitida no status atual.",
  "not-owner": "Somente o líder responsável pode enviar este RDO.",
  "comment-required": "Informe o motivo da devolução.",
};

const permitStatusLabels: Record<string, string> = {
  not_required: "Não exigida",
  not_started: "Não iniciada",
  open: "Aberta",
  closed: "Encerrada",
  suspended: "Suspensa",
  cancelled: "Cancelada",
};

const weatherLabels: Record<string, string> = { sunny: "Ensolarado", cloudy: "Nublado", rainy: "Chuvoso", windy: "Vento forte" };

export default async function RdoDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ workflow?: string }> }) {
  const { id } = await params;
  await requirePageAccess("rdos");
  const detail = await getRdoDetail(id);
  if (!detail) notFound();
  const workflow = (await searchParams).workflow;
  const roles = detail.session.roles;
  const canApprove = roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
  const canReview = roles.some((role) => ["manager", "director", "admin"].includes(role));
  const canUpload = ["draft", "returned"].includes(detail.rdo.status);
  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Diários de campo", href: "/rdos" }, { label: `${detail.rdo.project_code} · ${formatDate(detail.rdo.work_date)}` }]} />
    <header className="page-header"><div><span className="eyebrow">{detail.rdo.project_code} · VERSÃO {detail.rdo.version_number}</span><h1>{detail.rdo.project_name}</h1><p>{detail.rdo.client_name} · {formatDate(detail.rdo.work_date)} · Líder: {detail.rdo.leader_name}</p></div><div className="header-actions"><a className="button button-secondary" href={`/api/exports/rdo/${detail.rdo.id}/pdf`}>Gerar PDF</a>{["approved", "reviewed"].includes(detail.rdo.status) && <a className="button button-primary" href={`/api/exports/imuv/chronometer?rdoId=${detail.rdo.id}`}>Planilha IMUV</a>}<StatusBadge status={detail.rdo.status} /></div></header>
    {workflow && workflowMessages[workflow] && <div className={workflow === "ok" ? "success-banner" : "form-error"}>{workflowMessages[workflow]}</div>}
    <section className="detail-summary"><article><ClockIcon /><span><small>Conciliação DIMEP</small><strong>{detail.rdo.time_reconciled_at ? "Concluída" : "Pendente"}</strong></span></article><article><UsersIcon /><span><small>Atividades</small><strong>{detail.activities.length}</strong></span></article><article><ShieldIcon /><span><small>Segurança</small><strong>{detail.safety ? "Preenchida" : "Pendente"}</strong></span></article></section>
    <section className="panel detail-panel"><div className="panel-heading"><div><h2>Atividades executadas</h2><p>Grupos que geram os apontamentos individuais da equipe.</p></div></div><div className="activity-summary-list">{detail.activities.map((activity) => <article key={activity.id}><span className="activity-sequence">{activity.sequence_number}</span><div><span className="project-code">{activity.task_code} · {activity.location_label}</span><h3>{activity.task_name}</h3><p>{activity.execution_description}</p><small>{activity.starts_at} — {activity.ends_at} · {activity.member_count} colaborador(es){activity.quantity ? ` · ${activity.quantity} ${activity.unit}` : ""}{activity.daily_progress_percent ? ` · ${activity.daily_progress_percent}% no dia` : ""}</small>{activity.permit_number && <div className="permit-summary"><strong>PT {activity.permit_number}</strong><span>{activity.permit_opened_at || "—"} → {activity.permit_closed_at || "em aberto"} · {permitStatusLabels[activity.permit_status || ""] || activity.permit_status}</span></div>}</div></article>)}</div></section>
    <div className="detail-grid"><section className="panel detail-box"><h2>Segurança</h2>{detail.safety ? <ul className="check-list"><li className={detail.safety.dds_performed ? "ok" : "bad"}>{detail.safety.dds_performed ? <CheckIcon /> : <WarningIcon />} DDS realizado</li><li className={detail.safety.ppe_compliant ? "ok" : "bad"}>{detail.safety.ppe_compliant ? <CheckIcon /> : <WarningIcon />} EPIs adequados</li><li className={!detail.safety.unsafe_condition_found ? "ok" : "bad"}>{!detail.safety.unsafe_condition_found ? <CheckIcon /> : <WarningIcon />} {detail.safety.unsafe_condition_found ? "Condição insegura encontrada" : "Sem condição insegura"}</li></ul> : <p>Não preenchida.</p>}</section><section className="panel detail-box"><h2>Condições e continuidade</h2><p><strong>Clima:</strong> {detail.conditions?.weather_condition ? weatherLabels[detail.conditions.weather_condition] || detail.conditions.weather_condition : "Não informado"}{detail.conditions?.temperature_c ? ` · ${detail.conditions.temperature_c} °C` : ""}</p>{detail.followups.map((item) => <p key={`${item.followup_type}-${item.description}`}><strong>{item.followup_type === "next_step" ? "Próximo passo" : "Pendência"}:</strong> {item.description}</p>)}{!detail.followups.length && <p>Sem pendências registradas.</p>}</section></div>
    <section className="panel detail-box detail-wide"><h2>Evidências e áudio</h2><MediaManager rdoId={detail.rdo.id} canUpload={canUpload} activities={detail.activities} media={detail.media} /></section>
    {(detail.occurrences.length > 0 || detail.quality.length > 0) && <section className="panel detail-box detail-wide"><h2>Ocorrências e qualidade</h2>{detail.occurrences.map((item) => <p key={item.description}><strong>Ocorrência · {item.severity}:</strong> {item.description} — {item.immediate_action}</p>)}{detail.quality.map((item) => <p key={item.description}><strong>Qualidade · {item.result}:</strong> {item.description}</p>)}</section>}
    <section className="workflow-panel"><div><h2>Fluxo de validação</h2><p>O envio só é liberado depois que todos os bloqueios forem resolvidos.</p></div>{detail.blockers.length > 0 && <ul className="blocker-list">{detail.blockers.map((item) => <li key={item.error_code}><WarningIcon />{item.error_message}</li>)}</ul>}<div className="workflow-actions">{["draft", "returned"].includes(detail.rdo.status) && <form action={submitRdoAction}><input type="hidden" name="rdoId" value={detail.rdo.id} /><button className="button button-primary" type="submit">Enviar para aprovação</button></form>}{detail.rdo.status === "submitted" && canApprove && <form action={approveRdoAction}><input type="hidden" name="rdoId" value={detail.rdo.id} /><button className="button button-primary" type="submit">Aprovar RDO</button></form>}{detail.rdo.status === "approved" && canReview && <form action={reviewRdoAction}><input type="hidden" name="rdoId" value={detail.rdo.id} /><button className="button button-primary" type="submit">Revisar e concluir</button></form>}{["submitted", "approved"].includes(detail.rdo.status) && canApprove && <form action={returnRdoAction} className="return-form"><input type="hidden" name="rdoId" value={detail.rdo.id} /><input className="input-field" name="comment" required maxLength={1000} placeholder="Motivo da devolução…" /><button className="button button-secondary" type="submit">Devolver ao líder</button></form>}</div></section>
  </div>;
}
