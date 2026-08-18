BEGIN;

SET search_path TO rdo, public;

CREATE TABLE IF NOT EXISTS dimep_sync_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  connection_id uuid NOT NULL,
  collaborator_id uuid,
  external_employee_id text NOT NULL,
  work_date date,
  issue_type text NOT NULL CHECK (issue_type IN (
    'unmatched_employee', 'invalid_punch', 'missing_end', 'duplicate_time', 'cross_midnight', 'other'
  )),
  fingerprint char(64) NOT NULL CHECK (fingerprint ~ '^[0-9a-f]{64}$'),
  details jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(details) = 'object'),
  resolution_status text NOT NULL DEFAULT 'open' CHECK (resolution_status IN ('open', 'resolved', 'waived')),
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  FOREIGN KEY (organization_id, connection_id)
    REFERENCES integration_connections(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id)
    REFERENCES collaborators(organization_id, id),
  UNIQUE (connection_id, fingerprint),
  CONSTRAINT dimep_issue_resolution CHECK (
    (resolution_status = 'open' AND resolved_at IS NULL)
    OR (resolution_status IN ('resolved', 'waived') AND resolved_at IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS dimep_sync_issues_open_idx
  ON dimep_sync_issues(organization_id, collaborator_id, work_date)
  WHERE resolution_status = 'open';

GRANT SELECT, INSERT, UPDATE, DELETE ON dimep_sync_issues TO rdo_runtime;
ALTER TABLE dimep_sync_issues ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON dimep_sync_issues;
CREATE POLICY tenant_isolation ON dimep_sync_issues TO rdo_runtime
  USING (organization_id = rdo.current_organization_id())
  WITH CHECK (organization_id = rdo.current_organization_id());

COMMIT;
