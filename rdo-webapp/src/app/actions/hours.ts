"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";
import { runHoursSync } from "@/lib/sync-scheduler";

export type HoursReviewState = { ok?: string; error?: string } | undefined;

const reviewSchema = z.object({
  id: z.string().uuid(),
  decision: z.enum(["accepted", "correction_requested", "waived"]),
  note: z.string().trim().min(5, "Explique a decisão em pelo menos 5 caracteres.").max(1000),
});

export async function reviewHoursDivergenceAction(_state: HoursReviewState, formData: FormData): Promise<HoursReviewState> {
  const session = await requireAnyRole(["leader", "foreman", "manager", "director", "admin"]);
  const parsed = reviewSchema.safeParse({ id: formData.get("id"), decision: formData.get("decision"), note: formData.get("note") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise a decisão." };
  const input = parsed.data;

  try {
    const result = await withTenant(session.organizationId, async (client) => {
      if (input.decision === "waived") {
        const issue = await client.query<{ id: string }>(
          `select id from rdo.dimep_sync_issues
            where organization_id = $1 and id = $2 and resolution_status = 'open' for update`,
          [session.organizationId, input.id],
        );
        if (!issue.rows[0]) return "not-found";
        await client.query(
          `update rdo.dimep_sync_issues
              set resolution_status = 'waived', resolved_at = now(),
                  details = details || jsonb_build_object('resolution_note',$3::text,'resolved_by_user_id',$4::text)
            where organization_id = $1 and id = $2`,
          [session.organizationId, input.id, input.note, session.userId],
        );
        await client.query(
          `insert into rdo.audit_events
            (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason)
           values ($1,$2,'dimep_sync_issues',$3,'waive',$4::jsonb,$5)`,
          [session.organizationId, session.userId, input.id, JSON.stringify({ resolutionStatus: "waived" }), input.note],
        );
        return "waived";
      }

      const divergence = await client.query<{ id: string; version_id: string; leader_user_id: string; version_status: string }>(
        `select d.id, v.id as version_id, v.leader_user_id, v.status as version_status
           from rdo.time_divergences d
           join rdo.work_allocations a on a.id = d.allocation_id
           join rdo.rdo_versions v on v.id = a.rdo_version_id
          where d.organization_id = $1 and d.id = $2 and d.review_status <> 'accepted'
          for update of d, v`,
        [session.organizationId, input.id],
      );
      const row = divergence.rows[0];
      if (!row) return "not-found";
      const elevated = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
      if (!elevated && row.leader_user_id !== session.userId) return "forbidden";

      const nextStatus = input.decision === "accepted" ? "accepted" : "rejected";
      await client.query(
        `update rdo.time_divergences
            set review_status = $3, reviewed_by_user_id = $4, reviewed_at = now()
          where organization_id = $1 and id = $2`,
        [session.organizationId, input.id, nextStatus, session.userId],
      );

      if (input.decision === "correction_requested" && ["submitted", "approved"].includes(row.version_status)) {
        await client.query(
          "update rdo.rdo_versions set status = 'returned', time_reconciled_at = null where organization_id = $1 and id = $2",
          [session.organizationId, row.version_id],
        );
        await client.query(
          `insert into rdo.workflow_actions
            (organization_id,rdo_version_id,action,actor_user_id,from_status,to_status,comment)
           values ($1,$2,'returned',$3,$4,'returned',$5)`,
          [session.organizationId, row.version_id, session.userId, row.version_status, input.note],
        );
      }

      if (input.decision === "accepted") {
        await client.query(
          `update rdo.rdo_versions v set time_reconciled_at = case when
             not exists (
               select 1 from rdo.time_divergences d
               join rdo.work_allocations a on a.id = d.allocation_id
               where a.rdo_version_id = v.id and d.review_status <> 'accepted'
             ) and not exists (
               select 1 from rdo.time_exceptions e
               where e.rdo_version_id = v.id and e.resolution_status = 'open'
             ) then now() else null end
           where v.organization_id = $1 and v.id = $2`,
          [session.organizationId, row.version_id],
        );
      }

      await client.query(
        `insert into rdo.audit_events
          (organization_id,actor_user_id,entity_table,entity_id,action,new_data,reason)
         values ($1,$2,'time_divergences',$3,'review',$4::jsonb,$5)`,
        [session.organizationId, session.userId, input.id, JSON.stringify({ reviewStatus: nextStatus }), input.note],
      );
      return nextStatus;
    });
    if (result === "not-found") return { error: "A divergência já foi tratada ou não existe." };
    if (result === "forbidden") return { error: "Você não pode revisar o RDO de outro líder." };
    revalidatePath("/hours");
    revalidatePath("/rdos");
    return { ok: result === "accepted" ? "Divergência aceita e conciliação atualizada." : result === "waived" ? "Ocorrência DIMEP dispensada com justificativa." : "Correção solicitada ao responsável pelo RDO." };
  } catch (error) {
    console.error("Falha ao revisar divergência", error);
    return { error: "Não foi possível registrar a revisão." };
  }
}

export type HoursSyncState = { ok?: string; error?: string } | undefined;

/**
 * "Sincronizar agora": importa as batidas do periodo recente e reprograma o
 * proximo disparo automatico para dali a um intervalo cheio.
 */
export async function syncHoursNowAction(): Promise<HoursSyncState> {
  const session = await requireAnyRole(["foreman", "manager", "director", "admin"]);
  try {
    const result = await runHoursSync(session.organizationId, "manual");
    revalidatePath("/hours");
    revalidatePath("/employees");
    if (result.skipped) return { error: result.message };
    if (result.status === "failed") return { error: result.message };
    return { ok: result.message };
  } catch (error) {
    console.error("Falha ao sincronizar apontamentos", error);
    return { error: "Não foi possível sincronizar com o DIMEP agora." };
  }
}
