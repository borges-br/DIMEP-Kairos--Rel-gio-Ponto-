"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { createRdoAction } from "@/app/actions/rdo";
import type { RdoCatalogOption, RdoFormProject } from "@/lib/dal";
import { CloudIcon, CloseIcon, PlusIcon, RainIcon, ShieldIcon, SunIcon, UsersIcon, WarningIcon, WindIcon } from "@/components/icons";

type ActivityDraft = {
  key: string;
  taskId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  description: string;
  collaboratorIds: string[];
  quantity: string;
  unit: string;
  progress: string;
  divergenceReason: string;
  ptNumber: string;
  ptOpenTime: string;
  ptCloseTime: string;
};

type MaterialDraft = { key: string; materialId: string; movement: "" | "used" | "received" | "missing"; quantity: string; unit: string };
type EquipmentDraft = { key: string; equipmentId: string; usageMinutes: string; downtimeMinutes: string; downtimeReason: string };

const emptyActivity = (key: string, taskId = ""): ActivityDraft => ({
  key,
  taskId,
  locationId: "",
  startTime: "07:30",
  endTime: "17:00",
  description: "",
  collaboratorIds: [],
  quantity: "",
  unit: "",
  progress: "",
  divergenceReason: "",
  ptNumber: "",
  ptOpenTime: "",
  ptCloseTime: "",
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="button button-primary button-large" disabled={pending}>{pending ? "Salvando com segurança…" : "Salvar RDO como rascunho"}</button>;
}

export function NewRdoForm({
  projects,
  materials,
  equipment,
  initialProjectId,
  initialTaskId,
  globalProjectAccess,
}: {
  projects: RdoFormProject[];
  materials: RdoCatalogOption[];
  equipment: RdoCatalogOption[];
  initialProjectId?: string;
  initialTaskId?: string;
  globalProjectAccess?: boolean;
}) {
  const [state, action] = useActionState(createRdoAction, undefined);
  const [projectId, setProjectId] = useState(initialProjectId ?? projects[0]?.id ?? "");
  const [activities, setActivities] = useState<ActivityDraft[]>([emptyActivity("activity-1", initialTaskId)]);
  const [dds, setDds] = useState(true);
  const [ppe, setPpe] = useState(true);
  const [unsafe, setUnsafe] = useState(false);
  const [weatherImpacted, setWeatherImpacted] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [hasOccurrence, setHasOccurrence] = useState(false);
  const [hasQuality, setHasQuality] = useState(false);
  const [materialRows, setMaterialRows] = useState<MaterialDraft[]>([]);
  const [equipmentRows, setEquipmentRows] = useState<EquipmentDraft[]>([]);
  const project = projects.find((item) => item.id === projectId);

  const serializedActivities = useMemo(() => JSON.stringify(activities.map((item) => ({
    taskId: item.taskId,
    locationId: item.locationId,
    startTime: item.startTime,
    endTime: item.endTime,
    description: item.description,
    collaboratorIds: item.collaboratorIds,
    unit: item.unit,
    divergenceReason: item.divergenceReason,
    quantity: item.quantity === "" ? null : Number(item.quantity.replace(",", ".")),
    progress: item.progress === "" ? null : Number(item.progress.replace(",", ".")),
    ptNumber: item.ptNumber,
    ptOpenTime: item.ptOpenTime,
    ptCloseTime: item.ptCloseTime,
  }))), [activities]);
  const serializedMaterials = useMemo(() => JSON.stringify(materialRows.map((item) => ({
    materialId: item.materialId,
    movement: item.movement,
    quantity: Number(item.quantity.replace(",", ".")),
    unit: item.unit,
  }))), [materialRows]);
  const serializedEquipment = useMemo(() => JSON.stringify(equipmentRows.map((item) => ({
    equipmentId: item.equipmentId,
    usageMinutes: Number(item.usageMinutes || 0),
    downtimeMinutes: Number(item.downtimeMinutes || 0),
    downtimeReason: item.downtimeReason,
  }))), [equipmentRows]);

  function updateActivity(key: string, patch: Partial<ActivityDraft>) {
    setActivities((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  function updateMaterial(key: string, patch: Partial<MaterialDraft>) {
    setMaterialRows((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  function updateEquipment(key: string, patch: Partial<EquipmentDraft>) {
    setEquipmentRows((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  function changeProject(nextProjectId: string) {
    setProjectId(nextProjectId);
    setActivities([emptyActivity(`activity-${Date.now()}`)]);
  }

  function toggleMember(activity: ActivityDraft, collaboratorId: string) {
    const selected = activity.collaboratorIds.includes(collaboratorId);
    updateActivity(activity.key, {
      collaboratorIds: selected
        ? activity.collaboratorIds.filter((id) => id !== collaboratorId)
        : [...activity.collaboratorIds, collaboratorId],
    });
  }

  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());

  return (
    <form action={action} className="rdo-form">
      <input type="hidden" name="activities" value={serializedActivities} />
      <input type="hidden" name="materials" value={serializedMaterials} />
      <input type="hidden" name="equipmentUsage" value={serializedEquipment} />
      <input type="hidden" name="weatherCondition" value={weatherCondition} />

      <section className="form-section">
        <div className="section-heading"><span className="step-number">1</span><div><h2>Identificação do diário</h2><p>Projeto e tarefa vêm do IMUV. O autor e a versão são registrados automaticamente.</p></div></div>
        <div className="form-grid two-columns">
          <label className="field-group"><span>Projeto <b>*</b></span><select className="input-field" name="projectId" value={projectId} onChange={(event) => changeProject(event.target.value)} required><option value="">Selecione…</option>{projects.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.name}</option>)}</select></label>
          <label className="field-group"><span>Data de trabalho <b>*</b></span><input className="input-field" name="workDate" type="date" defaultValue={today} required /></label>
        </div>
        {!projects.length && <p className="inline-warning"><WarningIcon />{globalProjectAccess ? "Nenhum projeto ativo foi importado do IMUV. Execute novamente a sincronização e confira os registros rejeitados." : "Nenhum projeto ativo está vinculado ao seu usuário. Solicite ao administrador a vinculação da equipe."}</p>}
      </section>

      <section className="form-section">
        <div className="section-heading"><span className="step-number">2</span><div><h2>Atividades e equipe</h2><p>Cada bloco gera uma linha de horas para cada colaborador selecionado.</p></div></div>
        <div className="activity-list">
          {activities.map((activity, index) => (
            <article className="activity-card" key={activity.key}>
              <div className="activity-title"><div><span>ATIVIDADE {index + 1}</span><h3>{activity.description || "Nova atividade"}</h3></div>{activities.length > 1 && <button type="button" className="text-button danger" onClick={() => setActivities((current) => current.filter((item) => item.key !== activity.key))}>Remover</button>}</div>
              <div className="form-grid two-columns">
                <label className="field-group"><span>Tarefa IMUV <b>*</b></span><select className="input-field" value={activity.taskId} onChange={(event) => updateActivity(activity.key, { taskId: event.target.value })} required><option value="">Selecione…</option>{project?.tasks.map((task) => <option key={task.id} value={task.id}>{task.code} · {task.name}</option>)}</select></label>
                <label className="field-group"><span>Frente / local <b>*</b></span><select className="input-field" value={activity.locationId} onChange={(event) => updateActivity(activity.key, { locationId: event.target.value })} required><option value="">Selecione…</option>{project?.locations.map((location) => <option key={location.id} value={location.id}>{location.label}</option>)}</select></label>
              </div>
              <div className="form-grid time-grid">
                <label className="field-group"><span>Início <b>*</b></span><input className="input-field" type="time" value={activity.startTime} onChange={(event) => updateActivity(activity.key, { startTime: event.target.value })} required /></label>
                <label className="field-group"><span>Fim <b>*</b></span><input className="input-field" type="time" value={activity.endTime} onChange={(event) => updateActivity(activity.key, { endTime: event.target.value })} required /></label>
                <label className="field-group"><span>Quantidade</span><input className="input-field" inputMode="decimal" value={activity.quantity} onChange={(event) => updateActivity(activity.key, { quantity: event.target.value })} placeholder="Ex.: 12,5" /></label>
                <label className="field-group"><span>Unidade</span><input className="input-field" value={activity.unit} onChange={(event) => updateActivity(activity.key, { unit: event.target.value })} placeholder="m, un, kg…" maxLength={30} /></label>
                <label className="field-group"><span>Avanço no dia (%)</span><input className="input-field" type="number" min="0" max="100" step="0.1" value={activity.progress} onChange={(event) => updateActivity(activity.key, { progress: event.target.value })} /></label>
              </div>
              <label className="field-group"><span>Serviço executado <b>*</b></span><textarea className="input-field" rows={3} value={activity.description} onChange={(event) => updateActivity(activity.key, { description: event.target.value })} minLength={10} maxLength={2000} required placeholder="Descreva objetivamente o que foi executado…" /></label>
              <div className="permit-box"><div className="permit-heading"><ShieldIcon /><div><strong>Permissão de Trabalho (PT)</strong><span>Opcional. Se informada, o número identifica a liberação desta tarefa.</span></div></div><div className="form-grid three-columns"><label className="field-group"><span>Número da PT</span><input className="input-field" value={activity.ptNumber} onChange={(event) => updateActivity(activity.key, { ptNumber: event.target.value })} maxLength={100} placeholder="Ex.: 45872" /></label><label className="field-group"><span>Abertura</span><input className="input-field" type="time" value={activity.ptOpenTime} onInput={(event) => updateActivity(activity.key, { ptOpenTime: event.currentTarget.value })} /></label><label className="field-group"><span>Fechamento</span><input className="input-field" type="time" value={activity.ptCloseTime} onInput={(event) => updateActivity(activity.key, { ptCloseTime: event.currentTarget.value })} /></label></div>{(activity.ptOpenTime || activity.ptCloseTime) && !activity.ptNumber && <p className="inline-warning"><WarningIcon />Informe o número da PT quando houver horário de abertura ou fechamento.</p>}</div>
              <fieldset className="team-fieldset"><legend><UsersIcon /> Equipe nesta atividade <b>*</b></legend>{project?.members.length ? <div className="member-grid">{project.members.map((member) => <label className={`member-option ${activity.collaboratorIds.includes(member.id) ? "selected" : ""}`} key={member.id}><input type="checkbox" checked={activity.collaboratorIds.includes(member.id)} onChange={() => toggleMember(activity, member.id)} /><span><strong>{member.name}</strong><small>{member.jobTitle || "Função não informada"}</small></span></label>)}</div> : <p className="empty-copy">Nenhum colaborador vinculado a este projeto no IMUV.</p>}</fieldset>
              <label className="field-group"><span>Justificativa se faltar cobertura DIMEP</span><textarea className="input-field" rows={2} value={activity.divergenceReason} onChange={(event) => updateActivity(activity.key, { divergenceReason: event.target.value })} maxLength={1000} placeholder="Ex.: batida de retorno ainda não sincronizada. Será exigida somente quando houver divergência." /></label>
            </article>
          ))}
        </div>
        <button type="button" className="button button-secondary" onClick={() => setActivities((current) => [...current, emptyActivity(`activity-${Date.now()}`)])} disabled={activities.length >= 12}><PlusIcon />Adicionar outra atividade</button>
      </section>

      <section className="form-section">
        <div className="section-heading"><span className="step-number">3</span><div><h2>Segurança</h2><p>Obrigatório para todos os RDOs. Respostas críticas exigem detalhamento.</p></div></div>
        <div className="safety-grid">
          <label className={`toggle-card ${dds ? "positive" : "critical"}`}><input name="ddsPerformed" type="checkbox" checked={dds} onChange={(event) => setDds(event.target.checked)} /><ShieldIcon /><span><strong>DDS realizado</strong><small>{dds ? "Sim" : "Não"}</small></span></label>
          <label className={`toggle-card ${ppe ? "positive" : "critical"}`}><input name="ppeCompliant" type="checkbox" checked={ppe} onChange={(event) => setPpe(event.target.checked)} /><ShieldIcon /><span><strong>EPIs adequados</strong><small>{ppe ? "Sim" : "Não"}</small></span></label>
          <label className={`toggle-card ${unsafe ? "critical" : "positive"}`}><input name="unsafeConditionFound" type="checkbox" checked={unsafe} onChange={(event) => setUnsafe(event.target.checked)} /><WarningIcon /><span><strong>Condição insegura</strong><small>{unsafe ? "Encontrada" : "Não encontrada"}</small></span></label>
        </div>
        {(!dds || !ppe || unsafe) && <div className="form-grid two-columns"><label className="field-group"><span>Detalhes da condição <b>*</b></span><textarea className="input-field" name="safetyDetails" rows={3} required /></label><label className="field-group"><span>Ação corretiva {unsafe && <b>*</b>}</span><textarea className="input-field" name="correctiveAction" rows={3} required={unsafe} /></label></div>}
      </section>

      <details className="optional-section">
        <summary>Condições, recursos e continuidade <span>Opcional / quando aplicável</span></summary>
        <div className="details-body">
          <div className="resource-heading"><div><h3>Condição climática</h3><p>Selecione uma das quatro condições observadas em campo.</p></div>{weatherCondition && <button type="button" className="text-button" onClick={() => setWeatherCondition("")}>Limpar</button>}</div>
          <div className="weather-grid">
            {[
              { value: "sunny", label: "Ensolarado", Icon: SunIcon },
              { value: "cloudy", label: "Nublado", Icon: CloudIcon },
              { value: "rainy", label: "Chuvoso", Icon: RainIcon },
              { value: "windy", label: "Vento forte", Icon: WindIcon },
            ].map(({ value, label, Icon }) => <button key={value} type="button" className={`weather-card ${weatherCondition === value ? "selected" : ""}`} aria-pressed={weatherCondition === value} onClick={() => setWeatherCondition(value)}><Icon /><span>{label}</span></button>)}
          </div>
          <div className="form-grid two-columns"><label className="field-group"><span>Temperatura (°C)</span><input className="input-field" name="temperatureC" type="number" min="-30" max="60" step="0.1" placeholder="24" /></label><label className="check-row"><input name="weatherImpacted" type="checkbox" checked={weatherImpacted} onChange={(event) => setWeatherImpacted(event.target.checked)} /><span>O clima impactou a execução</span></label></div>
          {weatherImpacted && <label className="field-group"><span>Impacto do clima <b>*</b></span><textarea className="input-field" name="weatherImpactDescription" rows={2} required /></label>}
          <hr />
          <div className="resource-heading"><div><h3>Materiais</h3><p>Registre quantos itens forem necessários.</p></div><button type="button" className="button button-secondary button-compact" onClick={() => setMaterialRows((current) => [...current, { key: `material-${Date.now()}`, materialId: "", movement: "", quantity: "", unit: "" }])} disabled={materialRows.length >= 30}><PlusIcon />Adicionar material</button></div>
          <div className="resource-list">{materialRows.map((row, index) => <article className="resource-row" key={row.key}><div className="resource-row-title"><strong>Material {index + 1}</strong><button type="button" aria-label={`Remover material ${index + 1}`} onClick={() => setMaterialRows((current) => current.filter((item) => item.key !== row.key))}><CloseIcon /></button></div><div className="form-grid four-columns"><label className="field-group"><span>Material <b>*</b></span><select className="input-field" value={row.materialId} onChange={(event) => { const selected = materials.find((item) => item.id === event.target.value); updateMaterial(row.key, { materialId: event.target.value, unit: selected?.unit || row.unit }); }} required><option value="">Selecione</option>{materials.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="field-group"><span>Movimento <b>*</b></span><select className="input-field" value={row.movement} onChange={(event) => updateMaterial(row.key, { movement: event.target.value as MaterialDraft["movement"] })} required><option value="">Selecione</option><option value="used">Utilizado</option><option value="received">Recebido</option><option value="missing">Faltante</option></select></label><label className="field-group"><span>Quantidade <b>*</b></span><input className="input-field" inputMode="decimal" value={row.quantity} onChange={(event) => updateMaterial(row.key, { quantity: event.target.value })} required /></label><label className="field-group"><span>Unidade <b>*</b></span><input className="input-field" value={row.unit} onChange={(event) => updateMaterial(row.key, { unit: event.target.value })} maxLength={30} required /></label></div></article>)}</div>
          {!materialRows.length && <p className="empty-copy">Nenhum material adicionado.</p>}
          <hr />
          <div className="resource-heading"><div><h3>Equipamentos e ferramentas</h3><p>Uso e parada ficam separados por ativo.</p></div><button type="button" className="button button-secondary button-compact" onClick={() => setEquipmentRows((current) => [...current, { key: `equipment-${Date.now()}`, equipmentId: "", usageMinutes: "0", downtimeMinutes: "0", downtimeReason: "" }])} disabled={equipmentRows.length >= 30}><PlusIcon />Adicionar equipamento</button></div>
          <div className="resource-list">{equipmentRows.map((row, index) => <article className="resource-row" key={row.key}><div className="resource-row-title"><strong>Equipamento {index + 1}</strong><button type="button" aria-label={`Remover equipamento ${index + 1}`} onClick={() => setEquipmentRows((current) => current.filter((item) => item.key !== row.key))}><CloseIcon /></button></div><div className="form-grid three-columns"><label className="field-group"><span>Equipamento / ferramenta <b>*</b></span><select className="input-field" value={row.equipmentId} onChange={(event) => updateEquipment(row.key, { equipmentId: event.target.value })} required><option value="">Selecione</option>{equipment.map((item) => <option key={item.id} value={item.id}>{item.code ? `${item.code} · ` : ""}{item.name}</option>)}</select></label><label className="field-group"><span>Uso (min)</span><input className="input-field" type="number" min="0" max="1440" value={row.usageMinutes} onChange={(event) => updateEquipment(row.key, { usageMinutes: event.target.value })} /></label><label className="field-group"><span>Parada (min)</span><input className="input-field" type="number" min="0" max="1440" value={row.downtimeMinutes} onChange={(event) => updateEquipment(row.key, { downtimeMinutes: event.target.value })} /></label></div><label className="field-group"><span>Motivo da parada {Number(row.downtimeMinutes) > 0 && <b>*</b>}</span><input className="input-field" value={row.downtimeReason} onChange={(event) => updateEquipment(row.key, { downtimeReason: event.target.value })} maxLength={500} required={Number(row.downtimeMinutes) > 0} /></label></article>)}</div>
          {!equipmentRows.length && <p className="empty-copy">Nenhum equipamento adicionado.</p>}
          <hr />
          <div className="form-grid two-columns"><label className="field-group"><span>Pendência</span><textarea className="input-field" name="pendingItem" rows={2} placeholder="Item que ficou pendente…" /></label><label className="field-group"><span>Próximo passo</span><textarea className="input-field" name="nextStep" rows={2} placeholder="Orientação para o próximo turno…" /></label></div>
        </div>
      </details>

      <section className="form-section evidence-section">
        <div className="section-heading"><span className="step-number">4</span><div><h2>Evidências e áudio</h2><p>Fotos e áudios serão vinculados ao projeto, tarefa, data, hora, usuário e versão do RDO.</p></div></div>
        <div className="evidence-grid"><div className="evidence-placeholder"><strong>Fotos do serviço</strong><span>Múltiplas imagens, câmera do celular, hash e metadados de captura.</span><button className="button button-secondary" type="button" disabled>Adicionar foto</button></div><div className="evidence-placeholder"><strong>Áudio original + transcrição</strong><span>O arquivo original será preservado; a transcrição ficará em registro derivado.</span><button className="button button-secondary" type="button" disabled>Gravar áudio</button></div></div>
        <p className="readiness-note">Após salvar o rascunho, abra o RDO para fotografar, anexar imagens ou enviar áudio ao MinIO.</p>
      </section>

      <details className="optional-section" open={hasOccurrence || hasQuality}>
        <summary>Ocorrências e qualidade <span>Condicional</span></summary>
        <div className="details-body">
          <label className="check-row"><input name="hasOccurrence" type="checkbox" checked={hasOccurrence} onChange={(event) => setHasOccurrence(event.target.checked)} /><span>Houve incidente, acidente, bloqueio ou quase acidente</span></label>
          {hasOccurrence && <div className="conditional-box"><p className="inline-warning"><WarningIcon />Uma ocorrência exige detalhes e evidência antes do envio para aprovação.</p><div className="form-grid three-columns"><label className="field-group"><span>Tipo <b>*</b></span><select className="input-field" name="occurrenceType" required><option value="">Selecione</option><option value="incident">Incidente</option><option value="accident">Acidente</option><option value="blockage">Bloqueio</option><option value="near_miss">Quase acidente</option><option value="other">Outro</option></select></label><label className="field-group"><span>Severidade <b>*</b></span><select className="input-field" name="occurrenceSeverity" required><option value="">Selecione</option><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option><option value="critical">Crítica</option></select></label><label className="field-group"><span>Horário <b>*</b></span><input className="input-field" name="occurrenceTime" type="time" required /></label></div><label className="field-group"><span>Descrição <b>*</b></span><textarea className="input-field" name="occurrenceDescription" rows={3} required /></label><label className="field-group"><span>Providência imediata <b>*</b></span><textarea className="input-field" name="occurrenceAction" rows={3} required /></label><div className="upload-placeholder">Salve o rascunho e anexe a evidência no detalhe do RDO.</div></div>}
          <hr />
          <label className="check-row"><input name="hasQuality" type="checkbox" checked={hasQuality} onChange={(event) => setHasQuality(event.target.checked)} /><span>Registrar inspeção, teste ou não conformidade</span></label>
          {hasQuality && <div className="conditional-box"><div className="form-grid two-columns"><label className="field-group"><span>Tipo <b>*</b></span><select className="input-field" name="qualityType" required><option value="">Selecione</option><option value="inspection">Inspeção</option><option value="test">Teste</option><option value="nonconformity">Não conformidade</option></select></label><label className="field-group"><span>Resultado <b>*</b></span><select className="input-field" name="qualityResult" required><option value="">Selecione</option><option value="approved">Aprovado</option><option value="rejected">Reprovado</option><option value="pending">Pendente</option><option value="not_applicable">Não aplicável</option></select></label></div><label className="field-group"><span>Descrição <b>*</b></span><textarea className="input-field" name="qualityDescription" rows={3} required /></label><label className="field-group"><span>Ação corretiva (obrigatória se reprovado)</span><textarea className="input-field" name="qualityCorrectiveAction" rows={2} /></label></div>}
        </div>
      </details>

      <section className="form-section final-section">
        <label className="field-group"><span>Observações gerais</span><textarea className="input-field" name="generalNotes" rows={3} maxLength={4000} placeholder="Informações adicionais do dia…" /></label>
        {state?.error && <p className="form-error" role="alert">{state.error}</p>}
        <div className="submit-row"><div><strong>O RDO será salvo como rascunho.</strong><span>A conciliação DIMEP e a aprovação acontecem antes da exportação IMUV.</span></div><SubmitButton /></div>
      </section>
    </form>
  );
}
