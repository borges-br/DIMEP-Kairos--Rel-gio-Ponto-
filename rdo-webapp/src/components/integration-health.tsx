"use client";

import { useEffect, useState, useTransition } from "react";
import { checkIntegrationsAction } from "@/app/actions/integrations";
import type { ProbeResult } from "@/lib/integrations/probe";

const services: ProbeResult["service"][] = ["dimep", "imuv", "storage"];
const names: Record<ProbeResult["service"], string> = {
  dimep: "DIMEP Kairos", imuv: "IMUV", storage: "Armazenamento",
};

/**
 * Um card só para as três integrações: o que importa é se a comunicação existe
 * agora, não se as variáveis de ambiente foram preenchidas.
 */
export function IntegrationHealth() {
  const [results, setResults] = useState<ProbeResult[] | null>(null);
  const [checkedAt, setCheckedAt] = useState<string>();
  const [pending, startTransition] = useTransition();

  function check() {
    startTransition(async () => {
      const probed = await checkIntegrationsAction();
      setResults(probed);
      setCheckedAt(new Intl.DateTimeFormat("pt-BR", { timeStyle: "medium", timeZone: "America/Sao_Paulo" }).format(new Date()));
    });
  }

  useEffect(() => { check(); }, []);

  const offline = results?.filter((item) => !item.online).length ?? 0;
  return <section className="panel health-card">
    <div className="health-head">
      <div>
        <span className="eyebrow">INTEGRAÇÕES</span>
        <h2>{results === null ? "Verificando serviços…" : offline === 0 ? "Todos os serviços respondendo" : `${offline} serviço(s) sem resposta`}</h2>
        {checkedAt && <p>Última verificação às {checkedAt}.</p>}
      </div>
      <button type="button" className="button button-secondary" onClick={check} disabled={pending}>
        {pending ? "Verificando…" : "Verificar agora"}
      </button>
    </div>
    <ul className="health-list">{services.map((service) => {
      const result = results?.find((item) => item.service === service);
      const state = !result ? "checking" : result.online ? "online" : "offline";
      return <li key={service} className={`health-item ${state}`}>
        <span className="health-flash" aria-hidden="true" />
        <div>
          <strong>{names[service]}</strong>
          <small>{result ? result.detail : "Testando comunicação…"}</small>
        </div>
        <span className="health-state">
          {state === "checking" ? "…" : state === "online" ? `Online · ${result!.durationMs} ms` : "Offline"}
        </span>
      </li>;
    })}</ul>
  </section>;
}
