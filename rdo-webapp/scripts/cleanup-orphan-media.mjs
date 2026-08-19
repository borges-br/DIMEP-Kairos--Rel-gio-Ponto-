import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import pg from "pg";

// Evidencia enviada por /api/media/staging existe em media_files antes de o RDO
// ser salvo. Um rascunho abandonado deixa o arquivo sem evidence_links. Esta
// rotina remove primeiro o objeto no storage e so entao a linha, para nunca
// deixar um registro apontando para um arquivo inexistente.

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Variável obrigatória ausente: ${name}`);
  return value;
};

const dryRun = ["1", "true", "yes"].includes((process.env.DRY_RUN ?? "").toLowerCase());
const maxAgeHours = Math.max(1, Number(process.env.MEDIA_ORPHAN_MAX_AGE_HOURS || 48));
const batchSize = Math.min(1000, Math.max(1, Number(process.env.MEDIA_ORPHAN_BATCH || 200)));
const bucket = required("OBJECT_STORAGE_BUCKET");

const storage = new S3Client({
  endpoint: required("OBJECT_STORAGE_ENDPOINT"),
  region: process.env.OBJECT_STORAGE_REGION || "us-east-1",
  forcePathStyle: process.env.OBJECT_STORAGE_FORCE_PATH_STYLE !== "false",
  credentials: {
    accessKeyId: required("OBJECT_STORAGE_ACCESS_KEY"),
    secretAccessKey: required("OBJECT_STORAGE_SECRET_KEY"),
  },
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_ADMIN_URL?.trim() || required("DATABASE_URL"),
});

const log = (message) => process.stdout.write(`${message}\n`);

async function removeObject(objectKey) {
  try {
    await storage.send(new DeleteObjectCommand({ Bucket: bucket, Key: objectKey }));
    return true;
  } catch (error) {
    // O S3 responde 204 mesmo para chave inexistente; outros provedores usam 404.
    if (error?.$metadata?.httpStatusCode === 404 || error?.name === "NoSuchKey") return true;
    process.stderr.write(`Falha ao apagar ${objectKey}: ${error?.message ?? error}\n`);
    return false;
  }
}

const client = await pool.connect();
let removed = 0;
let failed = 0;
let bytes = 0;
try {
  const candidates = await client.query(
    `select m.id, m.object_key, m.size_bytes, m.original_filename, m.created_at
       from rdo.media_files m
      where m.created_at < now() - ($1 || ' hours')::interval
        and not exists (select 1 from rdo.evidence_links e where e.media_file_id = m.id)
        and not exists (select 1 from rdo.media_transcriptions t where t.media_file_id = m.id)
      order by m.created_at
      limit $2`,
    [String(maxAgeHours), batchSize],
  );

  if (!candidates.rows.length) {
    log(`Nenhuma evidência órfã com mais de ${maxAgeHours}h.`);
  }

  for (const media of candidates.rows) {
    if (dryRun) {
      log(`[simulação] removeria ${media.original_filename} (${media.object_key})`);
      removed += 1;
      bytes += Number(media.size_bytes);
      continue;
    }
    if (!(await removeObject(media.object_key))) {
      failed += 1;
      continue;
    }
    // A linha so sai depois que o objeto foi removido; se a exclusao no banco
    // falhar, a proxima execucao tenta de novo e o storage devolve 404.
    await client.query("delete from rdo.media_files where id = $1", [media.id]);
    removed += 1;
    bytes += Number(media.size_bytes);
  }

  const megabytes = (bytes / 1024 / 1024).toFixed(2);
  log(`${dryRun ? "[simulação] " : ""}${removed} evidência(s) órfã(s) removida(s), ${megabytes} MB liberados.`);
  if (failed) log(`${failed} arquivo(s) permanecem: o storage recusou a exclusão.`);
  if (candidates.rows.length === batchSize) {
    log(`Lote cheio (${batchSize}). Execute novamente para continuar a limpeza.`);
  }
} finally {
  client.release();
  await pool.end();
  storage.destroy();
}

if (failed) process.exitCode = 1;
