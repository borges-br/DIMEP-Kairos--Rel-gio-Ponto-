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
