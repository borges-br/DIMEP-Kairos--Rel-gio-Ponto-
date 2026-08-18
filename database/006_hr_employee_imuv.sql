BEGIN;

SET search_path TO rdo, public;

ALTER TABLE organization_user_roles
  DROP CONSTRAINT IF EXISTS organization_user_roles_role_check;
ALTER TABLE organization_user_roles
  ADD CONSTRAINT organization_user_roles_role_check
  CHECK (role IN ('leader', 'foreman', 'manager', 'hr', 'director', 'admin'));

ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS email citext;
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS phone text;

ALTER TABLE collaborator_profile_overrides ADD COLUMN IF NOT EXISTS email_override citext;
ALTER TABLE collaborator_profile_overrides ADD COLUMN IF NOT EXISTS phone_override text;
ALTER TABLE collaborator_profile_overrides ADD COLUMN IF NOT EXISTS active_override boolean;

ALTER TABLE collaborator_profile_overrides
  DROP CONSTRAINT IF EXISTS collaborator_override_has_value;
ALTER TABLE collaborator_profile_overrides
  ADD CONSTRAINT collaborator_override_has_value CHECK (
    num_nonnulls(full_name_override, employee_number_override, job_title_override,
      department_override, email_override, phone_override, active_override) > 0
  );

ALTER TABLE collaborator_profile_overrides
  DROP CONSTRAINT IF EXISTS collaborator_override_text;
ALTER TABLE collaborator_profile_overrides
  ADD CONSTRAINT collaborator_override_text CHECK (
    (full_name_override IS NULL OR btrim(full_name_override) <> '') AND
    (employee_number_override IS NULL OR btrim(employee_number_override) <> '') AND
    (job_title_override IS NULL OR btrim(job_title_override) <> '') AND
    (department_override IS NULL OR btrim(department_override) <> '') AND
    (email_override IS NULL OR btrim(email_override::text) <> '') AND
    (phone_override IS NULL OR btrim(phone_override) <> '')
  );

GRANT SELECT, INSERT, UPDATE, DELETE ON collaborator_profile_overrides TO rdo_runtime;

COMMIT;
