import { revalidatePath } from "next/cache";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";
import {
  acknowledgeDimepPunches, applyDimepEmployees, applyDimepPunches,
  fetchDimepEmployees, fetchDimepPunches, previewDimepEmployees, previewDimepPunches,
  recordDimepPointerResult, validateDimepPeriod, type DimepEmployeeConfirmation, pointerFieldHint } from "@/lib/integrations/dimep";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

type Stage = "employees" | "punches";
const stage = (value: unknown): Stage | null => value === "employees" || value === "punches" ? value : null;
const date = (value: unknown) => typeof value === "string" ? value : "";
const validationMessage = (error: unknown) => error instanceof Error && (
  error.message.startsWith("Período DIMEP inválido")
  || error.message.startsWith("A data inicial")
  || error.message.startsWith("Selecione um período")
);

export async function GET(request: Request) {
  const session = await requireAnyRole(["director", "admin"]);
  const params = new URL(request.url).searchParams; const selected = stage(params.get("stage"));
  if (!selected) return Response.json({ error: "Etapa inválida." }, { status: 400 });
  const startedAt = Date.now();
  console.info("[dimep] prévia iniciada", JSON.stringify({ stage: selected, organizationId: session.organizationId }));
  try {
    if (selected === "employees") {
      const data = await fetchDimepEmployees();
      const response = await withTenant(session.organizationId, (client) => previewDimepEmployees(client, session.organizationId, data));
      console.info("[dimep] prévia concluída", JSON.stringify({ stage: selected, records: data.length, durationMs: Date.now() - startedAt }));
      return Response.json(response);
    }
    const startDate = date(params.get("startDate")); const endDate = date(params.get("endDate")); validateDimepPeriod(startDate, endDate);
    const data = await fetchDimepPunches(startDate, endDate);
    const response = await withTenant(session.organizationId, (client) => previewDimepPunches(client, session.organizationId, data, startDate, endDate));
    console.info("[dimep] prévia concluída", JSON.stringify({ stage: selected, records: data.length, startDate, endDate, durationMs: Date.now() - startedAt }));
    return Response.json(response);
  } catch (error) {
    console.error("[dimep] falha na prévia", JSON.stringify({ stage: selected, durationMs: Date.now() - startedAt, error: error instanceof Error ? error.message : "erro desconhecido" }));
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao consultar o DIMEP." }, { status: validationMessage(error) ? 400 : 502 });
  }
}

export async function POST(request: Request) {
  const session = await requireAnyRole(["director", "admin"]);
  const body = await request.json().catch(() => null) as { stage?: unknown; digest?: unknown; startDate?: unknown; endDate?: unknown; confirmations?: unknown } | null;
  const selected = stage(body?.stage); const expectedDigest = typeof body?.digest === "string" ? body.digest : "";
  if (!selected || !/^[0-9a-f]{64}$/.test(expectedDigest)) return Response.json({ error: "Confirmação inválida." }, { status: 400 });
  try {
    if (selected === "employees") {
      const data = await fetchDimepEmployees();
      const confirmations = Array.isArray(body?.confirmations) ? body.confirmations.filter((item): item is DimepEmployeeConfirmation => {
        if (!item || typeof item !== "object") return false; const row = item as Record<string, unknown>;
        return typeof row.externalId === "string" && typeof row.candidateId === "string" && /^[0-9a-f-]{36}$/i.test(row.candidateId);
      }) : [];
      const result = await withTenant(session.organizationId, async (client) => {
        const preview = await previewDimepEmployees(client, session.organizationId, data);
        if (preview.digest !== expectedDigest) return { changed: true as const, preview };
        return { changed: false as const, applied: await applyDimepEmployees(client, session.organizationId, session.userId, data, preview, confirmations) };
      });
      if (result.changed) return Response.json({ error: "Os dados mudaram depois da prévia. Revise novamente.", preview: result.preview }, { status: 409 });
      revalidatePath("/employees"); revalidatePath("/settings"); return Response.json(result.applied);
    }

    const startDate = date(body?.startDate); const endDate = date(body?.endDate); validateDimepPeriod(startDate, endDate);
    const data = await fetchDimepPunches(startDate, endDate);
    const result = await withTenant(session.organizationId, async (client) => {
      const preview = await previewDimepPunches(client, session.organizationId, data, startDate, endDate);
      if (preview.digest !== expectedDigest) return { changed: true as const, preview };
      return { changed: false as const, applied: await applyDimepPunches(client, session.organizationId, session.userId, data, preview) };
    });
    if (result.changed) return Response.json({ error: "As batidas mudaram depois da prévia. Revise novamente.", preview: result.preview }, { status: 409 });
    let pointer: Awaited<ReturnType<typeof acknowledgeDimepPunches>> = { acknowledged: 0, skipped: true, reason: "Ponteiro não processado." }; let pointerError = "";
    try { pointer = await acknowledgeDimepPunches(result.applied.ackIds); }
    catch (error) { pointerError = error instanceof Error ? error.message : "Falha ao avançar ponteiro."; }
    if (pointer.skipped && data.length > 0) pointerError = `${pointer.reason || "O Kairos não forneceu identificadores para confirmar o ponteiro."}${pointerFieldHint(data)}`;
    await withTenant(session.organizationId, (client) => recordDimepPointerResult(client, session.organizationId, result.applied.runId, !pointerError, pointerError || `Ponteiro confirmado: ${pointer.acknowledged}`));
    revalidatePath("/employees"); revalidatePath("/hours"); revalidatePath("/settings");
    return Response.json({ ...result.applied, ackIds: undefined, pointer, pointerError: pointerError || null });
  } catch (error) {
    console.error("[dimep] falha na aplicação", JSON.stringify({ stage: selected, error: error instanceof Error ? error.message : "erro desconhecido" }));
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao aplicar sincronização DIMEP." }, { status: validationMessage(error) ? 400 : 502 });
  }
}
