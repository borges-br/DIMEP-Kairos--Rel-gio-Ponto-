/**
 * Reduz a foto no navegador antes de subir. Uma camera de celular entrega de 3 a
 * 8 MB por foto; o lider costuma estar em obra, no 4G, e o limite de 15 MB por
 * arquivo deixava o envio arrastado. Reamostrar para 1600px de maior lado corta
 * isso em uma ordem de grandeza sem prejudicar a leitura da evidencia.
 *
 * Roda apenas no cliente (usa canvas). Qualquer falha devolve o arquivo
 * original: comprimir e otimizacao, nunca pode impedir o envio.
 */

const maxEdge = 1600;
const quality = 0.82;
/** Abaixo disso o reencode tende a nao compensar o risco de perder qualidade. */
const skipBelowBytes = 900 * 1024;

function asJpegName(name: string) {
  return `${name.replace(/\.[^.]+$/, "")}.jpg`;
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") return file;

  let bitmap: ImageBitmap | undefined;
  try {
    // from-image respeita o EXIF: sem isso a foto tirada em pe chega deitada.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size <= skipBelowBytes) return file;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    // PNG de captura de tela as vezes fica maior como JPEG; nesse caso o
    // original vale mais, inclusive por manter a transparencia.
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], asJpegName(file.name), { type: "image/jpeg", lastModified: file.lastModified });
  } catch {
    return file;
  } finally {
    bitmap?.close();
  }
}
