import "server-only";

export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Variável obrigatória ausente: ${name}`);
  return value;
}

export function integerEnv(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function booleanEnv(name: string, fallback = false): boolean {
  const value = process.env[name]?.toLowerCase();
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}
