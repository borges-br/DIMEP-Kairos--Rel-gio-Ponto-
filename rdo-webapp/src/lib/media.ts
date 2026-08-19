import "server-only";

/** Formatos aceitos como evidência e a extensão usada na chave do objeto. */
export const evidenceMimeTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["audio/webm", "webm"],
  ["audio/mpeg", "mp3"],
  ["audio/mp4", "m4a"],
  ["audio/wav", "wav"],
  ["audio/ogg", "ogg"],
]);

export const maxEvidenceFiles = 8;

export function maxEvidenceMb() {
  return Math.max(1, Number(process.env.MEDIA_MAX_FILE_MB || 15));
}

/** Devolve o primeiro problema encontrado no lote, ou null quando ele é válido. */
export function evidenceRejection(files: File[]): { message: string; status: number } | null {
  if (!files.length || files.length > maxEvidenceFiles) {
    return { message: `Envie de 1 a ${maxEvidenceFiles} arquivos por vez.`, status: 400 };
  }
  const maxBytes = maxEvidenceMb() * 1024 * 1024;
  for (const file of files) {
    if (!evidenceMimeTypes.has(file.type)) return { message: `Formato não permitido: ${file.name}.`, status: 415 };
    if (file.size > maxBytes) return { message: `${file.name} excede o limite de ${maxEvidenceMb()} MB.`, status: 413 };
  }
  return null;
}
