import { revalidatePath } from "next/cache";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";
import { applyImuvPull, applyImuvPush, fetchImuvData, previewImuv, type ImuvDirection } from "@/lib/integrations/imuv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function direction(value: string | null): ImuvDirection | null {
  return value === "pull" || value === "push" ? value : null;
}

export async function GET(request: Request) {
  const session = await requireAnyRole(["director", "admin"]);
  const selected = direction(new URL(request.url).searchParams.get("direction"));
  if (!selected) return Response.json({ error: "Direção inválida." }, { status: 400 });
  try {
    const data = await fetchImuvData();
    const preview = await withTenant(session.organizationId, (client) => previewImuv(client, session.organizationId, selected, data));
    return Response.json(preview);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao consultar o IMUV." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const session = await requireAnyRole(["director", "admin"]);
  const body = await request.json().catch(() => null) as { direction?: unknown; digest?: unknown } | null;
  const selected = direction(typeof body?.direction === "string" ? body.direction : null);
  const expectedDigest = typeof body?.digest === "string" ? body.digest : "";
  if (!selected || !/^[0-9a-f]{64}$/.test(expectedDigest)) return Response.json({ error: "Confirmação inválida." }, { status: 400 });
  try {
    const data = await fetchImuvData();
    const result = await withTenant(session.organizationId, async (client) => {
      const preview = await previewImuv(client, session.organizationId, selected, data);
      if (preview.digest !== expectedDigest) return { changed: true as const, preview };
      const applied = selected === "pull"
        ? await applyImuvPull(client, session.organizationId, session.userId, data, preview)
        : await applyImuvPush(client, session.organizationId, session.userId, preview);
      return { changed: false as const, applied };
    });
    if (result.changed) return Response.json({ error: "Os dados mudaram depois da prévia. Revise novamente.", preview: result.preview }, { status: 409 });
    revalidatePath("/"); revalidatePath("/projects"); revalidatePath("/employees"); revalidatePath("/settings");
    return Response.json(result.applied);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao aplicar sincronização." }, { status: 502 });
  }
}
