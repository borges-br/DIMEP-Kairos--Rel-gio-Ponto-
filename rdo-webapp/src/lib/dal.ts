import "server-only";

import { withTenant } from "@/lib/db";
import { getSafeIntegrationConfiguration } from "@/lib/integrations/config";
import { requireSession } from "@/lib/auth/session";

function canSeeAllProjects(roles: string[]) {
  return roles.some((role) => ["foreman", "manager", "director", "admin"].includes(role));
}

export async function getDashboardData() {
  const session = await requireSession();
  return withTenant(session.organizationId, async (client) => {
    const overview = await client.query<{
      active_projects: string;
      open_rdos: string;
      pending_approvals: string;
      open_exceptions: string;
    }>(
      `select
        (select count(*) from rdo.projects where organization_id = $1 and active and status_normalized = 'active')::text as active_projects,
        (select count(*) from rdo.rdos r join rdo.rdo_versions v on v.id = r.current_version_id
          where r.organization_id = $1 and v.status in ('draft','returned'))::text as open_rdos,
        (select count(*) from rdo.rdos r join rdo.rdo_versions v on v.id = r.current_version_id
          where r.organization_id = $1 and v.status = 'submitted')::text as pending_approvals,
        (select count(*) from rdo.time_exceptions where organization_id = $1 and resolution_status = 'open')::text as open_exceptions`,
      [session.organizationId],
    );
    const recent = await client.query<{
      id: string;
      project_code: string;
      project_name: string;
      work_date: string;
      status: string;
    }>(
      `select r.id, p.code as project_code, p.name as project_name,
              r.work_date::text, v.status
         from rdo.rdos r
         join rdo.projects p on p.id = r.project_id
         join rdo.rdo_versions v on v.id = r.current_version_id
        where r.organization_id = $1
        order by r.work_date desc, v.updated_at desc
        limit 5`,
      [session.organizationId],
    );
    return { session, overview: overview.rows[0], recent: recent.rows };
  });
}

export async function getProjects() {
  const session = await requireSession();
  const allProjects = canSeeAllProjects(session.roles);
  return withTenant(session.organizationId, async (client) => {
    const result = await client.query<{
      id: string;
      code: string;
      name: string;
      client_name: string;
      status: string;
      task_count: string;
      member_count: string;
    }>(
      `select p.id, p.code, p.name, c.legal_name as client_name,
              p.status_normalized as status,
              count(distinct t.id) filter (where t.active)::text as task_count,
              count(distinct pm.collaborator_id) filter (where pm.active)::text as member_count
         from rdo.projects p
         join rdo.clients c on c.id = p.client_id
         left join rdo.tasks t on t.project_id = p.id
         left join rdo.project_members pm on pm.project_id = p.id
        where p.organization_id = $1 and p.active
          and ($2::boolean or exists (
            select 1 from rdo.leader_team_members ltm
             where ltm.project_id = p.id and ltm.leader_user_id = $3
               and ltm.valid_from <= current_date
               and (ltm.valid_until is null or ltm.valid_until >= current_date)
          ))
        group by p.id, p.code, p.name, c.legal_name, p.status_normalized
        order by p.name`,
      [session.organizationId, allProjects, session.userId],
    );
    return { session, projects: result.rows };
  });
}

export async function getProjectDetail(projectId: string) {
  const session = await requireSession();
  if (!/^[0-9a-f-]{36}$/i.test(projectId)) return null;
  const allProjects = canSeeAllProjects(session.roles);
  return withTenant(session.organizationId, async (client) => {
    const project = await client.query<{ id: string; code: string; name: string; starts_on: string | null; client_name: string }>(
      `select p.id, p.code, p.name, p.starts_on, c.legal_name as client_name
         from rdo.projects p join rdo.clients c on c.id = p.client_id
        where p.organization_id = $1 and p.id = $2 and p.active
          and ($3::boolean or exists (
            select 1 from rdo.leader_team_members ltm
             where ltm.project_id = p.id and ltm.leader_user_id = $4
               and ltm.valid_from <= current_date
               and (ltm.valid_until is null or ltm.valid_until >= current_date)
          ))`,
      [session.organizationId, projectId, allProjects, session.userId],
    );
    if (!project.rows[0]) return null;
    const [tasks, members] = await Promise.all([
      client.query<{ id: string; code: string; name: string; description: string | null }>(
        `select id, code, name, description from rdo.tasks
          where organization_id = $1 and project_id = $2 and active
            and status_normalized in ('planned','active','blocked') order by code, name`,
        [session.organizationId, projectId],
      ),
      client.query<{ id: string; name: string; job_title: string | null }>(
        `select c.id, c.full_name as name, c.job_title
           from rdo.project_members pm join rdo.collaborators c on c.id = pm.collaborator_id
          where pm.organization_id = $1 and pm.project_id = $2 and pm.active and c.active
          order by c.full_name`,
        [session.organizationId, projectId],
      ),
    ]);
    return { session, project: project.rows[0], tasks: tasks.rows, members: members.rows };
  });
}

