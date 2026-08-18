import ExcelJS from "exceljs";
import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";

export const runtime = "nodejs";

type ExportRow = {
  timer_type: string;
  task_code: string;
  start_local: string;
  end_local: string;
  collaborator_cpf_digits: string;
  project_code: string;
  client_document_digits: string;
};

function formatDocument(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  if (digits.length === 14) return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  return digits;
}

function localExcelDate(value: string) {
  // O texto já está convertido para o timezone do tenant. O sufixo Z evita
  // uma segunda conversão pelo servidor e preserva o relógio local no Excel.
  return new Date(`${value}Z`);
}

export async function GET(request: NextRequest) {
  const session = await requireSession();
  const rdoId = request.nextUrl.searchParams.get("rdoId");
  if (rdoId && !/^[0-9a-f-]{36}$/i.test(rdoId)) {
    return Response.json({ error: "RDO inválido." }, { status: 400 });
  }

  const rows = await withTenant(session.organizationId, async (client) => {
    const result = await client.query<ExportRow>(
      `select v.timer_type, v.task_code,
              to_char(v.start_at at time zone o.timezone, 'YYYY-MM-DD"T"HH24:MI:SS') as start_local,
              to_char(v.end_at at time zone o.timezone, 'YYYY-MM-DD"T"HH24:MI:SS') as end_local,
              v.collaborator_cpf_digits, v.project_code, v.client_document_digits
         from rdo.v_imuv_timer_candidates v
         join rdo.organizations o on o.id = v.organization_id
         join rdo.work_allocations a on a.id = v.work_allocation_id
         join rdo.rdo_versions rv on rv.id = a.rdo_version_id
        where v.organization_id = $1 and ($2::uuid is null or rv.rdo_id = $2::uuid)
        order by v.start_at, v.collaborator_cpf_digits, v.task_code`,
      [session.organizationId, rdoId],
    );
    return result.rows;
  });

  if (!rows.length) {
    return Response.json({ error: "Não há apontamentos aprovados ou revisados disponíveis para exportação." }, { status: 422 });
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "RDO GLB Tech";
  workbook.created = new Date();
  const sheet = workbook.addWorksheet("Página1");
  sheet.columns = [
    { header: "TIPO", key: "type", width: 13 },
    { header: "CÓDIGO DA TAREFA", key: "task", width: 21 },
    { header: "HORA INICIAL", key: "start", width: 23 },
    { header: "HORA FINAL", key: "end", width: 23 },
    { header: "CPF DO COLABORADOR", key: "cpf", width: 23 },
    { header: "CÓDIGO DO PROJETO", key: "project", width: 22 },
    { header: "CPF/CNPJ DO CLIENTE", key: "client", width: 23 },
  ];
  for (const row of rows) {
    sheet.addRow({
      type: row.timer_type,
      task: row.task_code,
      start: localExcelDate(row.start_local),
      end: localExcelDate(row.end_local),
      cpf: formatDocument(row.collaborator_cpf_digits),
      project: row.project_code,
      client: formatDocument(row.client_document_digits),
    });
  }
  sheet.eachRow((row, rowNumber) => {
    row.font = { name: "Arial", size: 10, bold: rowNumber === 1 };
  });
  sheet.getColumn("start").numFmt = "dd/mm/yyyy hh:mm:ss";
  sheet.getColumn("end").numFmt = "dd/mm/yyyy hh:mm:ss";
  sheet.autoFilter = { from: "A1", to: `G${sheet.rowCount}` };

  const output = await workbook.xlsx.writeBuffer();
  const stamp = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date()).replaceAll("-", "");
  return new Response(Buffer.from(output), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="apontamento-imuv-${stamp}.xlsx"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
