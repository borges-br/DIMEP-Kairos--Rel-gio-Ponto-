"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";

const optionalOverride = (max: number) => z.preprocess(
  (value) => typeof value === "string" && value.trim() ? value.trim() : null,
  z.string().max(max).nullable(),
);

const correctionSchema = z.object({
  collaboratorId: z.string().uuid(),
  fullName: optionalOverride(200),
  employeeNumber: optionalOverride(100),
  jobTitle: optionalOverride(150),
  department: optionalOverride(150),
  reason: z.string().trim().min(10).max(1000),
  removeOverride: z.boolean(),
});

export async function saveEmployeeCorrectionAction(formData: FormData) {
  const session = await requireAnyRole(["director", "admin"]);
  const parsed = correctionSchema.safeParse({
    collaboratorId: formData.get("collaboratorId"),
    fullName: formData.get("fullName"),
    employeeNumber: formData.get("employeeNumber"),
    jobTitle: formData.get("jobTitle"),
    department: formData.get("department"),
    reason: formData.get("reason"),
    removeOverride: formData.get("removeOverride") === "on",
  });
  if (!parsed.success) redirect(`/employees/${String(formData.get("collaboratorId") || "")}?correction=invalid`);
  const input = parsed.data;
  if (!input.removeOverride && ![input.fullName, input.employeeNumber, input.jobTitle, input.department].some(Boolean)) {
    redirect(`/employees/${input.collaboratorId}?correction=empty`);
  }

  const changed = await withTenant(session.organizationId, async (client) => {
    const collaborator = await client.query(
      "select 1 from rdo.collaborators where organization_id = $1 and id = $2 for share",
      [session.organizationId, input.collaboratorId],
    );
    if (!collaborator.rows[0]) return false;
    const previous = await client.query(
      "select to_jsonb(o) as value from rdo.collaborator_profile_overrides o where organization_id = $1 and collaborator_id = $2",
      [session.organizationId, input.collaboratorId],
    );
    if (input.removeOverride) {
      await client.query(
        "delete from rdo.collaborator_profile_overrides where organization_id = $1 and collaborator_id = $2",
        [session.organizationId, input.collaboratorId],
      );
    } else {
      await client.query(
        `insert into rdo.collaborator_profile_overrides
          (organization_id, collaborator_id, full_name_override, employee_number_override,
           job_title_override, department_override, reason, updated_by_user_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8)
         on conflict (organization_id, collaborator_id) do update set
           full_name_override = excluded.full_name_override,
           employee_number_override = excluded.employee_number_override,
           job_title_override = excluded.job_title_override,
           department_override = excluded.department_override,
           reason = excluded.reason,
           updated_by_user_id = excluded.updated_by_user_id`,
        [session.organizationId, input.collaboratorId, input.fullName, input.employeeNumber,
          input.jobTitle, input.department, input.reason, session.userId],
      );
    }
    await client.query(
      `insert into rdo.audit_events
        (organization_id, actor_user_id, entity_table, entity_id, action, old_data, new_data, reason)
       values ($1,$2,'collaborator_profile_overrides',$3,$4,$5::jsonb,$6::jsonb,$7)`,
      [session.organizationId, session.userId, input.collaboratorId,
        input.removeOverride ? "delete" : previous.rows[0] ? "update" : "insert",
        previous.rows[0]?.value ? JSON.stringify(previous.rows[0].value) : null,
        input.removeOverride ? null : JSON.stringify({ fullName: input.fullName, employeeNumber: input.employeeNumber, jobTitle: input.jobTitle, department: input.department }),
        input.reason],
    );
    return true;
  });
  if (!changed) redirect("/employees?correction=not-found");
  revalidatePath("/employees");
  revalidatePath(`/employees/${input.collaboratorId}`);
  redirect(`/employees/${input.collaboratorId}?correction=ok`);
}
