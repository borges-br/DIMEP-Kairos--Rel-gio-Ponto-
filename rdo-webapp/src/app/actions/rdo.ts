"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { withTenant } from "@/lib/db";
import { requireAnyRole } from "@/lib/auth/session";
import { maxEvidenceFiles } from "@/lib/media";

export type RdoFormState = { error?: string } | undefined;

const optionalText = (max: number) => z.preprocess(
  (value) => value == null ? "" : value,
  z.string().trim().max(max).default(""),
);
const optionalTime = z.string().refine((value) => value === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(value), "Horário inválido.");
const materialSchema = z.object({
  materialId: z.string().uuid(),
  movement: z.enum(["used", "received", "missing"]),
  quantity: z.number().min(0).max(99999999999),
  unit: z.string().trim().min(1).max(30),
});
const equipmentSchema = z.object({
  equipmentId: z.string().uuid(),
  usageMinutes: z.number().int().min(0).max(1440),
  downtimeMinutes: z.number().int().min(0).max(1440),
  downtimeReason: optionalText(500),
}).superRefine((value, context) => {
  if (value.downtimeMinutes > 0 && !value.downtimeReason) {
    context.addIssue({ code: "custom", path: ["downtimeReason"], message: "Informe o motivo da parada." });
  }
});
const activitySchema = z.object({
  taskId: z.string().uuid(),
  locationId: z.string().uuid(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  description: z.string().trim().min(10).max(2000),
  collaboratorIds: z.array(z.string().uuid()).min(1).max(80),
  quantity: z.number().min(0).max(99999999999).nullable(),
  unit: optionalText(30),
  progress: z.number().min(0).max(100).nullable(),
  divergenceReason: optionalText(1000),
  ptNumber: optionalText(100),
  ptOpenTime: optionalTime,
  ptCloseTime: optionalTime,
}).superRefine((value, context) => {
  if (value.quantity !== null && !value.unit) {
    context.addIssue({ code: "custom", path: ["unit"], message: "Informe a unidade da medição." });
  }
  if ((value.ptOpenTime || value.ptCloseTime) && !value.ptNumber) {
    context.addIssue({ code: "custom", path: ["ptNumber"], message: "Informe o número da PT quando houver abertura ou fechamento." });
  }
  if (value.ptCloseTime && !value.ptOpenTime) {
    context.addIssue({ code: "custom", path: ["ptOpenTime"], message: "Informe a abertura da PT antes do fechamento." });
  }
});

const rdoSchema = z.object({
  projectId: z.string().uuid(),
  workDate: z.string().date(),
  generalNotes: optionalText(4000),
  activities: z.array(activitySchema).min(1).max(12),
  ddsPerformed: z.boolean(),
  ppeCompliant: z.boolean(),
  unsafeConditionFound: z.boolean(),
  safetyDetails: optionalText(2000),
  correctiveAction: optionalText(2000),
  weatherCondition: optionalText(100),
  temperatureC: z.number().min(-30).max(60).nullable(),
  weatherImpacted: z.boolean(),
  weatherImpactDescription: optionalText(1000),
  materials: z.array(materialSchema).max(30),
  equipmentUsage: z.array(equipmentSchema).max(30),
  hasOccurrence: z.boolean(),
  occurrenceType: z.enum(["incident", "accident", "blockage", "near_miss", "other"]).nullable(),
  occurrenceSeverity: z.enum(["low", "medium", "high", "critical"]).nullable(),
  occurrenceTime: optionalText(5),
  occurrenceDescription: optionalText(2000),
  occurrenceAction: optionalText(2000),
  hasQuality: z.boolean(),
  qualityType: z.enum(["inspection", "test", "nonconformity"]).nullable(),
  qualityResult: z.enum(["approved", "rejected", "not_applicable", "pending"]).nullable(),
  qualityDescription: optionalText(2000),
  qualityCorrectiveAction: optionalText(2000),
  pendingItem: optionalText(2000),
  nextStep: optionalText(2000),
}).superRefine((value, context) => {
  if ((!value.ddsPerformed || !value.ppeCompliant || value.unsafeConditionFound) && !value.safetyDetails) {
    context.addIssue({ code: "custom", path: ["safetyDetails"], message: "Detalhe a resposta crítica de segurança." });
  }
  if (value.unsafeConditionFound && !value.correctiveAction) {
    context.addIssue({ code: "custom", path: ["correctiveAction"], message: "Informe a ação corretiva." });
  }
  if (value.weatherImpacted && !value.weatherImpactDescription) {
    context.addIssue({ code: "custom", path: ["weatherImpactDescription"], message: "Descreva o impacto do clima." });
  }
  if (value.hasOccurrence && (!value.occurrenceType || !value.occurrenceSeverity || !value.occurrenceTime || !value.occurrenceDescription || !value.occurrenceAction)) {
    context.addIssue({ code: "custom", path: ["hasOccurrence"], message: "Preencha todos os dados da ocorrência." });
  }
  if (value.hasQuality && (!value.qualityType || !value.qualityResult || !value.qualityDescription)) {
    context.addIssue({ code: "custom", path: ["hasQuality"], message: "Preencha os dados do registro de qualidade." });
  }
  if (value.qualityResult === "rejected" && !value.qualityCorrectiveAction) {
    context.addIssue({ code: "custom", path: ["qualityCorrectiveAction"], message: "Informe a ação corretiva da reprovação." });
  }
  const materialKeys = value.materials.map((item) => `${item.materialId}:${item.movement}`);
  if (new Set(materialKeys).size !== materialKeys.length) context.addIssue({ code: "custom", path: ["materials"], message: "Não repita o mesmo material e movimento." });
  const equipmentKeys = value.equipmentUsage.map((item) => item.equipmentId);
  if (new Set(equipmentKeys).size !== equipmentKeys.length) context.addIssue({ code: "custom", path: ["equipmentUsage"], message: "Não repita o mesmo equipamento." });
});

function nullableNumber(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim() === "") return null;
  const number = Number(value.replace(",", "."));
  return Number.isFinite(number) ? number : Number.NaN;
}

