"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ClipboardIcon, CloseIcon, WarningIcon } from "@/components/icons";
import type { DraftEvidence } from "@/lib/rdo-draft";
import { compressImage } from "@/lib/compress-image";

type EvidenceItem = {
  key: string;
  name: string;
  sizeBytes: number;
  /** Tamanho apos a compressao, quando ela valeu a pena. */
  sentBytes: number | null;
  /** Legenda vinda de um rascunho recuperado; a edicao atual mora em `captions`. */
  caption: string;
  isImage: boolean;
  previewUrl: string | null;
  mediaId: string | null;
  error: string | null;
};

const maxFiles = 8;
/** Envio em blocos: uma foto grande nao segura as outras, e o pool de conexoes
 *  do servidor nao recebe oito requisicoes simultaneas. */
const uploadConcurrency = 3;

function sizeLabel(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function Thumb({ item }: { item: EvidenceItem }) {
  // Evidência recuperada de um rascunho anterior já está no servidor, mas a
  // pré-visualização local se perdeu junto com a aba.
  if (!item.previewUrl) return <span className="evidence-thumb-placeholder"><ClipboardIcon /></span>;
  if (!item.isImage) return <audio controls preload="metadata" src={item.previewUrl} />;
  // Prévia local (blob:) de arquivo ainda não publicado; next/image não agrega aqui.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.previewUrl} alt="" />;
}

/**
 * As evidências sobem para /api/media/staging assim que o líder as escolhe, ainda
 * durante o preenchimento. O formulário envia apenas os identificadores, o que
 * mantém o corpo da Server Action dentro do limite de 1 MB e faz o rascunho já
 * nascer com as fotos e áudios vinculados.
 */
export function EvidenceUploader({ onPendingChange, onItemsChange, restored }: {
  onPendingChange?: (pending: boolean) => void;
  onItemsChange?: (items: DraftEvidence[]) => void;
  /** Evidências de um rascunho recuperado; o arquivo já está no servidor. */
  restored?: DraftEvidence[];
}) {
  const [uploads, setUploads] = useState<EvidenceItem[]>([]);
  const [discarded, setDiscarded] = useState<string[]>([]);
  // Legendas ficam fora de EvidenceItem porque os itens recuperados de rascunho
  // sao derivados da prop a cada render e nao teriam onde guardar a edicao.
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const previewUrls = useRef(new Set<string>());

  const restoredItems: EvidenceItem[] = (restored ?? [])
    .filter((entry) => !discarded.includes(entry.mediaId))
    .map((entry) => ({
      key: `restaurada-${entry.mediaId}`,
      name: entry.name,
      sizeBytes: entry.sizeBytes,
      sentBytes: null,
      caption: entry.caption ?? "",
      isImage: entry.isImage,
      previewUrl: null,
      mediaId: entry.mediaId,
      error: null,
    }));
  const items = [...restoredItems, ...uploads];
  const pendingCount = items.filter((item) => !item.mediaId && !item.error).length;
  const readyIds = [...new Set(items.map((item) => item.mediaId).filter((id): id is string => Boolean(id)))];
  const captionOf = (item: EvidenceItem) => captions[item.key] ?? item.caption;
  // Indexado por mediaId, que e o que a action conhece. Arquivos identicos
  // compartilham o mesmo registro de midia: a primeira legenda preenchida vence.
  const captionByMedia = items.reduce<Record<string, string>>((acc, item) => {
    const text = captionOf(item).trim();
    if (item.mediaId && text && !acc[item.mediaId]) acc[item.mediaId] = text.slice(0, 500);
    return acc;
  }, {});

  useEffect(() => { onPendingChange?.(pendingCount > 0); }, [pendingCount, onPendingChange]);

  // A lista é derivada a cada render; avisar o rascunho só quando ela mudar de
  // fato evita um ciclo de atualização a cada tecla digitada no formulário.
  const stored = JSON.stringify(items.filter((item) => item.mediaId).map((item) => ({
    mediaId: item.mediaId, name: item.name, sizeBytes: item.sentBytes ?? item.sizeBytes, isImage: item.isImage,
    caption: captionOf(item),
  })));
  useEffect(() => { onItemsChange?.(JSON.parse(stored) as DraftEvidence[]); }, [stored, onItemsChange]);

  useEffect(() => {
    const urls = previewUrls.current;
    return () => { urls.forEach((url) => URL.revokeObjectURL(url)); urls.clear(); };
  }, []);

  const patch = (key: string, changes: Partial<EvidenceItem>) =>
    setUploads((current) => current.map((item) => item.key === key ? { ...item, ...changes } : item));

  /** Um arquivo por requisição: o status deixa de ser do lote e passa a ser de
   *  cada evidência, e uma falha isolada não derruba as demais. */
  async function sendOne(key: string, file: File) {
    try {
      const prepared = await compressImage(file);
      if (prepared !== file) patch(key, { sentBytes: prepared.size });
      const body = new FormData();
      body.append("files", prepared);
      const response = await fetch("/api/media/staging", { method: "POST", body });
      const result = await response.json() as { uploaded?: { id: string }[]; error?: string };
      const mediaId = result.uploaded?.[0]?.id;
      if (!response.ok || !mediaId) throw new Error(result.error || "Falha no envio.");
      patch(key, { mediaId });
    } catch (caught) {
      patch(key, { error: caught instanceof Error ? caught.message : "Não foi possível enviar a evidência." });
    }
  }

  async function send(files: File[]) {
    const batch = files.slice(0, Math.max(0, maxFiles - items.length));
    if (!batch.length) return;
    const staged: EvidenceItem[] = batch.map((file, index) => {
      const previewUrl = URL.createObjectURL(file);
      previewUrls.current.add(previewUrl);
      return {
        key: `${Date.now()}-${index}-${file.name}`,
        name: file.name,
        sizeBytes: file.size,
        sentBytes: null,
        caption: "",
        isImage: file.type.startsWith("image/"),
        previewUrl,
        mediaId: null,
        error: null,
      };
    });
    setUploads((current) => [...current, ...staged]);

    for (let start = 0; start < staged.length; start += uploadConcurrency) {
      await Promise.all(staged.slice(start, start + uploadConcurrency)
        .map((item, offset) => sendOne(item.key, batch[start + offset])));
    }
  }

  function pick(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    void send(files);
  }

  function remove(item: EvidenceItem) {
    if (item.key.startsWith("restaurada-") && item.mediaId) {
      setDiscarded((current) => [...current, item.mediaId!]);
      return;
    }
    setUploads((current) => current.filter((entry) => {
      if (entry.key !== item.key) return true;
      if (entry.previewUrl) {
        URL.revokeObjectURL(entry.previewUrl);
        previewUrls.current.delete(entry.previewUrl);
      }
      return false;
    }));
  }

  return <>
    <input type="hidden" name="evidenceMediaIds" value={JSON.stringify(readyIds)} />
    <input type="hidden" name="evidenceCaptions" value={JSON.stringify(captionByMedia)} />
    <div className="evidence-grid">
      <label className="file-picker evidence-file-picker">
        <span>Fotos do serviço</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" multiple onChange={pick} disabled={items.length >= maxFiles} />
        <small>JPG, PNG ou WebP · até {maxFiles} arquivos no total</small>
      </label>
      <label className="file-picker evidence-file-picker">
        <span>Áudio original</span>
        <input type="file" accept="audio/webm,audio/mpeg,audio/mp4,audio/wav,audio/ogg" multiple onChange={pick} disabled={items.length >= maxFiles} />
        <small>WebM, MP3, M4A, WAV ou OGG</small>
      </label>
    </div>

    {items.length > 0 && <ul className="evidence-queue">{items.map((item) => <li key={item.key} className={item.error ? "failed" : item.mediaId ? "ready" : "sending"}>
      <Thumb item={item} />
      <div>
        <strong>{item.name}</strong>
        <small>{item.sentBytes === null ? sizeLabel(item.sizeBytes) : `${sizeLabel(item.sizeBytes)} → ${sizeLabel(item.sentBytes)}`}</small>
        {item.error
          ? <span className="evidence-status failed"><WarningIcon />{item.error}</span>
          : item.mediaId
            ? <span className="evidence-status ready"><CheckIcon />{item.previewUrl ? "Armazenada e pronta para o rascunho" : "Recuperada do rascunho anterior"}</span>
            : <span className="evidence-status sending">Enviando…</span>}
      </div>
      <button type="button" onClick={() => remove(item)} aria-label={`Remover ${item.name}`}><CloseIcon /></button>
      <input
        className="input-field evidence-item-caption"
        value={captionOf(item)}
        maxLength={500}
        placeholder={item.isImage ? "Legenda desta foto (opcional)" : "Legenda deste áudio (opcional)"}
        aria-label={`Legenda de ${item.name}`}
        onChange={(event) => setCaptions((current) => ({ ...current, [item.key]: event.target.value }))}
      />
    </li>)}</ul>}

    <p className="readiness-note" role="status">
      {pendingCount
        ? `Enviando ${pendingCount} evidência(s)… o rascunho só pode ser salvo quando o envio terminar.`
        : items.length >= maxFiles
          ? `Limite de ${maxFiles} evidências por rascunho atingido. Anexe as demais no detalhe do RDO.`
          : readyIds.length
            ? `${readyIds.length} evidência(s) armazenada(s) e prontas para serem vinculadas ao rascunho.`
            : "As evidências são enviadas assim que você as escolhe e ficam vinculadas ao rascunho ao salvar."}
    </p>
  </>;
}
