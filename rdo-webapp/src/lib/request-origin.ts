import "server-only";

/**
 * Protecao contra envio de outra origem (CSRF) para as rotas de upload.
 *
 * Atras de proxy (Cloudflare, nginx) `request.url` carrega o host interno que o
 * Next enxerga, e nao o host publico que o navegador usou: comparar os dois
 * recusava todo envio legitimo com 403. O host confiavel e o encaminhado pelo
 * proxy, com `host` como ultimo recurso. A porta e ignorada porque o TLS termina
 * no proxy e a origem chega sem porta explicita.
 */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  // Cliente sem Origin (curl, app nativo) nao caracteriza CSRF de navegador.
  if (!origin) return true;
  const forwarded = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const expected = forwarded?.trim().toLowerCase();
    if (expected && originHost === expected) return true;
    return originHost === new URL(request.url).host.toLowerCase();
  } catch {
    return false;
  }
}
