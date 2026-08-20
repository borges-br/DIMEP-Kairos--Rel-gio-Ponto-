import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { getRdoDetail } from "@/lib/dal";
import { formatDate } from "@/lib/format";
import { getObject } from "@/lib/object-storage";
import { company } from "@/lib/pdf/company";
import { formatPhoneBR } from "@/lib/phone";

export const runtime = "nodejs";

const weather: Record<string, string> = {
  sunny: "Ensolarado", cloudy: "Nublado", rainy: "Chuvoso", windy: "Vento forte",
};

const statusLabels: Record<string, string> = {
  draft: "Rascunho", submitted: "Enviado para aprovação", returned: "Devolvido para correção",
  approved: "Aprovado", reviewed: "Revisado", cancelled: "Cancelado",
};

const severityLabels: Record<string, string> = {
  low: "Baixa", medium: "Média", high: "Alta", critical: "Crítica",
};

const occurrenceLabels: Record<string, string> = {
  incident: "Incidente", near_miss: "Quase acidente", accident: "Acidente",
  environmental: "Ambiental", property_damage: "Dano material", other: "Outra",
};

const qualityLabels: Record<string, string> = {
  inspection: "Inspeção", test: "Teste", nonconformity: "Não conformidade", other: "Outro",
};

const qualityResults: Record<string, string> = {
  approved: "Aprovado", rejected: "Reprovado", pending: "Pendente", conditional: "Aprovado com ressalva",
};

const permitStatus: Record<string, string> = {
  open: "Em aberto", closed: "Encerrada", cancelled: "Cancelada", not_required: "Não exigida",
};

const brand = {
  ink: rgb(0.09, 0.13, 0.19),
  muted: rgb(0.42, 0.47, 0.55),
  rule: rgb(0.85, 0.87, 0.90),
  band: rgb(0.96, 0.97, 0.98),
  orange: rgb(0.93, 0.53, 0.05),
  deep: rgb(0.16, 0.27, 0.40),
  // A logo da Interproject tem a palavra "iNTER" em branco: sobre papel branco
  // ela desaparece e sobra so a marca laranja. Dai a faixa escura no cabecalho.
  header: rgb(0.086, 0.153, 0.247),
  onHeader: rgb(1, 1, 1),
  onHeaderMuted: rgb(0.72, 0.78, 0.85),
};

/**
 * Helvetica do PDF usa WinAnsi, que cobre o portugues acentuado mas nao traços
 * longos, aspas tipograficas nem setas. Sem esta troca o pdf-lib lanca erro ao
 * encontrar qualquer um deles no texto digitado pelo lider.
 */
function safe(value: unknown) {
  return String(value ?? "—")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/→/g, "->")
    .replace(/[•▪●]/g, "-")
    .replace(/\u00a0/g, " ")
    // Qualquer outro caractere fora do WinAnsi vira interrogacao em vez de
    // derrubar a geracao inteira do relatorio.
    .replace(/[^\u0020-\u00ff\n]/g, "?");
}

