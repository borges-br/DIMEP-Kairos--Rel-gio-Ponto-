import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { getRdoDetail } from "@/lib/dal";
import { formatDate } from "@/lib/format";

export const runtime = "nodejs";

const weather: Record<string, string> = { sunny: "Ensolarado", cloudy: "Nublado", rainy: "Chuvoso", windy: "Vento forte" };

function safe(value: unknown) {
  return String(value ?? "—").replace(/[\u2013\u2014]/g, "-").replace(/\u2192/g, "para");
}

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const words = safe(text).split(/\s+/); const lines: string[] = []; let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width || !line) line = next;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line); return lines;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const detail = await getRdoDetail(id);
  if (!detail) return Response.json({ error: "RDO não encontrado." }, { status: 404 });
  const report = detail;

  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageSize: [number, number] = [595.28, 841.89];
  const margin = 46; const contentWidth = pageSize[0] - margin * 2;
  let page: PDFPage; let y = 0;

  function newPage() {
    page = pdf.addPage(pageSize); y = pageSize[1] - margin;
    page.drawText("RDO | GLB Tech", { x: margin, y, size: 9, font: bold, color: rgb(.05,.18,.34) });
    page.drawText(`Relatório ${report.rdo.project_code}`, { x: pageSize[0] - margin - 120, y, size: 8, font: regular, color: rgb(.38,.45,.55) });
    y -= 25;
  }
  function ensure(height: number) { if (y - height < 48) newPage(); }
  function line(text: unknown, options: { bold?: boolean; size?: number; indent?: number; color?: ReturnType<typeof rgb> } = {}) {
    const font = options.bold ? bold : regular; const size = options.size ?? 9.5; const indent = options.indent ?? 0;
    const lines = wrap(safe(text), font, size, contentWidth - indent); ensure(lines.length * (size + 4));
    for (const item of lines) { page.drawText(item, { x: margin + indent, y, size, font, color: options.color ?? rgb(.08,.13,.2) }); y -= size + 4; }
  }
  function heading(text: string) {
    ensure(34); y -= 5; page.drawRectangle({ x: margin, y: y - 5, width: contentWidth, height: 23, color: rgb(.92,.96,1) });
    page.drawText(text, { x: margin + 9, y: y + 2, size: 11, font: bold, color: rgb(.03,.3,.72) }); y -= 31;
  }

  newPage();
  line("DIÁRIO DE CAMPO", { bold: true, size: 20, color: rgb(.03,.12,.24) });
  line(`${detail.rdo.project_code} · ${detail.rdo.project_name}`, { bold: true, size: 13 });
  line(`Cliente: ${detail.rdo.client_name}`);
  line(`Data: ${formatDate(detail.rdo.work_date)} | Líder: ${detail.rdo.leader_name} | Versão: ${detail.rdo.version_number} | Status: ${detail.rdo.status}`);

  heading("Atividades e equipe");
  for (const activity of detail.activities) {
    line(`${activity.sequence_number}. ${activity.task_code} · ${activity.task_name}`, { bold: true });
    line(`Local: ${activity.location_label} | Horário: ${activity.starts_at} - ${activity.ends_at} | Equipe: ${activity.member_names || `${activity.member_count} colaborador(es)`}`, { indent: 10 });
    line(`Serviço: ${activity.execution_description}`, { indent: 10 });
    if (activity.quantity) line(`Medição: ${activity.quantity} ${activity.unit || ""}${activity.daily_progress_percent ? ` | Avanço: ${activity.daily_progress_percent}%` : ""}`, { indent: 10 });
    if (activity.permit_number) line(`PT ${activity.permit_number}: ${activity.permit_opened_at || "—"} - ${activity.permit_closed_at || "em aberto"} (${activity.permit_status})`, { indent: 10 });
    y -= 5;
  }

  heading("Segurança e condições");
  if (detail.safety) {
    line(`DDS: ${detail.safety.dds_performed ? "Sim" : "Não"} | EPIs adequados: ${detail.safety.ppe_compliant ? "Sim" : "Não"} | Condição insegura: ${detail.safety.unsafe_condition_found ? "Sim" : "Não"}`);
    if (detail.safety.details) line(`Detalhes: ${detail.safety.details}`);
    if (detail.safety.corrective_action) line(`Ação corretiva: ${detail.safety.corrective_action}`);
  } else line("Checklist de segurança não preenchido.");
  if (detail.conditions) {
    line(`Clima: ${weather[detail.conditions.weather_condition || ""] || detail.conditions.weather_condition || "Não informado"}${detail.conditions.temperature_c ? ` | ${detail.conditions.temperature_c} °C` : ""}`);
    if (detail.conditions.impact_description) line(`Impacto: ${detail.conditions.impact_description}`);
  }

  if (detail.occurrences.length || detail.quality.length || detail.followups.length) {
    heading("Ocorrências, qualidade e continuidade");
    for (const item of detail.occurrences) line(`Ocorrência ${item.occurrence_type} (${item.severity}): ${item.description}. Providência: ${item.immediate_action}`);
    for (const item of detail.quality) line(`Qualidade ${item.record_type} (${item.result}): ${item.description}${item.corrective_action ? `. Ação: ${item.corrective_action}` : ""}`);
    for (const item of detail.followups) line(`${item.followup_type === "next_step" ? "Próximo passo" : "Pendência"}: ${item.description}`);
  }

  heading("Evidências e áudios");
  if (!detail.media.length) line("Nenhuma mídia anexada.");
  for (const item of detail.media) {
    line(`${item.original_filename} | ${item.mime_type} | ${Math.ceil(Number(item.size_bytes) / 1024)} KB`, { bold: true });
    if (item.caption) line(`Legenda: ${item.caption}`, { indent: 10 });
    if (item.transcription_text) line(`Transcrição: ${item.transcription_text}`, { indent: 10 });
  }
  if (detail.rdo.general_notes) { heading("Observações gerais"); line(detail.rdo.general_notes); }

  const pages = pdf.getPages();
  pages.forEach((item, index) => item.drawText(`Página ${index + 1} de ${pages.length} | Gerado pelo RDO`, { x: margin, y: 24, size: 7.5, font: regular, color: rgb(.42,.48,.56) }));
  const bytes = await pdf.save();
  return new Response(Buffer.from(bytes), { headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="RDO-${detail.rdo.project_code}-${detail.rdo.work_date}.pdf"`,
    "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
  }});
}
