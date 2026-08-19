import "server-only";

import type { PoolClient } from "pg";
import { withTenant } from "@/lib/db";
import {
  acknowledgeDimepPunches, applyDimepPunches, fetchDimepPunches,
  previewDimepPunches, recordDimepPointerResult,
} from "@/lib/integrations/dimep";

export type SyncSchedule = {
  provider: "dimep";
  enabled: boolean;
  interval_minutes: number;
  window_start: string;
  window_end: string;
  next_run_at: string;
  last_run_at: string | null;
  last_trigger: "schedule" | "manual" | null;
  last_status: "succeeded" | "partial" | "failed" | null;
  last_message: string | null;
  last_records_written: number | null;
  last_records_rejected: number | null;
  running_since: string | null;
};

const timeZone = "America/Sao_Paulo";
const provider = "dimep";

/** Data corrente no fuso da operacao, no formato aceito pelo DIMEP. */
function today(offsetDays = 0) {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + offsetDays);
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(now);
}

function localMinutes(instant = new Date()) {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone, hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(instant);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function toMinutes(value: string) {
  const [hour, minute] = value.split(":");
  return Number(hour) * 60 + Number(minute);
}

/** A janela evita acordar o DIMEP de madrugada, quando ninguem bate ponto. */
export function insideWindow(schedule: Pick<SyncSchedule, "window_start" | "window_end">, instant = new Date()) {
  const current = localMinutes(instant);
  return current >= toMinutes(schedule.window_start) && current <= toMinutes(schedule.window_end);
}

async function ensureSchedule(client: PoolClient, organizationId: string) {
  await client.query(
    `insert into rdo.sync_schedules (organization_id, provider) values ($1, $2)
     on conflict (organization_id, provider) do nothing`,
    [organizationId, provider],
  );
}

export async function readSyncSchedule(organizationId: string) {
  return withTenant(organizationId, async (client) => {
    await ensureSchedule(client, organizationId);
    const result = await client.query<SyncSchedule>(
      `select provider, enabled, interval_minutes,
              to_char(window_start, 'HH24:MI') as window_start,
              to_char(window_end, 'HH24:MI') as window_end,
              next_run_at, last_run_at, last_trigger, last_status, last_message,
              last_records_written, last_records_rejected, running_since
         from rdo.sync_schedules where organization_id = $1 and provider = $2`,
      [organizationId, provider],
    );
    return result.rows[0] ?? null;
  });
}

/** Usuario atribuido a uma execucao automatica, para a trilha de auditoria. */
async function schedulerActor(client: PoolClient, organizationId: string) {
  const result = await client.query<{ user_id: string }>(
    `select ou.user_id from rdo.organization_users ou
       join rdo.organization_user_roles ur
         on ur.organization_id = ou.organization_id and ur.user_id = ou.user_id
      where ou.organization_id = $1 and ou.active and ur.active
        and ur.role in ('admin', 'director')
      order by ur.role = 'admin' desc, ou.created_at
      limit 1`,
    [organizationId],
  );
  return result.rows[0]?.user_id ?? null;
}

type RunOutcome = { status: "succeeded" | "partial" | "failed"; message: string; written: number; rejected: number };

async function importPunches(organizationId: string, lookbackDays: number): Promise<RunOutcome> {
  const startDate = today(-Math.max(0, lookbackDays));
  const endDate = today();
  const data = await fetchDimepPunches(startDate, endDate);
  const applied = await withTenant(organizationId, async (client) => {
    const actor = await schedulerActor(client, organizationId);
    if (!actor) throw new Error("Nenhum usuário administrador ativo para registrar a execução.");
    const preview = await previewDimepPunches(client, organizationId, data, startDate, endDate);
    return applyDimepPunches(client, organizationId, actor, data, preview);
  });

  let pointerMessage = "";
  try {
    const pointer = await acknowledgeDimepPunches(applied.ackIds);
    if (pointer.skipped && data.length > 0) pointerMessage = pointer.reason || "Ponteiro não confirmado.";
  } catch (error) {
    pointerMessage = error instanceof Error ? error.message : "Falha ao avançar o ponteiro.";
  }
  await withTenant(organizationId, (client) => recordDimepPointerResult(
    client, organizationId, applied.runId, !pointerMessage, pointerMessage || "Ponteiro confirmado.",
  ));

  const periodo = startDate === endDate ? startDate : `${startDate} a ${endDate}`;
  return {
    status: applied.rejected || pointerMessage ? "partial" : "succeeded",
    message: `${applied.written} batida(s) nova(s) de ${periodo}.`
      + (applied.rejected ? ` ${applied.rejected} rejeitada(s).` : "")
      + (pointerMessage ? ` ${pointerMessage}` : ""),
    written: applied.written,
    rejected: applied.rejected,
  };
}

/**
 * Executa a importacao e reprograma o proximo disparo. `running_since` funciona
 * como trava: uma execucao em andamento nao e disparada duas vezes, e uma trava
 * presa por mais de 15 minutos e considerada abandonada.
 */
export async function runHoursSync(organizationId: string, trigger: "schedule" | "manual") {
  const claimed = await withTenant(organizationId, async (client) => {
    await ensureSchedule(client, organizationId);
    const result = await client.query<{ interval_minutes: number; lookback_days: number }>(
      `update rdo.sync_schedules set running_since = now()
        where organization_id = $1 and provider = $2
          and (running_since is null or running_since < now() - interval '15 minutes')
        returning interval_minutes, lookback_days`,
      [organizationId, provider],
    );
    return result.rows[0] ?? null;
  });
  if (!claimed) return { skipped: true as const, message: "Uma sincronização já está em andamento." };

  let outcome: RunOutcome;
  try {
    outcome = await importPunches(organizationId, claimed.lookback_days);
  } catch (error) {
    outcome = {
      status: "failed",
      message: error instanceof Error ? error.message : "Falha ao sincronizar com o DIMEP.",
      written: 0, rejected: 0,
    };
    console.error("[sync] falha na importação DIMEP", JSON.stringify({ organizationId, trigger, message: outcome.message }));
  }

  await withTenant(organizationId, (client) => client.query(
    `update rdo.sync_schedules
        set running_since = null, last_run_at = now(), last_trigger = $3,
            last_status = $4, last_message = $5,
            last_records_written = $6, last_records_rejected = $7,
            next_run_at = now() + make_interval(mins => interval_minutes)
      where organization_id = $1 and provider = $2`,
    [organizationId, provider, trigger, outcome.status, outcome.message.slice(0, 500), outcome.written, outcome.rejected],
  ));
  return { skipped: false as const, ...outcome };
}

/** Empurra o proximo disparo para o inicio da janela do dia seguinte util. */
async function postponeToWindow(organizationId: string, schedule: SyncSchedule) {
  await withTenant(organizationId, (client) => client.query(
    `update rdo.sync_schedules
        set next_run_at = case
              when (now() at time zone $3)::time < window_start
                then ((now() at time zone $3)::date + window_start) at time zone $3
              else (((now() at time zone $3)::date + 1) + window_start) at time zone $3
            end
      where organization_id = $1 and provider = $2`,
    [organizationId, schedule.provider, timeZone],
  ));
}

/** Um passo do agendador: roda a importacao se estiver vencida e dentro da janela. */
export async function tickHoursSync(organizationId: string) {
  const schedule = await readSyncSchedule(organizationId);
  if (!schedule || !schedule.enabled) return;
  if (new Date(schedule.next_run_at).getTime() > Date.now()) return;
  if (!insideWindow(schedule)) {
    await postponeToWindow(organizationId, schedule);
    return;
  }
  await runHoursSync(organizationId, "schedule");
}
