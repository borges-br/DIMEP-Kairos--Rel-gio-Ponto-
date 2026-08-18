BEGIN;

SET search_path TO rdo, public;

CREATE TABLE IF NOT EXISTS collaborator_profile_overrides (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  collaborator_id uuid NOT NULL,
  full_name_override text,
  employee_number_override text,
  job_title_override text,
  department_override text,
  reason text NOT NULL,
  updated_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, collaborator_id),
  FOREIGN KEY (organization_id, collaborator_id)
    REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, updated_by_user_id)
    REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT collaborator_override_has_value CHECK (
    num_nonnulls(full_name_override, employee_number_override, job_title_override, department_override) > 0
  ),
  CONSTRAINT collaborator_override_reason CHECK (length(btrim(reason)) >= 10),
  CONSTRAINT collaborator_override_text CHECK (
    (full_name_override IS NULL OR btrim(full_name_override) <> '') AND
    (employee_number_override IS NULL OR btrim(employee_number_override) <> '') AND
    (job_title_override IS NULL OR btrim(job_title_override) <> '') AND
    (department_override IS NULL OR btrim(department_override) <> '')
  )
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
     WHERE tgname = 'collaborator_profile_overrides_updated_at'
       AND tgrelid = 'rdo.collaborator_profile_overrides'::regclass
  ) THEN
    CREATE TRIGGER collaborator_profile_overrides_updated_at
    BEFORE UPDATE ON collaborator_profile_overrides
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;

GRANT SELECT, INSERT, UPDATE, DELETE ON collaborator_profile_overrides TO rdo_runtime;
ALTER TABLE collaborator_profile_overrides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON collaborator_profile_overrides;
CREATE POLICY tenant_isolation ON collaborator_profile_overrides TO rdo_runtime
  USING (organization_id = rdo.current_organization_id())
  WITH CHECK (organization_id = rdo.current_organization_id());

COMMIT;
