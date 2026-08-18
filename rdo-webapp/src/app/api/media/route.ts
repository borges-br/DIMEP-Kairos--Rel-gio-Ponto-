import { createHash, randomUUID } from "node:crypto";
import { getSession } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";
import { objectStorageConfig, putObject } from "@/lib/object-storage";

export const runtime = "nodejs";

const allowedRoles = new Set(["leader", "foreman", "manager", "director", "admin"]);
const allowedMimeTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["audio/webm", "webm"],
  ["audio/mpeg", "mp3"],
  ["audio/mp4", "m4a"],
  ["audio/wav", "wav"],
  ["audio/ogg", "ogg"],
]);

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return error("Origem da requisição não permitida.", 403);
  const session = await getSession();
  if (!session) return error("Sessão expirada.", 401);
  if (!session.roles.some((role) => allowedRoles.has(role))) return error("Sem permissão para anexar mídia.", 403);

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return error("Envio de arquivo inválido.", 400);
  }

  const rdoId = String(data.get("rdoId") || "");
  const activityGroupId = String(data.get("activityGroupId") || "");
  const caption = String(data.get("caption") || "").trim().slice(0, 500);
  const files = data.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);
  const maxBytes = Math.max(1, Number(process.env.MEDIA_MAX_FILE_MB || 15)) * 1024 * 1024;

  if (!/^[0-9a-f-]{36}$/i.test(rdoId)) return error("RDO inválido.", 400);
  if (activityGroupId && !/^[0-9a-f-]{36}$/i.test(activityGroupId)) return error("Atividade inválida.", 400);
  if (!files.length || files.length > 8) return error("Envie de 1 a 8 arquivos por vez.", 400);
  for (const file of files) {
    if (!allowedMimeTypes.has(file.type)) return error(`Formato não permitido: ${file.name}.`, 415);
    if (file.size > maxBytes) return error(`${file.name} excede o limite de ${process.env.MEDIA_MAX_FILE_MB || 15} MB.`, 413);
  }

  try {
    const uploaded = await withTenant(session.organizationId, async (client) => {
      const elevated = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
      const versionResult = await client.query<{ id: string; status: string; work_date: string }>(
        `select v.id, v.status, r.work_date::text
           from rdo.rdos r join rdo.rdo_versions v on v.id = r.current_version_id
          where r.organization_id = $1 and r.id = $2
            and ($3::boolean or v.leader_user_id = $4) for share`,
        [session.organizationId, rdoId, elevated, session.userId],
      );
      const version = versionResult.rows[0];
      if (!version) throw new Error("RDO_NOT_FOUND");
      if (!["draft", "returned"].includes(version.status)) throw new Error("RDO_LOCKED");
      if (activityGroupId) {
        const group = await client.query(
          "select 1 from rdo.rdo_activity_groups where organization_id = $1 and id = $2 and rdo_version_id = $3",
          [session.organizationId, activityGroupId, version.id],
        );
        if (!group.rows[0]) throw new Error("ACTIVITY_NOT_FOUND");
      }

      const result: { id: string; name: string }[] = [];
      const { provider } = objectStorageConfig();
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const sha256 = createHash("sha256").update(bytes).digest("hex");
        const existing = await client.query<{ id: string }>(
          "select id from rdo.media_files where organization_id = $1 and sha256 = $2",
          [session.organizationId, sha256],
        );
        let mediaId = existing.rows[0]?.id;
        if (!mediaId) {
          const extension = allowedMimeTypes.get(file.type)!;
          const datePath = version.work_date.replaceAll("-", "/");
          const objectKey = `${session.organizationId}/${datePath}/${rdoId}/${randomUUID()}.${extension}`;
          await putObject(objectKey, bytes, file.type);
          const inserted = await client.query<{ id: string }>(
            `insert into rdo.media_files
              (organization_id, storage_provider, object_key, original_filename, mime_type,
               size_bytes, sha256, captured_at, uploaded_by_user_id)
             values ($1,$2,$3,$4,$5,$6,$7,now(),$8) returning id`,
            [session.organizationId, provider, objectKey, file.name.slice(0, 255), file.type, file.size, sha256, session.userId],
          );
          mediaId = inserted.rows[0].id;
        }

        await client.query(
          `insert into rdo.evidence_links
            (organization_id, media_file_id, rdo_version_id, activity_group_id, caption)
           values ($1,$2,$3,$4,$5) on conflict do nothing`,
          [session.organizationId, mediaId, activityGroupId ? null : version.id, activityGroupId || null, caption || null],
        );
        await client.query(
          `insert into rdo.audit_events
            (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
           values ($1,$2,'media_files',$3,'insert',$4::jsonb,$5)`,
          [session.organizationId, session.userId, mediaId, JSON.stringify({ rdoId, activityGroupId: activityGroupId || null, mimeType: file.type }), caption || "Evidência anexada ao RDO"],
        );
        result.push({ id: mediaId, name: file.name });
      }
      return result;
    });
    return Response.json({ uploaded }, { status: 201 });
  } catch (caught) {
    if (caught instanceof Error && caught.message === "RDO_NOT_FOUND") return error("RDO não encontrado.", 404);
    if (caught instanceof Error && caught.message === "RDO_LOCKED") return error("Somente RDOs em rascunho ou devolvidos aceitam novas evidências.", 409);
    if (caught instanceof Error && caught.message === "ACTIVITY_NOT_FOUND") return error("A atividade não pertence a este RDO.", 400);
    console.error("Falha no upload de mídia", caught);
    return error("Não foi possível armazenar a mídia.", 500);
  }
}
