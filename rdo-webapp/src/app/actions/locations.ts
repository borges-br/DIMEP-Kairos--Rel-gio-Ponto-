"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { withTenant } from "@/lib/db";
import { assertPageWrite } from "@/lib/permissions";
import { publishFrontAsImuvTask } from "@/lib/integrations/imuv";
import { locationTypes, type LocationType } from "@/lib/work-locations";

export type LocationState = { ok?: string; error?: string } | undefined;

const normalized = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();

const createSchema = z.object({
  projectId: z.string().uuid(),
  label: z.string().trim().min(2, "Informe um nome para a frente ou local.").max(120),
  locationType: z.enum(locationTypes.map((item) => item.value) as [LocationType, ...LocationType[]]),
});

export async function createWorkLocationAction(_state: LocationState, formData: FormData): Promise<LocationState> {
  const session = await assertPageWrite("projects");
  const parsed = createSchema.safeParse({
    projectId: formData.get("projectId"),
    label: formData.get("label"),
    locationType: formData.get("locationType") || "front",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise os dados da frente." };
  const { projectId, label, locationType } = parsed.data;

  try {
    const outcome = await withTenant(session.organizationId, async (client) => {
      const project = await client.query(
        "select 1 from rdo.projects where organization_id = $1 and id = $2 and active",
        [session.organizationId, projectId]);
      if (!project.rowCount) return { error: "Projeto não encontrado ou inativo." };

      // O unique (project_id, normalized_label) ja impede duplicata; reativar em
      // vez de falhar evita que um nome reaproveitado fique inacessivel.
      const saved = await client.query<{ id: string }>(
        `insert into rdo.work_locations
          (organization_id, project_id, location_type, label, normalized_label, active, created_by_user_id)
         values ($1,$2,$3,$4,$5,true,$6)
         on conflict (project_id, normalized_label) do update
           set active = true, label = excluded.label, location_type = excluded.location_type
         returning id`,
        [session.organizationId, projectId, locationType, label, normalized(label), session.userId]);

      await client.query(
        `insert into rdo.audit_events (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'work_locations',$3,'insert',$4::jsonb,'Frente/local cadastrada no RDO')`,
        [session.organizationId, session.userId, saved.rows[0].id,
          JSON.stringify({ label, locationType, projectId })]);
      return { ok: `“${label}” disponível para os próximos RDOs.` };
    });
    if (outcome.error) return outcome;
    revalidatePath(`/projects/${projectId}`);
    return outcome;
  } catch (caught) {
    console.error("Falha ao cadastrar frente/local", caught);
    return { error: "Não foi possível cadastrar a frente." };
  }
}

const toggleSchema = z.object({ projectId: z.string().uuid(), locationId: z.string().uuid() });

export async function toggleWorkLocationAction(_state: LocationState, formData: FormData): Promise<LocationState> {
  const session = await assertPageWrite("projects");
  const parsed = toggleSchema.safeParse({
    projectId: formData.get("projectId"), locationId: formData.get("locationId"),
  });
  if (!parsed.success) return { error: "Frente inválida." };
  const { projectId, locationId } = parsed.data;

  try {
    const outcome = await withTenant(session.organizationId, async (client) => {
      const updated = await client.query<{ label: string; active: boolean }>(
        `update rdo.work_locations set active = not active
          where organization_id = $1 and id = $2 and project_id = $3
        returning label, active`,
        [session.organizationId, locationId, projectId]);
      const row = updated.rows[0];
      if (!row) return { error: "Frente não encontrada." };
      await client.query(
        `insert into rdo.audit_events (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'work_locations',$3,'update',$4::jsonb,'Frente/local ativada ou desativada no RDO')`,
        [session.organizationId, session.userId, locationId, JSON.stringify({ active: row.active })]);
      return { ok: row.active ? `“${row.label}” reativada.` : `“${row.label}” desativada.` };
    });
    if (outcome.error) return outcome;
    revalidatePath(`/projects/${projectId}`);
    return outcome;
  } catch (caught) {
    console.error("Falha ao alternar frente/local", caught);
    return { error: "Não foi possível alterar a frente." };
  }
}

/** Só estes perfis publicam no IMUV, conforme definido com a operação. */
const publishRoles = ["director", "leader", "admin"];

const publishMessages: Record<string, string> = {
  IMUV_PUBLISH_DISABLED: "O envio ao IMUV está desligado. Defina IMUV_ALLOW_TASK_PUBLISH=true no servidor para habilitar.",
  IMUV_PROJECT_ID_INVALID: "Este projeto não tem identificador válido do IMUV; sincronize antes de publicar.",
  IMUV_TASK_NAME_REQUIRED: "A frente precisa de um nome para virar tarefa no IMUV.",
};

/**
 * Publica a frente no IMUV como Tarefa. Sequência deliberada:
 *
 * 1. valida tudo localmente, para não abrir requisição a um sistema em produção
 *    sem necessidade;
 * 2. faz o POST **fora** da transação, para não segurar conexão do pool durante
 *    I/O de rede;
 * 3. só então grava o id remoto.
 *
 * Se o passo 3 falhar depois de o 2 ter dado certo, existe uma tarefa criada no
 * IMUV que este app não conhece — e que voltaria como atividade no próximo
 * sync. A mensagem de erro carrega o id justamente para permitir a conferência
 * manual; engolir isso seria o pior desfecho possível.
 */
export async function publishWorkLocationAction(_state: LocationState, formData: FormData): Promise<LocationState> {
  const session = await assertPageWrite("projects");
  if (!session.roles.some((role) => publishRoles.includes(role))) {
    return { error: "Apenas diretor, líder ou administrador pode publicar no IMUV." };
  }
  const parsed = toggleSchema.safeParse({
    projectId: formData.get("projectId"), locationId: formData.get("locationId"),
  });
  if (!parsed.success) return { error: "Frente inválida." };
  const { projectId, locationId } = parsed.data;

  let target: { label: string; projectExternalId: string | null } | null = null;
  try {
    target = await withTenant(session.organizationId, async (client) => {
      const result = await client.query<{ label: string; project_external_id: string | null; imuv_task_id: string | null }>(
        `select l.label, p.imuv_external_id as project_external_id, l.imuv_task_id
           from rdo.work_locations l join rdo.projects p on p.id = l.project_id
          where l.organization_id = $1 and l.id = $2 and l.project_id = $3 and l.active`,
        [session.organizationId, locationId, projectId]);
      const row = result.rows[0];
      if (!row) return null;
      // Publicar duas vezes criaria duas tarefas no IMUV para a mesma frente.
      if (row.imuv_task_id) throw new Error("ALREADY_PUBLISHED");
      return { label: row.label, projectExternalId: row.project_external_id };
    });
  } catch (caught) {
    if (caught instanceof Error && caught.message === "ALREADY_PUBLISHED") {
      return { error: "Esta frente já foi publicada no IMUV." };
    }
    console.error("Falha ao carregar frente para publicação", caught);
    return { error: "Não foi possível preparar a publicação." };
  }
  if (!target) return { error: "Frente não encontrada ou inativa." };
  if (!target.projectExternalId) return { error: "Este projeto ainda não veio do IMUV; não há onde publicar." };

  let taskId: string;
  try {
    ({ taskId } = await publishFrontAsImuvTask({
      label: target.label, projectExternalId: target.projectExternalId,
    }));
  } catch (caught) {
    const code = caught instanceof Error ? caught.message : "";
    console.error("Falha ao publicar frente no IMUV", caught);
    if (code === "IMUV_TASK_ID_MISSING") {
      return { error: "O IMUV aceitou a tarefa mas não devolveu o identificador. Verifique manualmente no IMUV antes de tentar de novo, para não duplicar." };
    }
    return { error: publishMessages[code] || "O IMUV recusou a publicação. Nada foi alterado lá." };
  }

  try {
    await withTenant(session.organizationId, async (client) => {
      await client.query(
        `update rdo.work_locations
            set imuv_task_id = $3, published_at = now(), published_by_user_id = $4
          where organization_id = $1 and id = $2`,
        [session.organizationId, locationId, taskId, session.userId]);
      await client.query(
        `insert into rdo.audit_events (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'work_locations',$3,'export',$4::jsonb,'Frente publicada no IMUV como tarefa')`,
        [session.organizationId, session.userId, locationId,
          JSON.stringify({ imuvTaskId: taskId, label: target.label })]);
    });
  } catch (caught) {
    console.error("Frente publicada no IMUV mas não registrada localmente", caught);
    return { error: `A tarefa ${taskId} foi criada no IMUV, mas o registro local falhou. Anote esse número: sem ele o próximo sync trará a frente de volta como atividade.` };
  }

  revalidatePath(`/projects/${projectId}`);
  return { ok: `“${target.label}” publicada no IMUV como tarefa ${taskId}.` };
}
