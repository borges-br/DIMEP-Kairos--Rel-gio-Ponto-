"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";

const schema = z.object({
  projectId: z.string().uuid(),
  code: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(250),
  startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().trim().min(10).max(1000),
});
const normalizedName = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();

export async function saveProjectForImuvAction(formData: FormData) {
  const session = await requireAnyRole(["director", "admin"]);
  const parsed = schema.safeParse({ projectId: formData.get("projectId"), code: formData.get("code"), name: formData.get("name"), startsOn: formData.get("startsOn"), reason: formData.get("reason") });
  if (!parsed.success) redirect(`/projects/${String(formData.get("projectId") || "")}?edit=invalid`);
  const input = parsed.data;
  const changed = await withTenant(session.organizationId, async (client) => {
    const previous = await client.query<{ value: unknown }>("select to_jsonb(p) as value from rdo.projects p where organization_id=$1 and id=$2 for update", [session.organizationId, input.projectId]);
    if (!previous.rows[0]) return false;
    const updated = await client.query<{ value: unknown }>(`update rdo.projects set code=$3,name=$4,normalized_name=$5,starts_on=$6
      where organization_id=$1 and id=$2 returning to_jsonb(projects) as value`, [session.organizationId, input.projectId, input.code, input.name, normalizedName(input.name), input.startsOn]);
    await client.query(`insert into rdo.audit_events (organization_id,actor_user_id,entity_table,entity_id,action,old_data,new_data,reason)
      values ($1,$2,'projects',$3,'update',$4::jsonb,$5::jsonb,$6)`, [session.organizationId, session.userId, input.projectId, JSON.stringify(previous.rows[0].value), JSON.stringify(updated.rows[0].value), input.reason]);
    return true;
  });
  if (!changed) redirect("/projects");
  revalidatePath("/projects"); revalidatePath(`/projects/${input.projectId}`); revalidatePath("/settings");
  redirect(`/projects/${input.projectId}?edit=ok`);
}
