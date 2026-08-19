import { createHash, randomUUID } from "node:crypto";
import { getSession } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";
import { evidenceMimeTypes, evidenceRejection } from "@/lib/media";
import { objectStorageConfig, putObject } from "@/lib/object-storage";

export const runtime = "nodejs";

const allowedRoles = new Set(["leader", "foreman", "manager", "director", "admin"]);

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

/**
 * Guarda evidências antes de o RDO existir. O rascunho ainda não tem id, então a
 * mídia fica sem `evidence_links` até `createRdoAction` vinculá-la. Manter o upload
 * aqui — e não na server action — evita o limite de 1 MB do corpo das Server
 * Actions, que inviabiliza fotos tiradas em campo.
 */
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

  const files = data.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);
  const rejection = evidenceRejection(files);
  if (rejection) return error(rejection.message, rejection.status);

  try {
    const hashed: { file: File; bytes: Uint8Array; sha256: string }[] = [];
    for (const file of files) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      hashed.push({ file, bytes, sha256: createHash("sha256").update(bytes).digest("hex") });
    }

    const known = await withTenant(session.organizationId, async (client) => {
      const result = await client.query<{ id: string; sha256: string }>(
        "select id, sha256 from rdo.media_files where organization_id = $1 and sha256 = any($2::char(64)[])",
        [session.organizationId, hashed.map((item) => item.sha256)],
      );
      return new Map(result.rows.map((row) => [row.sha256, row.id]));
    });

    // O envio ao object storage fica fora da transação para não segurar a conexão
    // do pool durante a I/O de rede.
    const { provider } = objectStorageConfig();
    const datePath = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" })
      .format(new Date()).replaceAll("-", "/");
    const pending = hashed.filter((item) => !known.has(item.sha256));
    const stored = new Map<string, string>();
    for (const item of pending) {
      const objectKey = `${session.organizationId}/rascunhos/${datePath}/${randomUUID()}.${evidenceMimeTypes.get(item.file.type)!}`;
      await putObject(objectKey, item.bytes, item.file.type);
      stored.set(item.sha256, objectKey);
    }

    const uploaded = await withTenant(session.organizationId, async (client) => {
      const result: { id: string; name: string; mimeType: string; sizeBytes: number }[] = [];
      for (const { file, sha256 } of hashed) {
        let mediaId = known.get(sha256);
        if (!mediaId) {
          const inserted = await client.query<{ id: string }>(
            `insert into rdo.media_files
              (organization_id, storage_provider, object_key, original_filename, mime_type,
               size_bytes, sha256, captured_at, uploaded_by_user_id)
             values ($1,$2,$3,$4,$5,$6,$7,now(),$8)
             on conflict (organization_id, sha256) do update set original_filename = excluded.original_filename
             returning id`,
            [session.organizationId, provider, stored.get(sha256), file.name.slice(0, 255),
              file.type, file.size, sha256, session.userId],
          );
          mediaId = inserted.rows[0].id;
        }
        result.push({ id: mediaId, name: file.name, mimeType: file.type, sizeBytes: file.size });
      }
      return result;
    });

    return Response.json({ uploaded }, { status: 201 });
  } catch (caught) {
    console.error("Falha no upload de evidência do rascunho", caught);
    return error("Não foi possível armazenar a evidência.", 500);
  }
}