export async function getRdos() {
  const session = await requireSession();
  return withTenant(session.organizationId, async (client) => {
    const result = await client.query<{
      id: string;
      project_code: string;
      project_name: string;
      work_date: string;
      version_number: number;
      status: string;
      leader_name: string;
      allocation_count: string;
    }>(
      `select r.id, p.code as project_code, p.name as project_name, r.work_date::text,
              v.version_number, v.status, u.display_name as leader_name,
              count(a.id) filter (where a.allocation_status = 'active')::text as allocation_count
         from rdo.rdos r
         join rdo.projects p on p.id = r.project_id
         join rdo.rdo_versions v on v.id = r.current_version_id
         join rdo.app_users u on u.id = v.leader_user_id
         left join rdo.work_allocations a on a.rdo_version_id = v.id
        where r.organization_id = $1
        group by r.id, p.code, p.name, r.work_date, v.version_number, v.status, u.display_name
        order by r.work_date desc, p.name`,
      [session.organizationId],
    );
    return { session, rdos: result.rows };
  });
}

export async function getRdoDetail(rdoId: string) {
  const session = await requireSession();
  if (!/^[0-9a-f-]{36}$/i.test(rdoId)) return null;
  return withTenant(session.organizationId, async (client) => {
    const header = await client.query<{
      id: string; project_id: string; project_code: string; project_name: string; client_name: string;
      work_date: string; version_id: string; version_number: number; status: string; leader_name: string;
      general_notes: string | null; time_reconciled_at: Date | null;
    }>(
      `select r.id, r.project_id, p.code as project_code, p.name as project_name,
              c.legal_name as client_name, r.work_date::text, v.id as version_id,
              v.version_number, v.status, u.display_name as leader_name,
              v.general_notes, v.time_reconciled_at
         from rdo.rdos r
         join rdo.projects p on p.id = r.project_id
         join rdo.clients c on c.id = p.client_id
         join rdo.rdo_versions v on v.id = r.current_version_id
         join rdo.app_users u on u.id = v.leader_user_id
        where r.organization_id = $1 and r.id = $2`,
      [session.organizationId, rdoId],
    );
    const rdo = header.rows[0];
    if (!rdo) return null;

    const [activities, safety, conditions, occurrences, quality, followups, media, blockers] = await Promise.all([
      client.query<{
        id: string; sequence_number: number; task_code: string; task_name: string; location_label: string;
        starts_at: string; ends_at: string; execution_description: string; quantity: string | null;
        unit: string | null; daily_progress_percent: string | null; member_count: string; member_names: string | null;
        permit_number: string | null; permit_status: string | null; permit_opened_at: string | null; permit_closed_at: string | null;
      }>(
        `select g.id, g.sequence_number, t.code as task_code, t.name as task_name, l.label as location_label,
                to_char(g.group_start_at at time zone o.timezone, 'HH24:MI') as starts_at,
                to_char(g.group_end_at at time zone o.timezone, 'HH24:MI') as ends_at,
                g.execution_description, g.quantity::text, g.unit, g.daily_progress_percent::text,
                count(a.id) filter (where a.allocation_status = 'active')::text as member_count,
                string_agg(distinct c.full_name, ', ' order by c.full_name)
                  filter (where a.allocation_status = 'active') as member_names,
                wp.permit_number, wp.status as permit_status,
                to_char(wp.opened_at at time zone o.timezone, 'HH24:MI') as permit_opened_at,
                to_char(wp.closed_at at time zone o.timezone, 'HH24:MI') as permit_closed_at
           from rdo.rdo_activity_groups g
           join rdo.rdo_versions v on v.id = g.rdo_version_id
           join rdo.organizations o on o.id = g.organization_id
           join rdo.tasks t on t.id = g.task_id
           join rdo.work_locations l on l.id = g.location_id
           left join rdo.work_allocations a on a.activity_group_id = g.id
           left join rdo.collaborators c on c.id = a.collaborator_id
           left join rdo.rdo_work_permits wp on wp.activity_group_id = g.id
          where g.organization_id = $1 and g.rdo_version_id = $2
          group by g.id, t.code, t.name, l.label, o.timezone, wp.permit_number, wp.status, wp.opened_at, wp.closed_at order by g.sequence_number`,
        [session.organizationId, rdo.version_id],
      ),
      client.query<{ dds_performed: boolean; ppe_compliant: boolean; unsafe_condition_found: boolean; details: string | null; corrective_action: string | null }>(
        "select dds_performed, ppe_compliant, unsafe_condition_found, details, corrective_action from rdo.rdo_safety_checklists where organization_id = $1 and rdo_version_id = $2",
        [session.organizationId, rdo.version_id],
      ),
      client.query<{ weather_condition: string | null; temperature_c: string | null; impacted_execution: boolean; impact_description: string | null }>(
        "select weather_condition, temperature_c::text, impacted_execution, impact_description from rdo.rdo_conditions where organization_id = $1 and rdo_version_id = $2",
        [session.organizationId, rdo.version_id],
      ),
      client.query<{ occurrence_type: string; severity: string; description: string; immediate_action: string; status: string }>(
        "select occurrence_type, severity, description, immediate_action, status from rdo.rdo_occurrences where organization_id = $1 and rdo_version_id = $2 order by occurred_at",
        [session.organizationId, rdo.version_id],
      ),
      client.query<{ record_type: string; description: string; result: string; corrective_action: string | null }>(
        "select record_type, description, result, corrective_action from rdo.rdo_quality_records where organization_id = $1 and rdo_version_id = $2 order by created_at",
        [session.organizationId, rdo.version_id],
      ),
      client.query<{ followup_type: string; description: string; status: string }>(
        "select followup_type, description, status from rdo.rdo_followups where organization_id = $1 and rdo_version_id = $2 order by created_at",
        [session.organizationId, rdo.version_id],
      ),
      client.query<{
        id: string; original_filename: string; mime_type: string; size_bytes: string;
        captured_at: Date | null; caption: string | null; activity_group_id: string | null;
        transcription_status: string | null; transcription_text: string | null;
      }>(
        `select distinct m.id, m.original_filename, m.mime_type, m.size_bytes::text,
                m.captured_at, e.caption, e.activity_group_id,
                mt.status as transcription_status, mt.transcription_text
           from rdo.media_files m
           join rdo.evidence_links e on e.media_file_id = m.id
           left join rdo.rdo_activity_groups g on g.id = e.activity_group_id
           left join rdo.media_transcriptions mt on mt.media_file_id = m.id
          where m.organization_id = $1
            and (e.rdo_version_id = $2 or g.rdo_version_id = $2)
          order by m.captured_at desc nulls last, m.id`,
        [session.organizationId, rdo.version_id],
      ),
      client.query<{ error_code: string; error_message: string }>(
        "select error_code, error_message from rdo.submission_errors($1)",
        [rdo.version_id],
      ),
    ]);
    return {
      session,
      rdo,
      activities: activities.rows,
      safety: safety.rows[0] ?? null,
      conditions: conditions.rows[0] ?? null,
      occurrences: occurrences.rows,
      quality: quality.rows,
      followups: followups.rows,
      media: media.rows,
      blockers: blockers.rows,
    };
  });
}

