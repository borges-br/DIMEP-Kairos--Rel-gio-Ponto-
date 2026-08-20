"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  createWorkLocationAction, publishWorkLocationAction, toggleWorkLocationAction,
  type LocationState,
} from "@/app/actions/locations";
import { locationTypes } from "@/lib/work-locations";
import { WarningIcon } from "@/components/icons";
import type { WorkLocationRow } from "@/lib/dal";

const typeLabels = new Map(locationTypes.map((item) => [item.value as string, item.label]));

function Submit({ label, pendingLabel, className = "button button-primary" }: {
  label: string; pendingLabel: string; className?: string;
}) {
  const { pending } = useFormStatus();
  return <button type="submit" className={className} disabled={pending}>{pending ? pendingLabel : label}</button>;
}

function Feedback({ state }: { state: LocationState }) {
  if (state?.error) return <p className="form-error" role="alert">{state.error}</p>;
  if (state?.ok) return <p className="readiness-note" role="status">{state.ok}</p>;
  return null;
}

function LocationRow({ location, projectId, canPublish }: {
  location: WorkLocationRow; projectId: string; canPublish: boolean;
}) {
  const [toggleState, toggleAction] = useActionState<LocationState, FormData>(toggleWorkLocationAction, undefined);
  const [publishState, publishAction] = useActionState<LocationState, FormData>(publishWorkLocationAction, undefined);
  const published = Boolean(location.imuv_task_id);

  return <article className={`location-row${location.active ? "" : " inactive"}`}>
    <div className="location-identity">
      <strong>{location.label}</strong>
      <small>{typeLabels.get(location.location_type) ?? location.location_type}
        {published && ` · tarefa IMUV ${location.imuv_task_id}`}
        {published && location.published_by && ` · por ${location.published_by}`}</small>
    </div>
    <span className={`status-badge ${location.active ? "status-success" : "status-neutral"}`}>
      {location.active ? "Ativa" : "Inativa"}
    </span>
    <span className={`status-badge ${published ? "status-neutral" : "status-warning"}`}>
      {published ? "No IMUV" : "Só no RDO"}
    </span>
    <div className="location-actions">
      <form action={toggleAction}>
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="locationId" value={location.id} />
        <Submit className="text-button" label={location.active ? "Desativar" : "Reativar"} pendingLabel="Salvando…" />
      </form>
      {canPublish && location.active && !published && <form action={publishAction}>
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="locationId" value={location.id} />
        <Submit className="text-button" label="Publicar no IMUV" pendingLabel="Publicando…" />
      </form>}
    </div>
    <Feedback state={toggleState} />
    <Feedback state={publishState} />
  </article>;
}

/**
 * Frentes e locais nascem aqui, não no IMUV: a tabela é local e o sync apenas
 * semeia um "Local principal" por projeto. Publicar é opcional, um a um, e só
 * para os perfis autorizados — o IMUV está em produção e não deve receber
 * escrita automática.
 */
export function WorkLocationsPanel({ projectId, locations, canWrite, canPublish }: {
  projectId: string;
  locations: WorkLocationRow[];
  canWrite: boolean;
  canPublish: boolean;
}) {
  const [createState, createAction] = useActionState<LocationState, FormData>(createWorkLocationAction, undefined);

  return <section className="panel detail-panel">
    <div className="panel-heading"><div>
      <h2>Frentes e locais</h2>
      <p>Cadastradas neste aplicativo e oferecidas ao preencher um RDO. O IMUV não tem esse conceito: publicar cria uma tarefa lá.</p>
    </div></div>

    <div className="location-list">
      {locations.map((location) =>
        <LocationRow key={location.id} location={location} projectId={projectId} canPublish={canPublish} />)}
      {!locations.length && <div className="empty-state">
        <WarningIcon /><h2>Nenhuma frente cadastrada</h2>
        <p>Cadastre ao menos uma para que o RDO ofereça onde o serviço foi executado.</p>
      </div>}
    </div>

    {canWrite && <form action={createAction} className="location-create">
      <input type="hidden" name="projectId" value={projectId} />
      <label className="field-group">
        <span>Nome da frente ou local <b>*</b></span>
        <input className="input-field" name="label" minLength={2} maxLength={120} required placeholder="Ex.: Subestação 3 — Painel QDL" />
      </label>
      <label className="field-group">
        <span>Tipo</span>
        <select className="input-field" name="locationType" defaultValue="front">
          {locationTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>
      <Submit label="Adicionar" pendingLabel="Adicionando…" />
      <Feedback state={createState} />
    </form>}
  </section>;
}
