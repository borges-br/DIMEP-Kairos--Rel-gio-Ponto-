"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";

export type DistributionState = { ok?: string; error?: string } | undefined;

const assignmentSchema = z.object({
  projectId: z.string().uuid(),
  taskId: z.string().uuid(),
  collaboratorId: z.string().uuid(),
  workDate: z.string().date(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  instructions: z.string().trim().max(2000),
}).superRefine((value, context) => {
  if (value.endTime <= value.startTime) context.addIssue({ code: "custom", path: ["endTime"], message: "O fim deve ser posterior ao início." });
});

export async function createWorkAssignmentAction(_state: DistributionState, formData: FormData): Promise<DistributionState> {
  const session = await requireAnyRole(["leader", "foreman", "manager", "director", "admin"]);
  const parsed = assignmentSchema.safeParse({
    projectId: formData.get("projectId"), taskId: formData.get("taskId"), collaboratorId: formData.get("collaboratorId"),
    workDate: formData.get("workDate"), startTime: formData.get("startTime"), endTime: formData.get("endTime"),
    instructions: formData.get("instructions") || "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise os dados da distribuição." };
  const input = parsed.data;
  try {
    const result = await withTenant(session.organizationId, async (client) => {
      const elevated = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
      const scope = await client.query<{ task_ok: boolean; collaborator_ok: boolean; project_ok: boolean; imuv_linked: boolean }>(
        `select
          exists(select 1 from rdo.projects where organization_id=$1 and id=$2 and active) as project_ok,
          exists(select 1 from rdo.tasks where organization_id=$1 and id=$3 and project_id=$2 and active) as task_ok,
          exists(select 1 from rdo.collaborators where organization_id=$1 and id=$4 and active) as collaborator_ok,
          exists(select 1 from rdo.collaborator_external_refs er join rdo.integration_connections ic on ic.id=er.connection_id
            where er.organization_id=$1 and er.collaborator_id=$4 and ic.provider='imuv') as imuv_linked`,
        [session.organizationId, input.projectId, input.taskId, input.collaboratorId],
      );
      const row = scope.rows[0];
      if (!row?.project_ok || !row.task_ok || !row.collaborator_ok) return "invalid-scope";
      if (!elevated) {
        const leaderAccess = await client.query(
          `select 1 from rdo.leader_team_members where organization_id=$1 and project_id=$2
            and leader_user_id=$3 and valid_from <= $4::date
            and (valid_until is null or valid_until >= $4::date) limit 1`,
          [session.organizationId, input.projectId, session.userId, input.workDate],
        );
        if (!leaderAccess.rows[0]) return "forbidden";
      }
      const inserted = await client.query<{ id: string }>(
        `insert into rdo.work_assignments
          (organization_id,project_id,task_id,collaborator_id,work_date,planned_start,planned_end,instructions,imuv_sync_status,created_by_user_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id`,
        [session.organizationId, input.projectId, input.taskId, input.collaboratorId, input.workDate,
          input.startTime, input.endTime, input.instructions || null, row.imuv_linked ? "pending_homologation" : "not_applicable", session.userId],
      );
      await client.query(
        `insert into rdo.audit_events
          (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason)
         values ($1,$2,'work_assignments',$3,'insert',$4::jsonb,'Trabalho distribuído pelo líder')`,
        [session.organizationId, session.userId, inserted.rows[0].id, JSON.stringify(input)],
      );
      return "ok";
    });
    if (result === "invalid-scope") return { error: "Projeto, tarefa ou colaborador não está mais disponível." };
    if (result === "forbidden") return { error: "Você não lidera esse projeto na data selecionada." };
    revalidatePath("/distribution");
    return { ok: "Trabalho distribuído. Os vínculos IMUV foram preservados e a jornada será conferida com o DIMEP." };
  } catch (error) {
    if (error instanceof Error && error.message.includes("work_assignments_task_id_collaborator_id_work_date_planned_start_key")) return { error: "Esta distribuição já existe." };
    console.error("Falha ao distribuir trabalho", error);
    return { error: "Não foi possível salvar a distribuição." };
  }
}

export async function cancelWorkAssignmentAction(formData: FormData) {
  const session = await requireAnyRole(["leader", "foreman", "manager", "director", "admin"]);
  const id = String(formData.get("id") || "");
  if (!z.string().uuid().safeParse(id).success) return;
  await withTenant(session.organizationId, async (client) => {
    const elevated = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
    await client.query(
      `update rdo.work_assignments set status='cancelled'
        where organization_id=$1 and id=$2 and status='planned'
          and ($3::boolean or created_by_user_id=$4)`,
      [session.organizationId, id, elevated, session.userId],
    );
  });
  revalidatePath("/distribution");
}