export async function getHoursOverview() {
  const session = await requireSession();
  return withTenant(session.organizationId, async (client) => {
    const result = await client.query<{
      work_date: string;
      collaborator_name: string;
      total_minutes: number;
      allocation_count: string;
      divergence_count: string;
      source: "rdo" | "dimep";
      status: string;
    }>(
      `with allocated as (
         select r.work_date, c.id as collaborator_id, c.full_name as collaborator_name,
                round(sum(extract(epoch from (a.declared_end_at - a.declared_start_at)) / 60))::int as total_minutes,
                count(distinct a.id)::text as allocation_count,
                count(distinct d.id)::text as divergence_count,
                'rdo'::text as source, max(v.status)::text as status
           from rdo.work_allocations a
           join rdo.rdo_versions v on v.id = a.rdo_version_id
           join rdo.rdos r on r.id = v.rdo_id
           join rdo.collaborators c on c.id = a.collaborator_id
           left join rdo.time_divergences d on d.allocation_id = a.id and d.review_status = 'pending'
          where a.organization_id = $1 and a.allocation_status = 'active'
          group by r.work_date, c.id, c.full_name
       ), punched as (
         select ts.work_date, c.id as collaborator_id, c.full_name as collaborator_name,
                round(sum(extract(epoch from (ts.original_end_at - ts.original_start_at)) / 60))::int as total_minutes,
                count(distinct ts.id)::text as allocation_count,
                (select count(*)::text from rdo.dimep_sync_issues di
                  where di.organization_id=$1 and di.collaborator_id=ts.collaborator_id
                    and di.work_date=ts.work_date and di.resolution_status='open') as divergence_count,
                'dimep'::text as source, 'awaiting_rdo'::text as status
           from rdo.time_segments ts
           join rdo.collaborators c on c.id = ts.collaborator_id
          where ts.organization_id = $1 and ts.segment_status = 'closed'
            and not exists (
              select 1 from allocated a
               where a.work_date = ts.work_date and a.collaborator_id = ts.collaborator_id
            )
          group by ts.work_date, ts.collaborator_id, c.id, c.full_name
       )
       select work_date::text, collaborator_name, total_minutes, allocation_count,
              divergence_count, source, status
         from (select * from allocated union all select * from punched) overview
        order by work_date desc, collaborator_name
        limit 100`,
      [session.organizationId],
    );
    const exportable = await client.query<{ count: string }>(
      "select count(*)::text from rdo.v_imuv_timer_candidates where organization_id = $1",
      [session.organizationId],
    );
    return { session, rows: result.rows, exportableCount: Number(exportable.rows[0]?.count ?? 0) };
  });
}

