"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusIcon } from "@/components/icons";

type MediaItem = {
  id: string;
  original_filename: string;
  mime_type: string;
  size_bytes: string;
  caption: string | null;
  transcription_status: string | null;
  transcription_text: string | null;
};

export function MediaManager({
  rdoId,
  canUpload,
  activities,
  media,
}: {
  rdoId: string;
  canUpload: boolean;
  activities: { id: string; task_code: string; task_name: string }[];
  media: MediaItem[];
}) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [activityGroupId, setActivityGroupId] = useState("");
  const [caption, setCaption] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function upload() {
    if (!files.length) return;
    setPending(true);
    setMessage("");
    const body = new FormData();
    body.set("rdoId", rdoId);
    if (activityGroupId) body.set("activityGroupId", activityGroupId);
    if (caption) body.set("caption", caption);
    files.forEach((file) => body.append("files", file));
    try {
      const response = await fetch("/api/media", { method: "POST", body });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Falha no envio.");
      setFiles([]);
      setCaption("");
      setMessage("Evidência armazenada e vinculada ao RDO.");
      router.refresh();
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Não foi possível enviar a mídia.");
    } finally {
      setPending(false);
    }
  }

  return <>
    {canUpload && <div className="media-uploader">
      <div className="form-grid two-columns">
        <label className="field-group"><span>Vincular a</span><select className="input-field" value={activityGroupId} onChange={(event) => setActivityGroupId(event.target.value)}><option value="">RDO completo</option>{activities.map((activity) => <option key={activity.id} value={activity.id}>{activity.task_code} · {activity.task_name}</option>)}</select></label>
        <label className="field-group"><span>Legenda</span><input className="input-field" value={caption} onChange={(event) => setCaption(event.target.value)} maxLength={500} placeholder="Ex.: painel após o comissionamento" /></label>
      </div>
      <div className="media-input-grid">
        <label className="file-picker"><span>Fotos</span><input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} /><small>JPG, PNG ou WebP</small></label>
        <label className="file-picker"><span>Áudio</span><input type="file" accept="audio/webm,audio/mpeg,audio/mp4,audio/wav,audio/ogg" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} /><small>WebM, MP3, M4A, WAV ou OGG</small></label>
      </div>
      {files.length > 0 && <div className="selected-files"><span>{files.length} arquivo(s) selecionado(s)</span><button type="button" className="button button-primary" disabled={pending} onClick={upload}><PlusIcon />{pending ? "Enviando…" : "Adicionar evidências"}</button></div>}
      {message && <p className="readiness-note" role="status">{message}</p>}
    </div>}
    {media.length > 0 ? <div className="media-gallery">{media.map((item) => <article className="media-card" key={item.id}>
      {item.mime_type.startsWith("image/") ? <Image src={`/api/media/${item.id}`} alt={item.caption || item.original_filename} width={720} height={480} unoptimized /> : <audio controls preload="metadata" src={`/api/media/${item.id}`} />}
      <div><strong>{item.caption || item.original_filename}</strong><small>{item.original_filename} · {(Number(item.size_bytes) / 1024 / 1024).toFixed(2)} MB</small>{item.transcription_text && <p>{item.transcription_text}</p>}{item.mime_type.startsWith("audio/") && !item.transcription_text && <span className="status-badge status-neutral">Transcrição {item.transcription_status || "não solicitada"}</span>}</div>
    </article>)}</div> : <p className="empty-copy">Nenhuma foto ou áudio anexado.</p>}
  </>;
}
