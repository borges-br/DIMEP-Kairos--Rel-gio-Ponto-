export type ActivityDraft = {
  key: string;
  taskId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  description: string;
  collaboratorIds: string[];
  quantity: string;
  unit: string;
  progress: string;
  divergenceReason: string;
  ptNumber: string;
  ptOpenTime: string;
  ptCloseTime: string;
};

export type MaterialDraft = { key: string; materialId: string; movement: "" | "used" | "received" | "missing"; quantity: string; unit: string };
export type EquipmentDraft = { key: string; equipmentId: string; usageMinutes: string; downtimeMinutes: string; downtimeReason: string };

/** Evidência já armazenada no servidor; sobrevive ao fechamento do navegador. */
export type DraftEvidence = { mediaId: string; name: string; sizeBytes: number; isImage: boolean };

export type RdoDraftContent = {
  projectId: string;
  activities: ActivityDraft[];
  materials: MaterialDraft[];
  equipment: EquipmentDraft[];
  toggles: Record<string, boolean>;
  weatherCondition: string;
  evidence: DraftEvidence[];
  /** Campos não controlados do formulário, indexados pelo atributo name. */
  fields: Record<string, string>;
};

export type RdoDraft = RdoDraftContent & { version: 1; savedAt: string };

const storageKey = "rdo:draft:v1";
const maxAgeMs = 72 * 60 * 60 * 1000;

/**
 * O rascunho fica no navegador do líder para sobreviver a queda de sessão, aba
 * fechada ou bateria acabando em campo. Ele nunca substitui o RDO salvo: a
 * recuperação é sempre uma escolha explícita.
 */
export function readDraft(): RdoDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const draft = JSON.parse(raw) as RdoDraft;
    if (draft?.version !== 1 || !draft.savedAt) return null;
    if (Date.now() - new Date(draft.savedAt).getTime() > maxAgeMs) {
      window.localStorage.removeItem(storageKey);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

// useSyncExternalStore compara os retornos por identidade, então o mesmo objeto
// precisa voltar enquanto o conteúdo gravado não mudar.
let snapshotRaw: string | null = null;
let snapshotDraft: RdoDraft | null = null;

export function subscribeToDraft(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function draftSnapshot(): RdoDraft | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
  if (raw !== snapshotRaw) {
    snapshotRaw = raw;
    snapshotDraft = readDraft();
  }
  return snapshotDraft;
}

/** Durante o SSR não existe rascunho: o aviso só aparece depois da hidratação. */
export const serverDraftSnapshot = () => null;

export function writeDraft(content: RdoDraftContent) {
  if (typeof window === "undefined") return;
  try {
    const draft: RdoDraft = { ...content, version: 1, savedAt: new Date().toISOString() };
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  } catch {
    // Cota cheia ou armazenamento bloqueado: o preenchimento continua normalmente.
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // Sem armazenamento disponível não há rascunho a limpar.
  }
}

/** Um rascunho recém-aberto não vale o aviso de recuperação. */
export function isDraftMeaningful(draft: RdoDraft) {
  if (draft.evidence.length || draft.materials.length || draft.equipment.length) return true;
  if (Object.values(draft.fields).some((value) => value.trim())) return true;
  return draft.activities.some((activity) => activity.description.trim() || activity.quantity.trim() || activity.progress.trim());
}

export function draftTimeLabel(savedAt: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
  }).format(new Date(savedAt));
}
