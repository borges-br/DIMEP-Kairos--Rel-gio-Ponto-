import "server-only";

import { integrationTimeout } from "@/lib/integrations/config";

type ExternalMethod = "GET" | "POST" | "PUT" | "DELETE";

function externalUrl(provider: "IMUV" | "DIMEP", path: string) {
  const baseText = process.env[`${provider}_API_BASE_URL`]?.trim();
  if (!baseText) throw new Error(`${provider}: URL da API não configurada`);
  if (!path || /^https?:\/\//i.test(path)) throw new Error(`${provider}: caminho de API inválido`);

  const base = new URL(baseText.endsWith("/") ? baseText : `${baseText}/`);
  const cleanPath = path.replace(/^\/+/, "");
  const url = new URL(cleanPath, base);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) {
    throw new Error(`${provider}: origem ou prefixo externo não permitido`);
  }
  return url;
}

export async function externalRequest(
  provider: "IMUV" | "DIMEP",
  path: string,
  options: { method?: ExternalMethod; body?: unknown } = {},
): Promise<unknown> {
  const token = process.env[`${provider}_API_TOKEN`]?.trim();
  const method = options.method ?? "GET";
  const url = externalUrl(provider, path);
  const requestHeaders: Record<string, string> = { Accept: "application/json" };
  if (provider === "IMUV" && token) requestHeaders.Authorization = `Bearer ${token}`;
  if (provider === "DIMEP") {
    const tenant = process.env.DIMEP_TENANT?.trim();
    if (tenant) requestHeaders.identifier = tenant;
    if (token) requestHeaders.key = token;
  }
  const multipart = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body !== undefined && !multipart) requestHeaders["Content-Type"] = "application/json";

  const response = await fetch(url, {
    method,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(integrationTimeout(provider)),
    headers: requestHeaders,
    body: options.body === undefined ? undefined : multipart ? options.body as FormData : JSON.stringify(options.body),
  });
  const responseText = await response.text();
  if (!response.ok) {
    const detail = responseText.replace(/\s+/g, " ").slice(0, 300);
    throw new Error(`${provider}: resposta HTTP ${response.status}${detail ? ` — ${detail}` : ""}`);
  }
  if (!responseText) return null;
  if (!(response.headers.get("content-type") ?? "").includes("json")) {
    throw new Error(`${provider}: resposta não JSON recebida`);
  }
  return JSON.parse(responseText) as unknown;
}

export function externalGet(provider: "IMUV" | "DIMEP", path: string) {
  return externalRequest(provider, path);
}