export async function getSettingsData() {
  const session = await requireSession();
  const env = getSafeIntegrationConfiguration();
  return withTenant(session.organizationId, async (client) => {
    const result = await client.query<{
      provider: "imuv" | "dimep";
      enabled: boolean;
      last_success_at: Date | null;
      last_status: string | null;
      last_finished_at: Date | null;
    }>(
      `select ic.provider, ic.enabled, ic.last_success_at,
              sr.status as last_status, sr.finished_at as last_finished_at
         from rdo.integration_connections ic
         left join lateral (
           select status, finished_at from rdo.sync_runs
            where connection_id = ic.id order by created_at desc limit 1
         ) sr on true
        where ic.organization_id = $1
        order by ic.provider`,
      [session.organizationId],
    );
    return { session, env, connections: result.rows };
  });
}

export type RdoFormProject = {
  id: string;
  code: string;
  name: string;
  tasks: { id: string; code: string; name: string; assigneeIds: string[] }[];
  locations: { id: string; label: string }[];
  members: { id: string; name: string; jobTitle: string | null }[];
  collaborators: { id: string; name: string; jobTitle: string | null; projectMember: boolean }[];
};

export type RdoCatalogOption = { id: string; code?: string; name: string; unit?: string };

export async function getRdoFormOptions() {
  const session = await requireSession();
  const allProjects = canSeeAllProjects(session.roles);
  return withTenant(session.organizationId, async (client) => {
    const projects = await client.query<{ id: string; code: string; name: string }>(
      `select p.id, p.code, p.name from rdo.projects p
        where p.organization_id = $1 and p.active and p.status_normalized = 'active'
          and ($2::boolean or exists (
            select 1 from rdo.leader_team_members ltm where ltm.project_id = p.id
              and ltm.leader_user_id = $3 and ltm.valid_from <= current_date
              and (ltm.valid_until is null or ltm.valid_until >= current_date)
          )) order by p.name`,
      [session.organizationId, allProjects, session.userId],
    );
    const tasks = await client.query<{ id: string; project_id: string; code: string; name: string }>(
      `select id, project_id, code, name from rdo.tasks
        where organization_id = $1 and active and status_normalized in ('planned','active','blocked') order by name`,
      [session.organizationId],
    );
    const locations = await client.query<{ id: string; project_id: string; label: string }>(
      "select id, project_id, label from rdo.work_locations where organization_id = $1 and active order by label",
      [session.organizationId],
    );
    const members = await client.query<{ project_id: string; id: string; name: string; job_title: string | null }>(
      `select pm.project_id, c.id, c.full_name as name, c.job_title
         from rdo.project_members pm join rdo.collaborators c on c.id = pm.collaborator_id
        where pm.organization_id = $1 and pm.active and c.active order by c.full_name`,
      [session.organizationId],
    );
    const taskAssignees = await client.query<{ task_id: string; collaborator_id: string }>(
      `select ta.task_id, ta.collaborator_id from rdo.task_assignees ta
        join rdo.collaborators c on c.id = ta.collaborator_id
       where ta.organization_id = $1 and ta.active and c.active`,
      [session.organizationId],
    );
    const collaborators = await client.query<{ id: string; name: string; job_title: string | null }>(
      `select c.id, coalesce(o.full_name_override, c.full_name) as name,
              coalesce(o.job_title_override, c.job_title) as job_title
         from rdo.collaborators c
         left join rdo.collaborator_profile_overrides o on o.collaborator_id = c.id
        where c.organization_id = $1 and coalesce(o.active_override, c.active)
        order by coalesce(o.full_name_override, c.full_name)`,
      [session.organizationId],
    );
    const materials = await client.query<{ id: string; name: string; default_unit: string }>(
      "select id, name, default_unit from rdo.material_catalog where organization_id = $1 and active order by name",
      [session.organizationId],
    );
    const equipment = await client.query<{ id: string; asset_code: string; name: string }>(
      "select id, asset_code, name from rdo.equipment_assets where organization_id = $1 and active order by name",
      [session.organizationId],
    );
    const options: RdoFormProject[] = projects.rows.map((project) => ({
      ...project,
      tasks: tasks.rows.filter((task) => task.project_id === project.id).map(({ id, code, name }) => ({
        id, code, name,
        assigneeIds: taskAssignees.rows.filter((item) => item.task_id === id).map((item) => item.collaborator_id),
      })),
      locations: locations.rows.filter((location) => location.project_id === project.id).map(({ id, label }) => ({ id, label })),
      members: members.rows.filter((member) => member.project_id === project.id).map(({ id, name, job_title }) => ({ id, name, jobTitle: job_title })),
      collaborators: collaborators.rows.map(({ id, name, job_title }) => ({
        id, name, jobTitle: job_title,
        projectMember: members.rows.some((member) => member.project_id === project.id && member.id === id),
      })),
    }));
    return {
      session,
      projects: options,
      materials: materials.rows.map((item) => ({ id: item.id, name: item.name, unit: item.default_unit })),
      equipment: equipment.rows.map((item) => ({ id: item.id, code: item.asset_code, name: item.name })),
    };
  });
}