function label(map: Record<string, string>, value: unknown) {
  const key = String(value ?? "");
  return map[key] || (key ? safe(key) : "—");
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const detail = await getRdoDetail(id);
  if (!detail) return Response.json({ error: "RDO não encontrado." }, { status: 404 });
  const report = detail;

  const pdf = await PDFDocument.create();
  pdf.setTitle(`RDO ${detail.rdo.project_code} - ${detail.rdo.work_date}`);
  pdf.setAuthor(company.name);
  pdf.setSubject("Relatório Diário de Obra");
  pdf.setProducer(company.name);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  let logo: PDFImage | null = null;
  try {
    // public/ e copiado para a imagem final pelo Dockerfile; src/assets nao e.
    const bytes = await readFile(path.join(process.cwd(), "public", "brand", "interproject-logo.png"));
    logo = await pdf.embedPng(bytes);
  } catch {
    // Sem a logo o relatorio sai com o nome da empresa em texto: falta de
    // imagem nao pode impedir a emissao de um documento de obra.
    logo = null;
  }

  const pageSize: [number, number] = [595.28, 841.89];
  const margin = 48;
  const contentWidth = pageSize[0] - margin * 2;
  // pageHeader() atribui antes de qualquer desenho; o `!` evita o falso
  // positivo de "usado antes de atribuir" causado pela indirecao da funcao.
  let page!: PDFPage;
  let y = 0;

  function wrap(text: string, font: PDFFont, size: number, width: number) {
    const lines: string[] = [];
    for (const paragraph of safe(text).split("\n")) {
      const words = paragraph.split(/\s+/).filter(Boolean);
      if (!words.length) { lines.push(""); continue; }
      let line = "";
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, size) <= width || !line) line = next;
        else { lines.push(line); line = word; }
      }
      if (line) lines.push(line);
    }
    return lines;
  }

  function pageHeader(withIdentity: boolean) {
    page = pdf.addPage(pageSize);
    y = pageSize[1] - margin;

    if (withIdentity) {
      // Faixa sangrada de borda a borda, com um fio laranja embaixo.
      const bandHeight = 92;
      const bandTop = pageSize[1];
      page.drawRectangle({
        x: 0, y: bandTop - bandHeight, width: pageSize[0], height: bandHeight, color: brand.header,
      });
      page.drawRectangle({
        x: 0, y: bandTop - bandHeight, width: pageSize[0], height: 3, color: brand.orange,
      });

      const logoHeight = 40;
      const logoBaseline = bandTop - bandHeight / 2 - logoHeight / 2 + 2;
      if (logo) {
        const logoWidth = (logo.width / logo.height) * logoHeight;
        page.drawImage(logo, { x: margin, y: logoBaseline, width: logoWidth, height: logoHeight });
      } else {
        page.drawText("INTERPROJECT", {
          x: margin, y: logoBaseline + 12, size: 17, font: bold, color: brand.onHeader,
        });
      }

      const right = pageSize[0] - margin;
      const lines = [company.name, `CNPJ ${company.document}`, company.address, `${company.phone} · ${company.email}`];
      let ly = bandTop - 30;
      for (const [index, text] of lines.entries()) {
        const font = index === 0 ? bold : regular;
        const size = index === 0 ? 8.5 : 7.5;
        const value = safe(text);
        page.drawText(value, {
          x: right - font.widthOfTextAtSize(value, size), y: ly, size, font,
          color: index === 0 ? brand.onHeader : brand.onHeaderMuted,
        });
        ly -= size + 4;
      }
      y = bandTop - bandHeight - 30;
    } else {
      page.drawText(safe(`RDO ${report.rdo.project_code} · ${formatDate(report.rdo.work_date)}`), {
        x: margin, y, size: 8, font: bold, color: brand.deep,
      });
      y -= 8;
      page.drawLine({
        start: { x: margin, y }, end: { x: pageSize[0] - margin, y },
        thickness: 0.7, color: brand.rule,
      });
      y -= 22;
    }
  }

  function ensure(height: number) { if (y - height < 60) pageHeader(false); }

  function line(text: unknown, options: {
    bold?: boolean; italic?: boolean; size?: number; indent?: number; color?: ReturnType<typeof rgb>; gap?: number;
  } = {}) {
    const font = options.bold ? bold : options.italic ? italic : regular;
    const size = options.size ?? 9.5;
    const indent = options.indent ?? 0;
    const lines = wrap(String(text ?? "—"), font, size, contentWidth - indent);
    for (const item of lines) {
      ensure(size + 4);
      page.drawText(item, { x: margin + indent, y, size, font, color: options.color ?? brand.ink });
      y -= size + (options.gap ?? 4);
    }
  }

  function heading(text: string) {
    // Reserva o proprio bloco mais duas linhas: um titulo sozinho no pe da
    // pagina, com o conteudo na seguinte, fica orfao e polui o relatorio.
    ensure(70);
    y -= 8;
    page.drawRectangle({ x: margin, y: y - 6, width: contentWidth, height: 22, color: brand.band });
    page.drawRectangle({ x: margin, y: y - 6, width: 3, height: 22, color: brand.orange });
    page.drawText(safe(text.toUpperCase()), {
      x: margin + 11, y: y + 1, size: 9.5, font: bold, color: brand.deep,
    });
    y -= 30;
  }

  /** Bloco de identificacao em duas colunas, rotulo acima do valor. */
  function identity(pairs: [string, string][]) {
    const columnWidth = contentWidth / 2;
    for (let index = 0; index < pairs.length; index += 2) {
      const row = pairs.slice(index, index + 2);
      const heights = row.map(([, value]) => wrap(value, regular, 9.5, columnWidth - 14).length);
      const blockHeight = 12 + Math.max(...heights) * 13 + 6;
      ensure(blockHeight);
      const top = y;
      row.forEach(([key, value], column) => {
        const x = margin + column * columnWidth;
        page.drawText(safe(key.toUpperCase()), {
          x, y: top, size: 6.8, font: bold, color: brand.muted,
        });
        let vy = top - 12;
        for (const item of wrap(value, regular, 9.5, columnWidth - 14)) {
          page.drawText(item, { x, y: vy, size: 9.5, font: regular, color: brand.ink });
          vy -= 13;
        }
      });
      y = top - blockHeight;
    }
    y -= 4;
  }

  // ---- Capa e identificação ------------------------------------------------

  pageHeader(true);

  page.drawText("RELATÓRIO DIÁRIO DE OBRA", { x: margin, y, size: 19, font: bold, color: brand.ink });
  y -= 20;
  page.drawText(safe(`${detail.rdo.project_code} · ${detail.rdo.project_name}`), {
    x: margin, y, size: 10.5, font: regular, color: brand.muted,
  });
  y -= 26;

  const leaderPhone = detail.rdo.leader_phone ? formatPhoneBR(detail.rdo.leader_phone) : null;
  const leaderContact = [detail.rdo.leader_email, leaderPhone].filter(Boolean).join(" · ");
  identity([
    ["Cliente", safe(detail.rdo.client_name)],
    ["Data dos trabalhos", formatDate(detail.rdo.work_date)],
    ["Líder responsável", safe(detail.rdo.leader_name)],
    ["Contato do líder", leaderContact || "Não cadastrado"],
    ["Situação", label(statusLabels, detail.rdo.status)],
    ["Versão do relatório", `${detail.rdo.version_number}`],
  ]);

  // ---- Atividades ----------------------------------------------------------

  heading("Atividades executadas e equipe");
  if (!detail.activities.length) line("Nenhuma atividade registrada.", { italic: true, color: brand.muted });
  for (const activity of detail.activities) {
    ensure(46);
    line(`${activity.sequence_number}. ${activity.task_code} · ${activity.task_name}`, { bold: true, size: 10 });
    line(`Local: ${activity.location_label} · Horário: ${activity.starts_at} às ${activity.ends_at}`, { indent: 12, size: 9, color: brand.muted });
    line(`Equipe: ${activity.member_names || `${activity.member_count} colaborador(es)`}`, { indent: 12, size: 9, color: brand.muted });
    line(activity.execution_description, { indent: 12 });
    if (activity.quantity) {
      const progress = activity.daily_progress_percent ? ` · Avanço do dia: ${activity.daily_progress_percent}%` : "";
      line(`Medição: ${activity.quantity} ${activity.unit || ""}${progress}`, { indent: 12, size: 9 });
    }
    if (activity.permit_number) {
      line(`Permissão de trabalho ${activity.permit_number}: ${activity.permit_opened_at || "—"} às ${activity.permit_closed_at || "em aberto"} (${label(permitStatus, activity.permit_status)})`, { indent: 12, size: 9 });
    }
    y -= 7;
  }

  // ---- Segurança -----------------------------------------------------------

  heading("Segurança do trabalho e condições");
  if (detail.safety) {
    line(`DDS realizado: ${detail.safety.dds_performed ? "Sim" : "Não"} · EPIs adequados: ${detail.safety.ppe_compliant ? "Sim" : "Não"} · Condição insegura: ${detail.safety.unsafe_condition_found ? "Sim" : "Não"}`);
    if (detail.safety.details) line(`Detalhamento: ${detail.safety.details}`);
    if (detail.safety.corrective_action) line(`Ação corretiva: ${detail.safety.corrective_action}`);
  } else {
    line("Checklist de segurança não preenchido.", { italic: true, color: brand.muted });
  }
  if (detail.conditions) {
    const temperature = detail.conditions.temperature_c ? ` · Temperatura: ${detail.conditions.temperature_c} °C` : "";
    line(`Clima: ${weather[detail.conditions.weather_condition || ""] || detail.conditions.weather_condition || "Não informado"}${temperature}`);
    if (detail.conditions.impact_description) line(`Impacto na execução: ${detail.conditions.impact_description}`);
  }

  // ---- Ocorrências, qualidade e continuidade -------------------------------

  if (detail.occurrences.length || detail.quality.length || detail.followups.length) {
    heading("Ocorrências, qualidade e continuidade");
    for (const item of detail.occurrences) {
      line(`Ocorrência - ${label(occurrenceLabels, item.occurrence_type)} (gravidade ${label(severityLabels, item.severity).toLowerCase()})`, { bold: true, size: 9.5 });
      line(item.description, { indent: 12 });
      line(`Providência imediata: ${item.immediate_action}`, { indent: 12, size: 9, color: brand.muted });
    }
    for (const item of detail.quality) {
      line(`Qualidade - ${label(qualityLabels, item.record_type)} (${label(qualityResults, item.result).toLowerCase()})`, { bold: true, size: 9.5 });
      line(item.description, { indent: 12 });
      if (item.corrective_action) line(`Ação corretiva: ${item.corrective_action}`, { indent: 12, size: 9, color: brand.muted });
    }
    for (const item of detail.followups) {
      line(`${item.followup_type === "next_step" ? "Próximo passo" : "Pendência"}: ${item.description}`, { indent: 0 });
    }
  }

  if (detail.rdo.general_notes) {
    heading("Observações gerais");
    line(detail.rdo.general_notes);
  }

  // ---- Índice das evidências ------------------------------------------------

  const photos = detail.media.filter((item) => item.mime_type.startsWith("image/"));
  const audios = detail.media.filter((item) => item.mime_type.startsWith("audio/"));

  heading("Registro fotográfico e áudios");
  if (!detail.media.length) {
    line("Nenhuma evidência anexada a este relatório.", { italic: true, color: brand.muted });
  } else {
    line(`${photos.length} foto(s) e ${audios.length} áudio(s) anexados.${photos.length ? " As fotos são apresentadas nas páginas seguintes." : ""}`);
    for (const item of audios) {
      y -= 3;
      line(`Áudio: ${item.original_filename} (${Math.ceil(Number(item.size_bytes) / 1024)} KB)`, { bold: true, size: 9 });
      if (item.caption) line(item.caption, { indent: 12, size: 9 });
      if (item.transcription_text) line(`Transcrição: ${item.transcription_text}`, { indent: 12, size: 9 });
      else line("Transcrição não disponível.", { indent: 12, size: 9, italic: true, color: brand.muted });
    }
  }

  // ---- Fotos em páginas próprias -------------------------------------------

  for (const [index, item] of photos.entries()) {
    let embedded: PDFImage;
    try {
      const object = await getObject(item.object_key);
      if (!object.Body) continue;
      const bytes = await object.Body.transformToByteArray();
      embedded = item.mime_type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    } catch {
      // Uma foto ilegivel no storage nao pode impedir a emissao do relatorio:
      // ela e listada como indisponivel e o documento segue.
      pageHeader(false);
      line(`Foto ${index + 1} de ${photos.length}: ${item.original_filename}`, { bold: true });
      line("Arquivo indisponível no armazenamento no momento da emissão.", { italic: true, color: brand.muted });
      continue;
    }

    pageHeader(false);
    line(`Foto ${index + 1} de ${photos.length}`, { bold: true, size: 11 });
    y -= 4;

    const captionLines = item.caption ? wrap(item.caption, regular, 9.5, contentWidth).length : 0;
    const reserved = 34 + captionLines * 13;
    const maxHeight = y - margin - reserved;
    const scale = Math.min(contentWidth / embedded.width, maxHeight / embedded.height, 1);
    const width = embedded.width * scale;
    const height = embedded.height * scale;
    const x = margin + (contentWidth - width) / 2;
    page.drawImage(embedded, { x, y: y - height, width, height });
    page.drawRectangle({
      x, y: y - height, width, height,
      borderColor: brand.rule, borderWidth: 0.8,
    });
    y -= height + 14;

    if (item.caption) line(item.caption, { size: 9.5 });
    line(safe(item.original_filename), { size: 8, color: brand.muted });
  }

  // ---- Rodapé --------------------------------------------------------------

  const all = pdf.getPages();
  all.forEach((item, index) => {
    item.drawLine({
      start: { x: margin, y: 44 }, end: { x: pageSize[0] - margin, y: 44 },
      thickness: 0.6, color: brand.rule,
    });
    item.drawText(safe(`${company.name} · CNPJ ${company.document}`), {
      x: margin, y: 32, size: 7, font: regular, color: brand.muted,
    });
    const pageLabel = `Página ${index + 1} de ${all.length}`;
    item.drawText(pageLabel, {
      x: pageSize[0] - margin - regular.widthOfTextAtSize(pageLabel, 7), y: 32,
      size: 7, font: regular, color: brand.muted,
    });
  });

  const bytes = await pdf.save();
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="RDO-${detail.rdo.project_code}-${detail.rdo.work_date}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
