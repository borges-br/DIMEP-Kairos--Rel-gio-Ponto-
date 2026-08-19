"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";

export type DuplicateState = { ok?: string; error?: string } | undefined;

const schema = z.object({
  keepId: z.string().uuid(),
  dropId: z.string().uuid(),
  decision: z.enum(["merged", "distinct"]),
  reason: z.string().trim().min(10, "Explique a decisão em pelo menos 10 caracteres.").max(1000),
}).refine((value) => value.keepId !== value.dropId, { message: "Selecione dois cadastros diferentes." });

/**
 * Consolida ou separa dois cadastros suspeitos de serem a mesma pessoa.
 *
 * O merge nao apaga nada: aponta os vinculos operacionais para o cadastro
 * mantido e desativa o duplicado, preservando a trilha. Onde ha restricao de
 * unicidade — participacao em projeto, alocacao na mesma atividade — a linha
 * repetida do duplicado e descartada, porque o cadastro mantido ja a possui.
 */
export async function resolveDuplicateAction(_state: DuplicateState, formData: FormData): Promise<DuplicateState> {
  const session = await requireAnyRole(["admin"]);
  const parsed = schema.safeParse({
    keepId: formData.get("keepId"), dropId: formData.get("dropId"),
    decision: formData.get("decision"), reason: formData.get("reason"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise a decisão." };
  const input = parsed.data;

  try {
    const result = await withTenant(session.organizationId, async (client) => {
      const existing = await client.query<{ id: string }>(
        "select id from rdo.collaborators where organization_id = $1 and id = any($2::uuid[]) for update",
        [session.organizationId, [input.keepId, input.dropId]],
      );
      if (existing.rows.length !== 2) return "not-found";

      if (input.decision === "merged") {
        const parametros = [session.organizationId, input.keepId, input.dropId];
        // Vinculos com unicidade por colaborador: mover so o que ainda nao existe.
        await client.query(
          `update rdo.project_members pm set collaborator_id = $2
            where pm.organization_id = $1 and pm.collaborator_id = $3
              and not exists (select 1 from rdo.project_members outro
                               where outro.organization_id = $1 and outro.project_id = pm.project_id
                                 and outro.collaborator_id = $2)`,
          parametros,
        );
        await client.query(
          "delete from rdo.project_members where organization_id = $1 and collaborator_id = $3",
          parametros,
        );
        await client.query(
          `update rdo.work_allocations a set collaborator_id = $2
            where a.organization_id = $1 and a.collaborator_id = $3
              and not exists (select 1 from rdo.work_allocations outra
                               where outra.activity_group_id = a.activity_group_id
                                 and outra.collaborator_id = $2)`,
          parametros,
        );
        await client.query(
          `update rdo.collaborator_external_refs er set collaborator_id = $2
            where er.organization_id = $1 and er.collaborator_id = $3
              and not exists (select 1 from rdo.collaborator_external_refs outra
                               where outra.organization_id = $1 and outra.connection_id = er.connection_id
                                 and outra.external_id = er.external_id and outra.collaborator_id = $2)`,
          parametros,
        );
        await client.query(
          "delete from rdo.collaborator_external_refs where organization_id = $1 and collaborator_id = $3",
          parametros,
        );
        for (const tabela of ["time_punches", "time_segments", "dimep_sync_issues", "leader_team_members", "work_assignments"]) {
          await client.query(
            `update rdo.${tabela} set collaborator_id = $2 where organization_id = $1 and collaborator_id = $3`,
            parametros,
          );
        }
        await client.query(
          `update rdo.collaborators set active = false, employment_status = 'inactive'
            where organization_id = $1 and id = $2`,
          [session.organizationId, input.dropId],
        );
        await client.query(
          "delete from rdo.collaborator_profile_overrides where organization_id = $1 and collaborator_id = $2",
          [session.organizationId, input.dropId],
        );
      }

      await client.query(
        `insert into rdo.collaborator_duplicate_reviews
          (organization_id, collaborator_id, duplicate_of_id, decision, reason, decided_by_user_id)
         values ($1,$2,$3,$4,$5,$6)
         on conflict (organization_id, collaborator_id, duplicate_of_id) do update
           set decision = excluded.decision, reason = excluded.reason,
               decided_by_user_id = excluded.decided_by_user_id, decided_at = now()`,
        [session.organizationId, input.keepId, input.dropId, input.decision, input.reason, session.userId],
      );
      await client.query(
        `insert into rdo.audit_events
          (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'collaborators',$3,$4,$5::jsonb,$6)`,
        [session.organizationId, session.userId, input.dropId,
          input.decision === "merged" ? "merge" : "review",
          JSON.stringify({ keepId: input.keepId, dropId: input.dropId, decision: input.decision }), input.reason],
      );
      return "ok";
    });

    if (result === "not-found") return { error: "Um dos cadastros não está mais disponível." };
    revalidatePath("/employees");
    revalidatePath("/hours");
    return {
      ok: input.decision === "merged"
        ? "Cadastros consolidados. O duplicado ficou inativo e o histórico foi transferido."
        : "Marcados como pessoas diferentes. O alerta não voltará para este par.",
    };
  } catch (error) {
    console.error("Falha ao resolver duplicidade de colaborador", error);
    return { error: "Não foi possível concluir. Nenhuma alteração foi gravada." };
  }
}
