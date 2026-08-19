BEGIN;

SET search_path TO rdo, public;

CREATE TABLE IF NOT EXISTS work_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid NOT NULL,
  task_id uuid NOT NULL,
  collaborator_id uuid NOT NULL,
  work_date date NOT NULL,
  planned_start time NOT NULL,
  planned_end time NOT NULL,
  instructions text,
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'completed', 'cancelled')),
  imuv_sync_status text NOT NULL DEFAULT 'pending_homologation'
    CHECK (imuv_sync_status IN ('pending_homologation', 'ready', 'synced', 'failed', 'not_applicable')),
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, project_id) REFERENCES projects(organization_id, id),
  FOREIGN KEY (organization_id, task_id) REFERENCES tasks(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (organization_id, id),
  UNIQUE (task_id, collaborator_id, work_date, planned_start),
  CONSTRAINT work_assignment_time CHECK (planned_end > planned_start),
  CONSTRAINT work_assignment_instructions CHECK (instructions IS NULL OR btrim(instructions) <> '')
);

CREATE OR REPLACE FUNCTION validate_work_assignment_scope() RETURNS trigger
LANGUAGE plpgsql SET search_path = rdo, pg_temp AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM tasks
     WHERE organization_id = NEW.organization_id AND id = NEW.task_id
       AND project_id = NEW.project_id AND active
  ) THEN
    RAISE EXCEPTION 'A tarefa distribuída deve pertencer ao projeto selecionado';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS work_assignment_scope ON work_assignments;
CREATE TRIGGER work_assignment_scope
BEFORE INSERT OR UPDATE OF organization_id, project_id, task_id
ON work_assignments FOR EACH ROW EXECUTE FUNCTION validate_work_assignment_scope();

DROP TRIGGER IF EXISTS work_assignments_updated_at ON work_assignments;
CREATE TRIGGER work_assignments_updated_at BEFORE UPDATE ON work_assignments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS work_assignments_schedule_idx
  ON work_assignments(organization_id, work_date, collaborator_id)
  WHERE status = 'planned';

GRANT SELECT, INSERT, UPDATE, DELETE ON work_assignments TO rdo_runtime;
ALTER TABLE work_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON work_assignments;
CREATE POLICY tenant_isolation ON work_assignments TO rdo_runtime
  USING (organization_id = rdo.current_organization_id())
  WITH CHECK (organization_id = rdo.current_organization_id());

COMMIT;
