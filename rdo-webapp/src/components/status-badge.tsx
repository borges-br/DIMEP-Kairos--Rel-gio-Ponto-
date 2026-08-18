const labels: Record<string, string> = {
  draft: "Rascunho",
  submitted: "Aguardando aprovação",
  returned: "Devolvido",
  approved: "Aprovado",
  reviewed: "Revisado",
  superseded: "Substituído",
  cancelled: "Cancelado",
  active: "Ativo",
  planned: "Planejado",
  paused: "Pausado",
  completed: "Concluído",
  unknown: "A confirmar",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = ["approved", "reviewed", "active", "completed"].includes(status)
    ? "success"
    : ["returned", "cancelled"].includes(status)
      ? "danger"
      : ["submitted", "paused"].includes(status)
        ? "warning"
        : "neutral";
  return <span className={`status-badge status-${tone}`}>{labels[status] ?? status}</span>;
}
