import { getSession } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";
import { getObject } from "@/lib/object-storage";

export const runtime = "nodejs";

export async function GET(request: Request, context: RouteContext<"/api/media/[id]">) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Sessão expirada." }, { status: 401 });
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: "Mídia inválida." }, { status: 400 });

  const media = await withTenant(session.organizationId, async (client) => {
    const result = await client.query<{
      object_key: string; original_filename: string; mime_type: string; size_bytes: string;
    }>(
      `select distinct m.object_key, m.original_filename, m.mime_type, m.size_bytes::text
         from rdo.media_files m
         join rdo.evidence_links e on e.media_file_id = m.id
         left join rdo.rdo_activity_groups g on g.id = e.activity_group_id
         left join rdo.rdo_occurrences oc on oc.id = e.occurrence_id
         left join rdo.rdo_quality_records q on q.id = e.quality_record_id
         join rdo.rdo_versions v on v.id = coalesce(e.rdo_version_id, g.rdo_version_id, oc.rdo_version_id, q.rdo_version_id)
        where m.organization_id = $1 and m.id = $2
          and ($3::boolean or v.leader_user_id = $4)`,
      [session.organizationId, id, session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role)), session.userId],
    );
    return result.rows[0] ?? null;
  });
  if (!media) return Response.json({ error: "Mídia não encontrada." }, { status: 404 });

  try {
    const range = request.headers.get("range");
    const object = await getObject(media.object_key, range);
    if (!object.Body) return Response.json({ error: "Arquivo indisponível." }, { status: 502 });
    const fallbackName = media.original_filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const headers = new Headers({
      "Content-Type": object.ContentType || media.mime_type,
      "Content-Disposition": `inline; filename="${fallbackName}"; filename*=UTF-8''${encodeURIComponent(media.original_filename)}`,
      "Cache-Control": "private, max-age=300",
      "X-Content-Type-Options": "nosniff",
      "Accept-Ranges": "bytes",
    });
    if (object.ContentLength != null) headers.set("Content-Length", String(object.ContentLength));
    if (object.ContentRange) headers.set("Content-Range", object.ContentRange);
    return new Response(object.Body.transformToWebStream(), { status: range ? 206 : 200, headers });
  } catch (caught) {
    console.error("Falha ao ler mídia", caught);
    return Response.json({ error: "Não foi possível carregar a mídia." }, { status: 502 });
  }
}
