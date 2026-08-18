import "server-only";

import { integrationTimeout } from "@/lib/integrations/config";

export async function externalGet(
  provider: "IMUV" | "DIMEP",
  path: string,
): Promise<unknown> {
  const baseText = process.env[`${provider}_API_BASE_URL`]?.trim();
  const token = process.env[`${provider}_API_TOKEN`]?.trim();
  if (!baseText) throw new Error(`${provider}: URL da API não configurada`);
  if (!path || /^https?:\/\//i.test(path)) throw new Error(`${provider}: caminho de API inválido`);

  const base = new URL(baseText);
  const url = new URL(path, base);
  if (url.origin !== base.origin) throw new Error(`${provider}: origem externa não permitida`);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(integrationTimeout(provider)),
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`${provider}: resposta HTTP ${response.status}`);
  return response.json();
}
