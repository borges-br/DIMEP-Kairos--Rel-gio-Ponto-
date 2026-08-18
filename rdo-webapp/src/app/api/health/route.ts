import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await getPool().query("select 1");
    return Response.json({ status: "ok", database: "reachable" });
  } catch {
    return Response.json({ status: "degraded", database: "unreachable" }, { status: 503 });
  }
}