function checkbox(formData: FormData, name: string) {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

export async function createRdoAction(_state: RdoFormState, formData: FormData): Promise<RdoFormState> {
  const session = await requireAnyRole(["leader", "foreman", "manager", "director", "admin"]);
  let activities: unknown = null;
  let materials: unknown = null;
  let equipmentUsage: unknown = null;
  let evidenceMediaIds: unknown = null;
  try {
    activities = JSON.parse(String(formData.get("activities") ?? "null"));
    materials = JSON.parse(String(formData.get("materials") ?? "[]"));
    equipmentUsage = JSON.parse(String(formData.get("equipmentUsage") ?? "[]"));
    evidenceMediaIds = JSON.parse(String(formData.get("evidenceMediaIds") ?? "[]"));
  } catch {
    return { error: "As atividades enviadas estão inválidas. Recarregue a página." };
  }

  const parsed = rdoSchema.safeParse({
    projectId: formData.get("projectId"),
    workDate: formData.get("workDate"),
    generalNotes: formData.get("generalNotes"),
    activities,
    ddsPerformed: checkbox(formData, "ddsPerformed"),
    ppeCompliant: checkbox(formData, "ppeCompliant"),
    unsafeConditionFound: checkbox(formData, "unsafeConditionFound"),
    safetyDetails: formData.get("safetyDetails"),
    correctiveAction: formData.get("correctiveAction"),
    weatherCondition: formData.get("weatherCondition"),
    temperatureC: nullableNumber(formData.get("temperatureC")),
    weatherImpacted: checkbox(formData, "weatherImpacted"),
    weatherImpactDescription: formData.get("weatherImpactDescription"),
    materials,
    equipmentUsage,
    hasOccurrence: checkbox(formData, "hasOccurrence"),
    occurrenceType: formData.get("occurrenceType") || null,
    occurrenceSeverity: formData.get("occurrenceSeverity") || null,
    occurrenceTime: formData.get("occurrenceTime"),
    occurrenceDescription: formData.get("occurrenceDescription"),
    occurrenceAction: formData.get("occurrenceAction"),
    hasQuality: checkbox(formData, "hasQuality"),
    qualityType: formData.get("qualityType") || null,
    qualityResult: formData.get("qualityResult") || null,
    qualityDescription: formData.get("qualityDescription"),
    qualityCorrectiveAction: formData.get("qualityCorrectiveAction"),
    pendingItem: formData.get("pendingItem"),
    nextStep: formData.get("nextStep"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Revise os campos obrigatórios." };
  }

  const input = parsed.data;
  // As evidências já subiram por /api/media/staging enquanto o líder preenchia o
  // formulário; aqui chegam apenas os identificadores para criar o vínculo.
  const parsedEvidence = z.array(z.string().uuid()).max(maxEvidenceFiles).safeParse(evidenceMediaIds);
  const evidenceCaption = String(formData.get("evidenceCaption") || "").trim().slice(0, 500);
  if (!parsedEvidence.success) return { error: `Selecione no máximo ${maxEvidenceFiles} evidências por rascunho.` };
  // Arquivos idênticos compartilham o mesmo registro de mídia (deduplicação por sha256).
  const evidenceIds = [...new Set(parsedEvidence.data)];
  const requestHeaders = await headers();
  try {
    await withTenant(session.organizationId, async (client) => {
      const project = await client.query<{ id: string }>(
        `select p.id from rdo.projects p where p.organization_id = $1 and p.id = $2
          and p.active and p.status_normalized = 'active' for share`,
        [session.organizationId, input.projectId],
      );
      if (!project.rows[0]) throw new Error("PROJECT_NOT_ALLOWED");

      const allowedForLeader = session.roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role))
        || Boolean((await client.query(
          `select 1 from rdo.leader_team_members where organization_id = $1 and project_id = $2
            and leader_user_id = $3 and valid_from <= $4::date
            and (valid_until is null or valid_until >= $4::date) limit 1`,
          [session.organizationId, input.projectId, session.userId, input.workDate],
        )).rows[0]);
      if (!allowedForLeader) throw new Error("PROJECT_NOT_ALLOWED");

      const existing = await client.query(
        "select 1 from rdo.rdos where organization_id = $1 and project_id = $2 and work_date = $3 for update",
        [session.organizationId, input.projectId, input.workDate],
      );
      if (existing.rows[0]) throw new Error("RDO_ALREADY_EXISTS");

      const ids = new Set(input.activities.flatMap((activity) => [activity.taskId, activity.locationId, ...activity.collaboratorIds]));
      if (ids.size > 300) throw new Error("INVALID_SCOPE");
      for (const activity of input.activities) {
        const scope = await client.query(
          `select
             exists(select 1 from rdo.tasks where organization_id = $1 and id = $2 and project_id = $3 and active) as task_ok,
             exists(select 1 from rdo.work_locations where organization_id = $1 and id = $4 and project_id = $3 and active) as location_ok,
             (select count(*)::int from rdo.collaborators where organization_id = $1
                and id = any($5::uuid[]) and active) = cardinality($5::uuid[]) as members_ok`,
          [session.organizationId, activity.taskId, input.projectId, activity.locationId, activity.collaboratorIds],
        );
        const row = scope.rows[0] as { task_ok: boolean; location_ok: boolean; members_ok: boolean } | undefined;
        if (!row?.task_ok || !row.location_ok || !row.members_ok) throw new Error("INVALID_SCOPE");
      }
      const materialIds = input.materials.map((item) => item.materialId);
      if (materialIds.length) {
        const validMaterials = await client.query<{ count: number }>(
          "select count(*)::int as count from rdo.material_catalog where organization_id = $1 and id = any($2::uuid[]) and active",
          [session.organizationId, materialIds],
        );
        if (validMaterials.rows[0]?.count !== new Set(materialIds).size) throw new Error("INVALID_RESOURCE");
      }
      const equipmentIds = input.equipmentUsage.map((item) => item.equipmentId);
      if (equipmentIds.length) {
        const validEquipment = await client.query<{ count: number }>(
          "select count(*)::int as count from rdo.equipment_assets where organization_id = $1 and id = any($2::uuid[]) and active",
          [session.organizationId, equipmentIds],
        );
        if (validEquipment.rows[0]?.count !== new Set(equipmentIds).size) throw new Error("INVALID_RESOURCE");
      }

      const rdo = await client.query<{ id: string }>(
        "insert into rdo.rdos (organization_id, project_id, work_date) values ($1, $2, $3) returning id",
        [session.organizationId, input.projectId, input.workDate],
      );
      const rdoId = rdo.rows[0].id;
      const version = await client.query<{ id: string }>(
        `insert into rdo.rdo_versions
          (organization_id, rdo_id, version_number, leader_user_id, created_by_user_id, general_notes)
         values ($1, $2, 1, $3, $3, $4) returning id`,
        [session.organizationId, rdoId, session.userId, input.generalNotes || null],
      );
      const versionId = version.rows[0].id;

      for (const [index, activity] of input.activities.entries()) {
        const timestamps = await client.query<{ starts_at: Date; ends_at: Date }>(
          `select
             (($2::date + $3::time) at time zone timezone) as starts_at,
             ((case when $4::time <= $3::time then $2::date + 1 else $2::date end + $4::time) at time zone timezone) as ends_at
             from rdo.organizations where id = $1`,
          [session.organizationId, input.workDate, activity.startTime, activity.endTime],
        );
        const startsAt = timestamps.rows[0].starts_at;
        const endsAt = timestamps.rows[0].ends_at;
        const group = await client.query<{ id: string }>(
          `insert into rdo.rdo_activity_groups
            (organization_id, rdo_version_id, sequence_number, task_id, location_id,
             group_start_at, group_end_at, execution_description, quantity, unit,
             daily_progress_percent, created_by_user_id)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning id`,
          [session.organizationId, versionId, index + 1, activity.taskId, activity.locationId,
            startsAt, endsAt, activity.description, activity.quantity, activity.quantity === null ? null : activity.unit,
            activity.progress, session.userId],
        );

        if (activity.ptNumber || activity.ptOpenTime || activity.ptCloseTime) {
          const permitTimes = await client.query<{ opened_at: Date | null; closed_at: Date | null }>(
            `select
               case when $3::text = '' then null else (($2::date + $3::time) at time zone timezone) end as opened_at,
               case when $4::text = '' then null else
                 ((case when $3::text <> '' and $4::time <= $3::time then $2::date + 1 else $2::date end + $4::time) at time zone timezone) end as closed_at
               from rdo.organizations where id = $1`,
            [session.organizationId, input.workDate, activity.ptOpenTime, activity.ptCloseTime],
          );
          const permitStatus = activity.ptCloseTime ? "closed" : activity.ptOpenTime ? "open" : "not_started";
          await client.query(
            `insert into rdo.rdo_work_permits
              (organization_id, rdo_version_id, activity_group_id, permit_number, opened_at, closed_at, status, created_by_user_id)
             values ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [session.organizationId, versionId, group.rows[0].id, activity.ptNumber || null,
              permitTimes.rows[0].opened_at, permitTimes.rows[0].closed_at, permitStatus, session.userId],
          );
        }

        for (const collaboratorId of activity.collaboratorIds) {
          const coveringSegment = await client.query<{ id: string }>(
            `select id from rdo.time_segments
              where organization_id = $1 and collaborator_id = $2 and work_date = $3
                and segment_status = 'closed' and original_start_at <= $4 and original_end_at >= $5
              order by original_start_at limit 1`,
            [session.organizationId, collaboratorId, input.workDate, startsAt, endsAt],
          );
          const covered = coveringSegment.rows[0];
          if (!covered && !activity.divergenceReason) throw new Error("DIVERGENCE_REASON_REQUIRED");
          const allocation = await client.query<{ id: string }>(
            `insert into rdo.work_allocations
              (organization_id, rdo_version_id, activity_group_id, collaborator_id,
               original_start_at, original_end_at, declared_start_at, declared_end_at)
             values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`,
            [session.organizationId, versionId, group.rows[0].id, collaboratorId,
              covered ? startsAt : null, covered ? endsAt : null, startsAt, endsAt],
          );
          if (covered) {
            await client.query(
              "insert into rdo.allocation_time_segments (organization_id, allocation_id, time_segment_id) values ($1,$2,$3)",
              [session.organizationId, allocation.rows[0].id, covered.id],
            );
          } else {
            await client.query(
              `insert into rdo.time_divergences
                (organization_id, allocation_id, divergence_type, justification, created_by_user_id)
               values ($1,$2,'missing_punch',$3,$4)`,
              [session.organizationId, allocation.rows[0].id, activity.divergenceReason, session.userId],
            );
          }
        }
      }

      await client.query(
        `insert into rdo.rdo_safety_checklists
          (rdo_version_id, organization_id, dds_performed, ppe_compliant, unsafe_condition_found,
           details, corrective_action, created_by_user_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [versionId, session.organizationId, input.ddsPerformed, input.ppeCompliant, input.unsafeConditionFound,
          input.safetyDetails || null, input.correctiveAction || null, session.userId],
      );

      if (input.weatherCondition || input.temperatureC !== null || input.weatherImpacted) {
        await client.query(
          `insert into rdo.rdo_conditions
            (rdo_version_id, organization_id, weather_condition, temperature_c, impacted_execution, impact_description)
           values ($1,$2,$3,$4,$5,$6)`,
          [versionId, session.organizationId, input.weatherCondition || null, input.temperatureC,
            input.weatherImpacted, input.weatherImpactDescription || null],
        );
      }
      for (const material of input.materials) {
        await client.query(
          `insert into rdo.rdo_material_entries
            (organization_id, rdo_version_id, material_id, movement_type, quantity, unit)
           values ($1,$2,$3,$4,$5,$6)`,
          [session.organizationId, versionId, material.materialId, material.movement, material.quantity, material.unit],
        );
      }
      for (const equipment of input.equipmentUsage) {
        await client.query(
          `insert into rdo.rdo_equipment_usage
            (organization_id, rdo_version_id, equipment_id, usage_minutes, downtime_minutes, downtime_reason)
           values ($1,$2,$3,$4,$5,$6)`,
          [session.organizationId, versionId, equipment.equipmentId, equipment.usageMinutes,
            equipment.downtimeMinutes, equipment.downtimeReason || null],
        );
      }
      let occurrenceId: string | null = null;
      if (input.hasOccurrence) {
        const occurredAt = await client.query<{ occurred_at: Date }>(
          `select (($2::date + $3::time) at time zone timezone) as occurred_at
             from rdo.organizations where id = $1`,
          [session.organizationId, input.workDate, input.occurrenceTime],
        );
        const occurrence = await client.query<{ id: string }>(
          `insert into rdo.rdo_occurrences
            (organization_id, rdo_version_id, occurrence_type, severity, occurred_at,
             description, immediate_action, created_by_user_id)
           values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`,
          [session.organizationId, versionId, input.occurrenceType, input.occurrenceSeverity,
            occurredAt.rows[0].occurred_at, input.occurrenceDescription, input.occurrenceAction, session.userId],
        );
        occurrenceId = occurrence.rows[0].id;
      }
      if (input.hasQuality) {
        await client.query(
          `insert into rdo.rdo_quality_records
            (organization_id, rdo_version_id, record_type, description, result, corrective_action, created_by_user_id)
           values ($1,$2,$3,$4,$5,$6,$7)`,
          [session.organizationId, versionId, input.qualityType, input.qualityDescription,
            input.qualityResult, input.qualityCorrectiveAction || null, session.userId],
        );
      }
      for (const [type, description] of [["pending_item", input.pendingItem], ["next_step", input.nextStep]] as const) {
        if (description) {
          await client.query(
            "insert into rdo.rdo_followups (organization_id, rdo_version_id, followup_type, description) values ($1,$2,$3,$4)",
            [session.organizationId, versionId, type, description],
          );
        }
      }

      if (evidenceIds.length) {
        // Só entram as mídias que este usuário acabou de enviar e que ainda não
        // pertencem a nenhum RDO, para que um id copiado não vincule evidência alheia.
        const owned = await client.query<{ id: string }>(
          `select m.id from rdo.media_files m
            where m.organization_id = $1 and m.id = any($2::uuid[])
              and m.uploaded_by_user_id = $3
              and not exists (select 1 from rdo.evidence_links e where e.media_file_id = m.id)`,
          [session.organizationId, evidenceIds, session.userId],
        );
        if (owned.rows.length !== evidenceIds.length) throw new Error("EVIDENCE_NOT_AVAILABLE");
        for (const media of owned.rows) {
          await client.query(
            `insert into rdo.evidence_links (organization_id, media_file_id, rdo_version_id, caption)
             values ($1,$2,$3,$4) on conflict do nothing`,
            [session.organizationId, media.id, versionId, evidenceCaption || null],
          );
          if (occurrenceId) {
            await client.query(
              `insert into rdo.evidence_links (organization_id, media_file_id, occurrence_id, caption)
               values ($1,$2,$3,$4) on conflict do nothing`,
              [session.organizationId, media.id, occurrenceId, evidenceCaption || null],
            );
          }
        }
      }

      await client.query("update rdo.rdos set current_version_id = $1 where organization_id = $2 and id = $3", [versionId, session.organizationId, rdoId]);
      await client.query(
        `insert into rdo.audit_events
          (organization_id, actor_user_id, entity_table, entity_id, action, new_data, request_id, source_ip, user_agent)
         values ($1,$2,'rdos',$3,'insert',$4::jsonb,$5,$6,$7)`,
        [session.organizationId, session.userId, rdoId,
          JSON.stringify({ projectId: input.projectId, workDate: input.workDate, activityCount: input.activities.length, evidenceCount: evidenceIds.length }),
          requestHeaders.get("x-request-id"), requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
          requestHeaders.get("user-agent")?.slice(0, 500) || null],
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "RDO_ALREADY_EXISTS") return { error: "Já existe um RDO para este projeto e data." };
      if (error.message === "PROJECT_NOT_ALLOWED") return { error: "Você não tem acesso a este projeto." };
      if (error.message === "INVALID_SCOPE") return { error: "Tarefa/local não pertence ao projeto ou há um funcionário inativo na equipe." };
      if (error.message === "INVALID_RESOURCE") return { error: "Um material ou equipamento não pertence ao catálogo ativo." };
      if (error.message === "DIVERGENCE_REASON_REQUIRED") return { error: "Informe a justificativa de horário: não há cobertura DIMEP para toda a atividade." };
      if (error.message === "EVIDENCE_NOT_AVAILABLE") return { error: "Uma das evidências não está mais disponível. Envie as fotos e áudios novamente." };
    }
    console.error("Falha ao criar RDO", error);
    return { error: "Não foi possível salvar o RDO. Nenhum dado parcial foi gravado." };
  }

  revalidatePath("/");
  revalidatePath("/rdos");
  revalidatePath("/hours");
  redirect("/rdos?created=1");
}
