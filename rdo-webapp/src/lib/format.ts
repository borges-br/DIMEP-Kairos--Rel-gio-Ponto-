export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export function formatMinutes(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours}h${String(minutes).padStart(2, "0")}`;
}

export function roleLabel(role: string) {
  return ({ leader: "Líder", foreman: "Encarregado", manager: "Gerente", hr: "RH", director: "Diretor", admin: "Administrador" } as Record<string, string>)[role] ?? role;
}

/** Rotulos vindos das integracoes podem chegar vazios ou como "[object Object]". */
export function cleanLabel(value: string | null | undefined) {
  const result = (value ?? "").trim();
  return result && result !== "[object Object]" ? result : null;
}

/** Cargo e setor do colaborador em uma linha, sem placeholders vazios. */
export function roleLine(jobTitle: string | null | undefined, department?: string | null) {
  const parts = [cleanLabel(jobTitle), cleanLabel(department)].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Cargo e setor ainda não sincronizados do IMUV";
}
