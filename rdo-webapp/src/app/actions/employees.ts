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
  email: z.preprocess((value) => typeof value === "string" && value.trim() ? value.trim() : null, z.string().email().max(320).nullable()),
  phone: optionalOverride(50),
  activeOverride: z.preprocess((value) => value === "true" ? true : value === "false" ? false : null, z.boolean().nullable()),
  reason: z.string().trim().min(10).max(1000),
  removeOverride: z.boolean(),
});

export async function saveEmployeeCorrectionAction(formData: FormData) {
  const session = await requireAnyRole(["hr", "director", "admin"]);
  const parsed = correctionSchema.safeParse({
    collaboratorId: formData.get("collaboratorId"),
    fullName: formData.get("fullName"),
    employeeNumber: formData.get("employeeNumber"),
    jobTitle: formData.get("jobTitle"),
    department: formData.get("department"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    activeOverride: formData.get("activeOverride"),
    reason: formData.get("reason"),
    removeOverride: formData.get("removeOverride") === "on",
  });
  if (!parsed.success) redirect(`/employees/${String(formData.get("collaboratorId") || "")}?correction=invalid`);
  const input = parsed.data;
  if (!input.removeOverride && ![input.fullName, input.employeeNumber, input.jobTitle, input.department, input.email, input.phone].some(Boolean) && input.activeOverride === null) {
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
           job_title_override, department_override, email_override, phone_override,
           active_override, reason, updated_by_user_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         on conflict (organization_id, collaborator_id) do update set
           full_name_override = excluded.full_name_override,
           employee_number_override = excluded.employee_number_override,
           job_title_override = excluded.job_title_override,
           department_override = excluded.department_override,
           email_override = excluded.email_override,
           phone_override = excluded.phone_override,
           active_override = excluded.active_override,
           reason = excluded.reason,
           updated_by_user_id = excluded.updated_by_user_id`,
        [session.organizationId, input.collaboratorId, input.fullName, input.employeeNumber,
          input.jobTitle, input.department, input.email, input.phone, input.activeOverride, input.reason, session.userId],
      );
    }
    await client.query(
      `insert into rdo.audit_events
        (organization_id, actor_user_id, entity_table, entity_id, action, old_data, new_data, reason)
       values ($1,$2,'collaborator_profile_overrides',$3,$4,$5::jsonb,$6::jsonb,$7)`,
      [session.organizationId, session.userId, input.collaboratorId,
        input.removeOverride ? "delete" : previous.rows[0] ? "update" : "insert",
        previous.rows[0]?.value ? JSON.stringify(previous.rows[0].value) : null,
        input.removeOverride ? null : JSON.stringify({ fullName: input.fullName, employeeNumber: input.employeeNumber, jobTitle: input.jobTitle, department: input.department, email: input.email, phone: input.phone, active: input.activeOverride }),
        input.reason],
    );
    return true;
  });
  if (!changed) redirect("/employees?correction=not-found");
  revalidatePath("/employees");
  revalidatePath(`/employees/${input.collaboratorId}`);
  redirect(`/employees/${input.collaboratorId}?correction=ok`);
}

const accountSchema = z.object({
  collaboratorId: z.string().uuid(),
  userId: z.string().uuid(),
  displayName: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  phoneE164: z.preprocess((value) => typeof value === "string" && value.trim() ? value.trim() : null,
    z.string().regex(/^\+[1-9][0-9]{7,14}$/).nullable()),
  active: z.boolean(),
  reason: z.string().trim().min(10).max(1000),
});

export async function saveUserAccountAction(formData: FormData) {
  const session = await requireAnyRole(["hr", "director", "admin"]);
  const parsed = accountSchema.safeParse({
    collaboratorId: formData.get("collaboratorId"), userId: formData.get("userId"),
    displayName: formData.get("displayName"), email: formData.get("accountEmail"),
    phoneE164: formData.get("phoneE164"), active: formData.get("accountActive") === "on",
    reason: formData.get("accountReason"),
  });
  const collaboratorId = String(formData.get("collaboratorId") || "");
  if (!parsed.success) redirect(`/employees/${collaboratorId}?account=invalid`);
  const input = parsed.data;
  const changed = await withTenant(session.organizationId, async (client) => {
    const previous = await client.query(`select to_jsonb(u) as value from rdo.organization_users ou
      join rdo.app_users u on u.id=ou.user_id where ou.organization_id=$1 and ou.collaborator_id=$2 and ou.user_id=$3 for update`,
      [session.organizationId,input.collaboratorId,input.userId]);
    if(!previous.rows[0]) return false;
    await client.query(`update rdo.app_users set display_name=$2,email=$3,phone_e164=$4,active=$5 where id=$1`,
      [input.userId,input.displayName,input.email,input.phoneE164,input.active]);
    await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,old_data,new_data,reason)
      values ($1,$2,'app_users',$3,'update',$4::jsonb,$5::jsonb,$6)`,[session.organizationId,session.userId,input.userId,
      JSON.stringify(previous.rows[0].value),JSON.stringify({displayName:input.displayName,email:input.email,phoneE164:input.phoneE164,active:input.active}),input.reason]);
    return true;
  });
  if(!changed) redirect(`/employees/${input.collaboratorId}?account=not-found`);
  revalidatePath(`/employees/${input.collaboratorId}`);redirect(`/employees/${input.collaboratorId}?account=ok`);
}
