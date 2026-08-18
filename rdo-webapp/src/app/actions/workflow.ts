"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { withTenant } from "@/lib/db";
import { requireAnyRole, type AppRole } from "@/lib/auth/session";

type Transition = "submitted" | "returned" | "approved" | "reviewed";

const allowedFrom: Record<Transition, string[]> = {
  submitted: ["draft", "returned"],
  returned: ["submitted", "approved"],
  approved: ["submitted"],
  reviewed: ["approved"],
};

async function transitionRdo(formData: FormData, transition: Transition, roles: AppRole[]) {
  const session = await requireAnyRole(roles);
  const rdoId = String(formData.get("rdoId") ?? "");
  const comment = String(formData.get("comment") ?? "").trim().slice(0, 1000);
  if (!/^[0-9a-f-]{36}$/i.test(rdoId)) redirect("/rdos");

  const result = await withTenant(session.organizationId, async (client) => {
    const current = await client.query<{ version_id: string; status: string; leader_user_id: string }>(
      `select v.id as version_id, v.status, v.leader_user_id
         from rdo.rdos r join rdo.rdo_versions v on v.id = r.current_version_id
        where r.organization_id = $1 and r.id = $2 for update of v`,
      [session.organizationId, rdoId],
    );
    const row = current.rows[0];
    if (!row || !allowedFrom[transition].includes(row.status)) return "invalid-status";
    const elevated = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
    if (transition === "submitted" && row.leader_user_id !== session.userId && !elevated) return "not-owner";
    if (transition === "returned" && !comment) return "comment-required";

    if (transition === "submitted") {
      const errors = await client.query("select 1 from rdo.submission_errors($1) limit 1", [row.version_id]);
      if (errors.rows[0]) return "blocked";
    }

    const timestampField = transition === "submitted" ? "submitted_at"
      : transition === "approved" ? "approved_at"
        : transition === "reviewed" ? "reviewed_at" : null;
    if (timestampField) {
      await client.query(`update rdo.rdo_versions set status = $1, ${timestampField} = now() where organization_id = $2 and id = $3`, [transition, session.organizationId, row.version_id]);
    } else {
      await client.query("update rdo.rdo_versions set status = $1 where organization_id = $2 and id = $3", [transition, session.organizationId, row.version_id]);
    }
    await client.query(
      `insert into rdo.workflow_actions
        (organization_id, rdo_version_id, action, actor_user_id, from_status, to_status, comment)
       values ($1,$2,$3,$4,$5,$6,$7)`,
      [session.organizationId, row.version_id, transition, session.userId, row.status, transition, comment || null],
    );
    await client.query(
      `insert into rdo.audit_events
        (organization_id, actor_user_id, entity_table, entity_id, action, old_data, new_data, reason)
       values ($1,$2,'rdo_versions',$3,'status_change',$4::jsonb,$5::jsonb,$6)`,
      [session.organizationId, session.userId, row.version_id, JSON.stringify({ status: row.status }), JSON.stringify({ status: transition }), comment || null],
    );
    return "ok";
  });

  revalidatePath("/");
  revalidatePath("/rdos");
  revalidatePath(`/rdos/${rdoId}`);
  redirect(`/rdos/${rdoId}?workflow=${result}`);
}

export async function submitRdoAction(formData: FormData) {
  return transitionRdo(formData, "submitted", ["leader", "foreman", "manager", "director", "admin"]);
}

export async function approveRdoAction(formData: FormData) {
  return transitionRdo(formData, "approved", ["foreman", "manager", "director", "admin"]);
}

export async function reviewRdoAction(formData: FormData) {
  return transitionRdo(formData, "reviewed", ["manager", "director", "admin"]);
}

export async function returnRdoAction(formData: FormData) {
  return transitionRdo(formData, "returned", ["foreman", "manager", "director", "admin"]);
}