export async function getEmployees(search = "") {
  const session = await requireSession();
  const query = search.trim().slice(0, 100);
  return withTenant(session.organizationId, async (client) => {
    const result = await client.query<{
      id: string; name: string; cpf_digits: string | null; employee_number: string | null;
      job_title: string | null; department: string | null; employment_status: string;
      has_override: boolean; project_count: string; allocation_count: string; pending_divergence_count: string;
    }>(
      `select c.id, coalesce(o.full_name_override, c.full_name) as name, c.cpf_digits,
              coalesce(o.employee_number_override, c.employee_number) as employee_number,
              coalesce(o.job_title_override, c.job_title) as job_title,
              coalesce(o.department_override, c.department) as department,
              case when coalesce(o.active_override,c.active) then
                case when c.employment_status='inactive' and o.active_override is true then 'active' else c.employment_status end
              else 'inactive' end as employment_status,
              (o.collaborator_id is not null) as has_override,
              count(distinct pm.project_id) filter (where pm.active)::text as project_count,
              count(distinct a.id) filter (where a.allocation_status = 'active')::text as allocation_count,
              (count(distinct d.id) filter (where d.review_status = 'pending')
                + count(distinct di.id) filter (where di.resolution_status = 'open'))::text as pending_divergence_count
         from rdo.collaborators c
         left join rdo.collaborator_profile_overrides o on o.collaborator_id = c.id
         left join rdo.project_members pm on pm.collaborator_id = c.id
         left join rdo.work_allocations a on a.collaborator_id = c.id
         left join rdo.time_divergences d on d.allocation_id = a.id
         left join rdo.dimep_sync_issues di on di.collaborator_id = c.id
        where c.organization_id = $1 and coalesce(o.active_override, c.active)
          and ($2 = '' or coalesce(o.full_name_override, c.full_name) ilike '%' || $2 || '%'
            or coalesce(o.employee_number_override, c.employee_number, '') ilike '%' || $2 || '%'
            or coalesce(c.cpf_digits, '') like '%' || regexp_replace($2, '[^0-9]', '', 'g') || '%')
        group by c.id, o.collaborator_id, o.full_name_override, o.employee_number_override,
                 o.job_title_override, o.department_override, o.active_override
        order by coalesce(o.full_name_override, c.full_name) limit 200`,
      [session.organizationId, query],
    );
    return { session, employees: result.rows, search: query };
  });
}

