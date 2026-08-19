/**
 * Agendador da sincronizacao automatica de apontamentos. Roda dentro do proprio
 * servidor: acorda a cada minuto e delega a decisao ao banco, que guarda o
 * proximo disparo. A trava `running_since` impede execucao dupla se houver mais
 * de uma replica.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.HOURS_SYNC_SCHEDULER === "false") return;
  const organizationId = process.env.APP_DEFAULT_ORGANIZATION_ID?.trim();
  if (!organizationId) return;

  const { tickHoursSync } = await import("@/lib/sync-scheduler");
  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try {
      await tickHoursSync(organizationId);
    } catch (error) {
      console.error("[sync] agendador falhou", error instanceof Error ? error.message : error);
    } finally {
      running = false;
    }
  };

  const timer = setInterval(tick, 60_000);
  timer.unref?.();
  console.info("[sync] agendador de apontamentos iniciado");
}
