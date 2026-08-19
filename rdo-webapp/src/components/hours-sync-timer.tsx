"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { syncHoursNowAction } from "@/app/actions/hours";
import { ClockIcon, WarningIcon } from "@/components/icons";
import type { SyncSchedule } from "@/lib/sync-scheduler";

function countdown(target: string, now: number) {
  const remaining = Math.max(0, new Date(target).getTime() - now);
  const minutes = Math.floor(remaining / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { remaining, label: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` };
}

function moment(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
  }).format(new Date(value));
}

const statusLabel: Record<string, string> = {
  succeeded: "Concluída", partial: "Concluída com pendências", failed: "Falhou",
};

export function HoursSyncTimer({ schedule, canSync }: { schedule: SyncSchedule; canSync: boolean }) {
  const router = useRouter();
  const [now, setNow] = useState(() => Date.now());
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok?: string; error?: string }>();
  const clock = countdown(schedule.next_run_at, now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Quando o contador zera, o agendador do servidor ja esta rodando: buscar a
  // pagina de novo traz o resultado e o proximo horario.
  useEffect(() => {
    if (clock.remaining > 0) return;
    const timer = window.setTimeout(() => router.refresh(), 20_000);
    return () => window.clearTimeout(timer);
  }, [clock.remaining, router]);

  async function syncNow() {
    setPending(true);
    setFeedback(undefined);
    try {
      setFeedback(await syncHoursNowAction());
    } finally {
      setPending(false);
      router.refresh();
    }
  }

  const running = Boolean(schedule.running_since) || pending;
  return <section className="sync-timer">
    <div className="sync-timer-clock">
      <ClockIcon />
      <div>
        <strong suppressHydrationWarning>{running ? "Sincronizando…" : clock.remaining > 0 ? clock.label : "A qualquer instante"}</strong>
        <span>{running
          ? "Importando as batidas mais recentes do DIMEP."
          : `Próxima sincronização automática · a cada ${schedule.interval_minutes} min entre ${schedule.window_start} e ${schedule.window_end}`}</span>
      </div>
    </div>
    <div className="sync-timer-last">
      {schedule.last_run_at
        ? <><strong className={schedule.last_status === "failed" ? "danger-text" : ""}>
            {schedule.last_status === "failed" && <WarningIcon />}
            {statusLabel[schedule.last_status ?? ""] || "Sem execução"} · {moment(schedule.last_run_at)}
          </strong><span>{schedule.last_message || "Sem detalhes."}</span></>
        : <><strong>Nenhuma execução registrada</strong><span>A primeira importação acontece no próximo disparo.</span></>}
    </div>
    <div className="sync-timer-actions">
      {canSync
        ? <button type="button" className="button button-primary" onClick={syncNow} disabled={running}>
            {pending ? "Sincronizando…" : "Sincronizar agora"}
          </button>
        : <span className="readiness-note">Somente encarregado, gerente ou diretoria dispara a sincronização manual.</span>}
    </div>
    {feedback?.error && <p className="form-error" role="alert">{feedback.error}</p>}
    {feedback?.ok && <p className="readiness-note" role="status">{feedback.ok}</p>}
  </section>;
}