export async function getEmployeeDetail(collaboratorId: string) {
  const session = await requireSession();
  if (!/^[0-9a-f-]{36}$/i.test(collaboratorId)) return null;
  return withTenant(session.organizationId, async (client) => {
    const profile = await client.query<{
      id: string; source_name: string; name: string; cpf_digits: string | null; cpf_is_valid: boolean;
      source_employee_number: string | null; employee_number: string | null;
      source_job_title: string | null; job_title: string | null;
      source_department: string | null; department: string | null; employment_status: string;
      source_email: string | null; email: string | null; source_phone: string | null; phone: string | null;
      source_active: boolean; active: boolean;
      full_name_override: string | null; employee_number_override: string | null;
      job_title_override: string | null; department_override: string | null; email_override: string | null;
      phone_override: string | null; active_override: boolean | null; override_reason: string | null;
      override_updated_at: Date | null;
    }>(
      `select c.id, c.full_name as source_name, coalesce(o.full_name_override, c.full_name) as name,
              c.cpf_digits, c.cpf_is_valid, c.employee_number as source_employee_number,
              coalesce(o.employee_number_override, c.employee_number) as employee_number,
              c.job_title as source_job_title, coalesce(o.job_title_override, c.job_title) as job_title,
              c.department as source_department, coalesce(o.department_override, c.department) as department,
              c.email as source_email, coalesce(o.email_override,c.email) as email,
              c.phone as source_phone, coalesce(o.phone_override,c.phone) as phone,
              c.active as source_active, coalesce(o.active_override,c.active) as active,
              case when coalesce(o.active_override,c.active) then c.employment_status else 'inactive' end as employment_status,
              o.full_name_override, o.employee_number_override,
              o.job_title_override, o.department_override, o.email_override, o.phone_override,
              o.active_override, o.reason as override_reason,
              o.updated_at as override_updated_at
         from rdo.collaborators c
         left join rdo.collaborator_profile_overrides o on o.collaborator_id = c.id
        where c.organization_id = $1 and c.id = $2`,
      [session.organizationId, collaboratorId],
    );
    if (!profile.rows[0]) return null;

    const [projects, workHistory, occurrences, quality, dimepIssues, account] = await Promise.all([
      client.query<{ id: string; code: string; name: string; status: string; source: string }>(
        `select p.id, p.code, p.name, p.status_normalized as status, pm.source
           from rdo.project_members pm join rdo.projects p on p.id = pm.project_id
          where pm.organization_id = $1 and pm.collaborator_id = $2 and pm.active
          order by p.status_normalized = 'active' desc, p.name`,
        [session.organizationId, collaboratorId],
      ),
      client.query<{
        rdo_id: string; work_date: string; project_code: string; project_name: string;
        task_code: string; task_name: string; starts_at: Date; ends_at: Date;
        divergence_type: string | null; divergence_status: string | null; divergence_justification: string | null;
      }>(
        `select r.id as rdo_id, r.work_date::text, p.code as project_code, p.name as project_name,
                t.code as task_code, t.name as task_name, a.declared_start_at as starts_at,
                a.declared_end_at as ends_at, d.divergence_type, d.review_status as divergence_status,
                d.justification as divergence_justification
           from rdo.work_allocations a
           join rdo.rdo_activity_groups g on g.id = a.activity_group_id
           join rdo.tasks t on t.id = g.task_id
           join rdo.rdo_versions v on v.id = a.rdo_version_id
           join rdo.rdos r on r.id = v.rdo_id
           join rdo.projects p on p.id = r.project_id
           left join rdo.time_divergences d on d.allocation_id = a.id
          where a.organization_id = $1 and a.collaborator_id = $2 and a.allocation_status = 'active'
          order by r.work_date desc, a.declared_start_at desc limit 50`,
        [session.organizationId, collaboratorId],
      ),
      client.query<{ id: string; rdo_id: string; work_date: string; project_name: string; severity: string; description: string; status: string }>(
        `select distinct oc.id, r.id as rdo_id, r.work_date::text, p.name as project_name,
                oc.severity, oc.description, oc.status
           from rdo.rdo_occurrences oc
           join rdo.rdo_versions v on v.id = oc.rdo_version_id
           join rdo.rdos r on r.id = v.rdo_id join rdo.projects p on p.id = r.project_id
          where oc.organization_id = $1 and exists (
            select 1 from rdo.work_allocations a where a.rdo_version_id = oc.rdo_version_id
              and a.collaborator_id = $2 and a.allocation_status = 'active')
          order by r.work_date desc limit 30`,
        [session.organizationId, collaboratorId],
      ),
      client.query<{ id: string; rdo_id: string; work_date: string; project_name: string; record_type: string; result: string; description: string }>(
        `select distinct q.id, r.id as rdo_id, r.work_date::text, p.name as project_name,
                q.record_type, q.result, q.description
           from rdo.rdo_quality_records q
           join rdo.rdo_versions v on v.id = q.rdo_version_id
           join rdo.rdos r on r.id = v.rdo_id join rdo.projects p on p.id = r.project_id
          where q.organization_id = $1 and exists (
            select 1 from rdo.work_allocations a where a.rdo_version_id = q.rdo_version_id
              and a.collaborator_id = $2 and a.allocation_status = 'active')
          order by r.work_date desc limit 30`,
        [session.organizationId, collaboratorId],
      ),
      client.query<{ id: string; work_date: string | null; issue_type: string; details: Record<string, unknown>; first_seen_at: Date }>(
        `select id,work_date::text,issue_type,details,first_seen_at from rdo.dimep_sync_issues
          where organization_id=$1 and collaborator_id=$2 and resolution_status='open'
          order by work_date desc nulls last,first_seen_at desc limit 30`,
        [session.organizationId, collaboratorId],
      ),
      client.query<{ user_id: string; display_name: string; email: string | null; phone_e164: string | null; active: boolean; roles: string[] }>(
        `select u.id as user_id,u.display_name,u.email::text,u.phone_e164,u.active,
                coalesce(array_agg(ur.role order by ur.role) filter(where ur.active),'{}') as roles
           from rdo.organization_users ou join rdo.app_users u on u.id=ou.user_id
           left join rdo.organization_user_roles ur on ur.organization_id=ou.organization_id and ur.user_id=ou.user_id
          where ou.organization_id=$1 and ou.collaborator_id=$2
          group by u.id,u.display_name,u.email,u.phone_e164,u.active`,
        [session.organizationId, collaboratorId],
      ),
    ]);
    return { session, employee: profile.rows[0], account: account.rows[0] ?? null, projects: projects.rows, workHistory: workHistory.rows, occurrences: occurrences.rows, quality: quality.rows, dimepIssues: dimepIssues.rows };
  });
}
