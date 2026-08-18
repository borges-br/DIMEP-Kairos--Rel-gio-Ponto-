BEGIN;
SET search_path = rdo, public;

ALTER VIEW IF EXISTS v_imuv_timer_candidates SET (security_invoker = true);

CREATE TABLE IF NOT EXISTS rdo_work_permits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL, activity_group_id uuid NOT NULL, permit_number text,
  opened_at timestamptz, closed_at timestamptz,
  status text NOT NULL DEFAULT 'not_required' CHECK (status IN ('not_required', 'not_started', 'open', 'closed', 'suspended', 'cancelled')),
  notes text, created_by_user_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id, activity_group_id) REFERENCES rdo_activity_groups(organization_id, rdo_version_id, id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (activity_group_id), UNIQUE (organization_id, id),
  CONSTRAINT work_permit_number CHECK (status = 'not_required' OR btrim(coalesce(permit_number, '')) <> ''),
  CONSTRAINT work_permit_opened CHECK (status NOT IN ('open', 'closed') OR opened_at IS NOT NULL),
  CONSTRAINT work_permit_closed CHECK (status <> 'closed' OR closed_at IS NOT NULL),
  CONSTRAINT work_permit_time CHECK (closed_at IS NULL OR opened_at IS NULL OR closed_at > opened_at)
);

CREATE TABLE IF NOT EXISTS media_transcriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid NOT NULL REFERENCES organizations(id),
  media_file_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'cancelled')),
  transcription_text text, language_code text, provider text, model_name text,
  confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1), error_message text,
  requested_by_user_id uuid NOT NULL, completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, media_file_id) REFERENCES media_files(organization_id, id),
  FOREIGN KEY (organization_id, requested_by_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (media_file_id), UNIQUE (organization_id, id),
  CONSTRAINT transcription_result CHECK (
    (status = 'completed' AND btrim(coalesce(transcription_text, '')) <> '' AND completed_at IS NOT NULL)
    OR (status = 'failed' AND btrim(coalesce(error_message, '')) <> '')
    OR status IN ('queued', 'processing', 'cancelled')
  )
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'rdo_work_permits_updated_at') THEN
    CREATE TRIGGER rdo_work_permits_updated_at BEFORE UPDATE ON rdo_work_permits FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'media_transcriptions_updated_at') THEN
    CREATE TRIGGER media_transcriptions_updated_at BEFORE UPDATE ON media_transcriptions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON rdo_work_permits, media_transcriptions TO rdo_runtime;
ALTER TABLE rdo_work_permits ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_transcriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON rdo_work_permits;
CREATE POLICY tenant_isolation ON rdo_work_permits TO rdo_runtime USING (organization_id = current_organization_id()) WITH CHECK (organization_id = current_organization_id());
DROP POLICY IF EXISTS tenant_isolation ON media_transcriptions;
CREATE POLICY tenant_isolation ON media_transcriptions TO rdo_runtime USING (organization_id = current_organization_id()) WITH CHECK (organization_id = current_organization_id());

COMMIT;
