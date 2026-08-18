-- Banco do MVP de RDO / apontamento de horas
-- PostgreSQL 16+
-- Convenções: UUID interno, datas em UTC (timestamptz), documentos apenas com dígitos.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE SCHEMA IF NOT EXISTS rdo;
SET search_path TO rdo, public;

CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = rdo, pg_temp AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE FUNCTION reject_mutation() RETURNS trigger
LANGUAGE plpgsql SET search_path = rdo, pg_temp AS $$
BEGIN
  RAISE EXCEPTION 'A tabela % é imutável; registre um novo evento/versão', TG_TABLE_NAME;
END;
$$;

-- 1. Tenant e integrações ----------------------------------------------------

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name text NOT NULL,
  trade_name text NOT NULL,
  cnpj_digits varchar(14),
  timezone text NOT NULL DEFAULT 'America/Sao_Paulo',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT organizations_cnpj_format CHECK (cnpj_digits IS NULL OR cnpj_digits ~ '^[0-9]{14}$'),
  CONSTRAINT organizations_timezone_not_blank CHECK (btrim(timezone) <> '')
);
CREATE UNIQUE INDEX organizations_cnpj_uq ON organizations(cnpj_digits) WHERE cnpj_digits IS NOT NULL;
CREATE TRIGGER organizations_updated_at BEFORE UPDATE ON organizations
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE integration_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  provider text NOT NULL CHECK (provider IN ('imuv', 'dimep')),
  external_tenant_key text NOT NULL,
  base_url text NOT NULL,
  secret_ref text NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  enabled boolean NOT NULL DEFAULT true,
  last_success_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, provider, external_tenant_key),
  UNIQUE (organization_id, id),
  CONSTRAINT integration_secret_is_reference CHECK (btrim(secret_ref) <> ''),
  CONSTRAINT integration_settings_object CHECK (jsonb_typeof(settings) = 'object')
);
CREATE TRIGGER integration_connections_updated_at BEFORE UPDATE ON integration_connections
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  connection_id uuid NOT NULL,
  object_type text NOT NULL,
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status text NOT NULL CHECK (status IN ('queued', 'running', 'succeeded', 'partial', 'failed')),
  cursor_value text,
  records_read integer NOT NULL DEFAULT 0 CHECK (records_read >= 0),
  records_written integer NOT NULL DEFAULT 0 CHECK (records_written >= 0),
  records_rejected integer NOT NULL DEFAULT 0 CHECK (records_rejected >= 0),
  error_summary text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, connection_id)
    REFERENCES integration_connections(organization_id, id)
);

CREATE TABLE integration_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  connection_id uuid NOT NULL,
  sync_run_id uuid REFERENCES sync_runs(id),
  object_type text NOT NULL,
  external_id text NOT NULL,
  source_updated_at timestamptz,
  payload jsonb NOT NULL,
  payload_sha256 char(64) NOT NULL CHECK (payload_sha256 ~ '^[0-9a-f]{64}$'),
  received_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, connection_id)
    REFERENCES integration_connections(organization_id, id),
  UNIQUE (connection_id, object_type, external_id, payload_sha256)
);
CREATE INDEX integration_snapshots_lookup_idx
  ON integration_snapshots(connection_id, object_type, external_id, received_at DESC);
CREATE TRIGGER integration_snapshots_immutable
BEFORE UPDATE OR DELETE ON integration_snapshots
FOR EACH ROW EXECUTE FUNCTION reject_mutation();

-- 2. Usuários, pessoas e identidade entre sistemas --------------------------

CREATE TABLE app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL,
  email citext,
  phone_e164 varchar(16),
  auth_subject text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (auth_subject),
  CONSTRAINT app_users_email_or_phone CHECK (email IS NOT NULL OR phone_e164 IS NOT NULL),
  CONSTRAINT app_users_phone_format CHECK (phone_e164 IS NULL OR phone_e164 ~ '^\+[1-9][0-9]{7,14}$')
);
CREATE UNIQUE INDEX app_users_email_uq ON app_users(lower(email::text)) WHERE email IS NOT NULL;
CREATE TRIGGER app_users_updated_at BEFORE UPDATE ON app_users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE organization_user_roles (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL REFERENCES app_users(id),
  role text NOT NULL CHECK (role IN ('leader', 'foreman', 'manager', 'hr', 'director', 'admin')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, user_id, role)
);

CREATE TABLE collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  full_name text NOT NULL,
  normalized_name text NOT NULL,
  cpf_raw text,
  cpf_digits varchar(11),
  cpf_is_valid boolean NOT NULL DEFAULT false,
  employee_number text,
  job_title text,
  department text,
  email citext,
  phone text,
  employment_status text NOT NULL DEFAULT 'active'
    CHECK (employment_status IN ('active', 'inactive', 'leave', 'unknown')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id),
  CONSTRAINT collaborators_cpf_format CHECK (cpf_digits IS NULL OR cpf_digits ~ '^[0-9]{11}$'),
  CONSTRAINT collaborators_name_not_blank CHECK (btrim(full_name) <> '' AND btrim(normalized_name) <> '')
);
CREATE UNIQUE INDEX collaborators_valid_cpf_uq
  ON collaborators(organization_id, cpf_digits)
  WHERE cpf_digits IS NOT NULL AND cpf_is_valid;
CREATE INDEX collaborators_normalized_name_idx ON collaborators(organization_id, normalized_name);
CREATE TRIGGER collaborators_updated_at BEFORE UPDATE ON collaborators
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE organization_users (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL REFERENCES app_users(id),
  collaborator_id uuid,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, user_id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  UNIQUE (organization_id, collaborator_id)
);
ALTER TABLE organization_user_roles
  ADD CONSTRAINT organization_user_roles_membership_fk
  FOREIGN KEY (organization_id, user_id) REFERENCES organization_users(organization_id, user_id);

-- Correções locais não sobrescrevem o cadastro sincronizado. A aplicação usa
-- estes valores como sobreposição auditável e preserva a origem DIMEP/IMUV.
CREATE TABLE collaborator_profile_overrides (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  collaborator_id uuid NOT NULL,
  full_name_override text,
  employee_number_override text,
  job_title_override text,
  department_override text,
  email_override citext,
  phone_override text,
  active_override boolean,
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
    num_nonnulls(full_name_override, employee_number_override, job_title_override,
      department_override, email_override, phone_override, active_override) > 0
  ),
  CONSTRAINT collaborator_override_reason CHECK (length(btrim(reason)) >= 10),
  CONSTRAINT collaborator_override_text CHECK (
    (full_name_override IS NULL OR btrim(full_name_override) <> '') AND
    (employee_number_override IS NULL OR btrim(employee_number_override) <> '') AND
    (job_title_override IS NULL OR btrim(job_title_override) <> '') AND
    (department_override IS NULL OR btrim(department_override) <> '') AND
    (email_override IS NULL OR btrim(email_override::text) <> '') AND
    (phone_override IS NULL OR btrim(phone_override) <> '')
  )
);
CREATE TRIGGER collaborator_profile_overrides_updated_at
BEFORE UPDATE ON collaborator_profile_overrides
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE user_credentials (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL,
  password_hash text NOT NULL,
  failed_login_count integer NOT NULL DEFAULT 0 CHECK (failed_login_count >= 0),
  locked_until timestamptz,
  password_changed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, user_id),
  FOREIGN KEY (organization_id, user_id) REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT password_hash_not_blank CHECK (btrim(password_hash) <> '')
);
CREATE TRIGGER user_credentials_updated_at BEFORE UPDATE ON user_credentials
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL,
  token_sha256 char(64) NOT NULL CHECK (token_sha256 ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  ip_address inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (token_sha256),
  UNIQUE (organization_id, id),
  CONSTRAINT session_expiration CHECK (expires_at > created_at)
);
CREATE INDEX user_sessions_active_idx
  ON user_sessions(organization_id, user_id, expires_at)
  WHERE revoked_at IS NULL;

CREATE TABLE login_attempts (
  id bigserial PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  email_sha256 char(64) NOT NULL CHECK (email_sha256 ~ '^[0-9a-f]{64}$'),
  successful boolean NOT NULL,
  ip_address inet,
  user_agent text,
  attempted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX login_attempts_rate_limit_idx
  ON login_attempts(organization_id, email_sha256, attempted_at DESC);
CREATE TRIGGER login_attempts_immutable
BEFORE UPDATE OR DELETE ON login_attempts
FOR EACH ROW EXECUTE FUNCTION reject_mutation();

CREATE TABLE collaborator_external_refs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  collaborator_id uuid NOT NULL,
  connection_id uuid NOT NULL,
  external_id text NOT NULL,
  external_name text,
  external_document_raw text,
  external_document_digits text,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, collaborator_id)
    REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, connection_id)
    REFERENCES integration_connections(organization_id, id),
  UNIQUE (connection_id, external_id),
  UNIQUE (connection_id, collaborator_id)
);

CREATE TABLE identity_match_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  source_connection_id uuid NOT NULL,
  source_external_id text NOT NULL,
  candidate_collaborator_id uuid NOT NULL,
  match_score numeric(5,4) NOT NULL CHECK (match_score BETWEEN 0 AND 1),
  match_reasons jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(match_reasons) = 'array'),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  reviewed_by_user_id uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, source_connection_id)
    REFERENCES integration_connections(organization_id, id),
  FOREIGN KEY (organization_id, candidate_collaborator_id)
    REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, reviewed_by_user_id)
    REFERENCES organization_users(organization_id, user_id),
  UNIQUE (source_connection_id, source_external_id, candidate_collaborator_id),
  CONSTRAINT identity_review_fields CHECK (
    (status = 'pending' AND reviewed_at IS NULL AND reviewed_by_user_id IS NULL)
    OR (status IN ('confirmed', 'rejected') AND reviewed_at IS NOT NULL AND reviewed_by_user_id IS NOT NULL)
  )
);

-- 3. Dados mestres provenientes do IMUV -------------------------------------

CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  imuv_external_id text NOT NULL,
  legal_name text NOT NULL,
  normalized_name text NOT NULL,
  document_raw text,
  document_digits varchar(14),
  document_type text CHECK (document_type IN ('cpf', 'cnpj', 'unknown')),
  document_is_valid boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  source_updated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, imuv_external_id),
  UNIQUE (organization_id, id),
  CONSTRAINT clients_document_format CHECK (document_digits IS NULL OR document_digits ~ '^[0-9]{11}([0-9]{3})?$')
);
CREATE UNIQUE INDEX clients_valid_document_uq
  ON clients(organization_id, document_digits)
  WHERE document_digits IS NOT NULL AND document_is_valid;
CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  client_id uuid NOT NULL,
  imuv_external_id text NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  normalized_name text NOT NULL,
  status_raw text,
  status_normalized text NOT NULL DEFAULT 'unknown'
    CHECK (status_normalized IN ('planned', 'active', 'paused', 'completed', 'cancelled', 'unknown')),
  starts_on date,
  ends_on date,
  address_line text,
  district text,
  city text,
  state_code varchar(2),
  postal_code_digits varchar(8),
  latitude numeric(9,6),
  longitude numeric(9,6),
  active boolean NOT NULL DEFAULT true,
  source_updated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, client_id) REFERENCES clients(organization_id, id),
  UNIQUE (organization_id, imuv_external_id),
  UNIQUE (organization_id, code),
  UNIQUE (organization_id, id),
  CONSTRAINT projects_dates CHECK (ends_on IS NULL OR starts_on IS NULL OR ends_on >= starts_on),
  CONSTRAINT projects_coordinates CHECK (
    (latitude IS NULL AND longitude IS NULL)
    OR (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
  )
);
CREATE INDEX projects_active_idx ON projects(organization_id, status_normalized) WHERE active;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid NOT NULL,
  imuv_external_id text NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  normalized_name text NOT NULL,
  description text,
  status_raw text,
  status_normalized text NOT NULL DEFAULT 'unknown'
    CHECK (status_normalized IN ('planned', 'active', 'blocked', 'completed', 'cancelled', 'unknown')),
  active boolean NOT NULL DEFAULT true,
  source_updated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, project_id) REFERENCES projects(organization_id, id),
  UNIQUE (organization_id, imuv_external_id),
  UNIQUE (project_id, code),
  UNIQUE (organization_id, id)
);
CREATE INDEX tasks_project_active_idx ON tasks(project_id, status_normalized) WHERE active;
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE project_members (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid NOT NULL,
  collaborator_id uuid NOT NULL,
  source text NOT NULL DEFAULT 'imuv' CHECK (source IN ('imuv', 'manual')),
  active boolean NOT NULL DEFAULT true,
  source_updated_at timestamptz,
  PRIMARY KEY (project_id, collaborator_id),
  FOREIGN KEY (organization_id, project_id) REFERENCES projects(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id)
);

CREATE TABLE task_assignees (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  task_id uuid NOT NULL,
  collaborator_id uuid NOT NULL,
  source text NOT NULL DEFAULT 'imuv' CHECK (source IN ('imuv', 'manual')),
  active boolean NOT NULL DEFAULT true,
  source_updated_at timestamptz,
  PRIMARY KEY (task_id, collaborator_id),
  FOREIGN KEY (organization_id, task_id) REFERENCES tasks(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id)
);

CREATE TABLE leader_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid NOT NULL,
  leader_user_id uuid NOT NULL,
  collaborator_id uuid NOT NULL,
  valid_from date NOT NULL,
  valid_until date,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, project_id) REFERENCES projects(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, leader_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (project_id, leader_user_id, collaborator_id, valid_from),
  CONSTRAINT leader_team_dates CHECK (valid_until IS NULL OR valid_until >= valid_from)
);
CREATE UNIQUE INDEX leader_team_active_uq
  ON leader_team_members(project_id, leader_user_id, collaborator_id)
  WHERE valid_until IS NULL;

CREATE TABLE work_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid NOT NULL,
  location_type text NOT NULL CHECK (location_type IN ('front', 'area', 'equipment', 'tag', 'other')),
  label text NOT NULL,
  normalized_label text NOT NULL,
  latitude numeric(9,6),
  longitude numeric(9,6),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, project_id) REFERENCES projects(organization_id, id),
  UNIQUE (project_id, normalized_label),
  UNIQUE (organization_id, id)
);

-- 4. Ponto DIMEP e pareamento de batidas ------------------------------------

CREATE TABLE time_punches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  connection_id uuid NOT NULL,
  collaborator_id uuid,
  external_record_id text NOT NULL,
  external_employee_id text NOT NULL,
  occurred_at timestamptz NOT NULL,
  mark_kind text NOT NULL DEFAULT 'unknown' CHECK (mark_kind IN ('in', 'out', 'unknown', 'void')),
  source_sequence integer NOT NULL DEFAULT 1 CHECK (source_sequence > 0),
  supersedes_punch_id uuid,
  payload jsonb NOT NULL,
  payload_sha256 char(64) NOT NULL CHECK (payload_sha256 ~ '^[0-9a-f]{64}$'),
  imported_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, connection_id) REFERENCES integration_connections(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, supersedes_punch_id) REFERENCES time_punches(organization_id, id),
  UNIQUE (connection_id, external_record_id, source_sequence),
  UNIQUE (connection_id, external_record_id, payload_sha256),
  UNIQUE (organization_id, id)
);
CREATE INDEX time_punches_employee_time_idx ON time_punches(organization_id, collaborator_id, occurred_at);
CREATE TRIGGER time_punches_immutable
BEFORE UPDATE OR DELETE ON time_punches
FOR EACH ROW EXECUTE FUNCTION reject_mutation();

CREATE TABLE time_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  collaborator_id uuid NOT NULL,
  work_date date NOT NULL,
  start_punch_id uuid,
  end_punch_id uuid,
  original_start_at timestamptz,
  original_end_at timestamptz,
  segment_status text NOT NULL CHECK (segment_status IN ('closed', 'missing_start', 'missing_end', 'manual_review')),
  algorithm_version text NOT NULL,
  source_fingerprint char(64) NOT NULL CHECK (source_fingerprint ~ '^[0-9a-f]{64}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, start_punch_id) REFERENCES time_punches(organization_id, id),
  FOREIGN KEY (organization_id, end_punch_id) REFERENCES time_punches(organization_id, id),
  UNIQUE (organization_id, id),
  UNIQUE (organization_id, collaborator_id, work_date, source_fingerprint),
  CONSTRAINT time_segments_bounds CHECK (
    original_end_at IS NULL OR original_start_at IS NULL OR original_end_at > original_start_at
  )
);

-- 5. RDO versionado ----------------------------------------------------------

CREATE TABLE rdos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid NOT NULL,
  work_date date NOT NULL,
  current_version_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, project_id) REFERENCES projects(organization_id, id),
  UNIQUE (organization_id, project_id, work_date),
  UNIQUE (organization_id, id)
);

CREATE TABLE rdo_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_id uuid NOT NULL,
  version_number integer NOT NULL CHECK (version_number > 0),
  supersedes_version_id uuid,
  leader_user_id uuid NOT NULL,
  created_by_user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'returned', 'approved', 'reviewed', 'superseded', 'cancelled')),
  general_notes text,
  time_reconciled_at timestamptz,
  submitted_at timestamptz,
  approved_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_id) REFERENCES rdos(organization_id, id),
  FOREIGN KEY (organization_id, leader_user_id) REFERENCES organization_users(organization_id, user_id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  FOREIGN KEY (organization_id, supersedes_version_id) REFERENCES rdo_versions(organization_id, id),
  UNIQUE (rdo_id, version_number),
  UNIQUE (organization_id, id),
  UNIQUE (organization_id, id, rdo_id)
);
ALTER TABLE rdos ADD CONSTRAINT rdos_current_version_fk
  FOREIGN KEY (organization_id, current_version_id, id)
  REFERENCES rdo_versions(organization_id, id, rdo_id)
  DEFERRABLE INITIALLY DEFERRED;
CREATE TRIGGER rdo_versions_updated_at BEFORE UPDATE ON rdo_versions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE rdo_activity_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  sequence_number integer NOT NULL CHECK (sequence_number > 0),
  task_id uuid NOT NULL,
  location_id uuid NOT NULL,
  group_start_at timestamptz NOT NULL,
  group_end_at timestamptz NOT NULL,
  execution_description text NOT NULL,
  quantity numeric(14,3),
  unit text,
  daily_progress_percent numeric(5,2) CHECK (daily_progress_percent BETWEEN 0 AND 100),
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, task_id) REFERENCES tasks(organization_id, id),
  FOREIGN KEY (organization_id, location_id) REFERENCES work_locations(organization_id, id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (rdo_version_id, sequence_number),
  UNIQUE (organization_id, id),
  UNIQUE (organization_id, rdo_version_id, id),
  CONSTRAINT activity_group_time CHECK (group_end_at > group_start_at),
  CONSTRAINT activity_group_description CHECK (btrim(execution_description) <> ''),
  CONSTRAINT activity_group_measurement CHECK (
    (quantity IS NULL AND unit IS NULL) OR (quantity IS NOT NULL AND quantity >= 0 AND btrim(unit) <> '')
  )
);
CREATE TRIGGER rdo_activity_groups_updated_at BEFORE UPDATE ON rdo_activity_groups
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- A PT pertence ao bloco de atividade/tarefa. Assim um RDO diário pode conter
-- várias tarefas e cada uma manter sua própria rastreabilidade de liberação.
CREATE TABLE rdo_work_permits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  activity_group_id uuid NOT NULL,
  permit_number text,
  opened_at timestamptz,
  closed_at timestamptz,
  status text NOT NULL DEFAULT 'not_required'
    CHECK (status IN ('not_required', 'not_started', 'open', 'closed', 'suspended', 'cancelled')),
  notes text,
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id, activity_group_id)
    REFERENCES rdo_activity_groups(organization_id, rdo_version_id, id),
  FOREIGN KEY (organization_id, created_by_user_id)
    REFERENCES organization_users(organization_id, user_id),
  UNIQUE (activity_group_id),
  UNIQUE (organization_id, id),
  CONSTRAINT work_permit_number CHECK (
    status = 'not_required' OR btrim(coalesce(permit_number, '')) <> ''
  ),
  CONSTRAINT work_permit_opened CHECK (
    status NOT IN ('open', 'closed') OR opened_at IS NOT NULL
  ),
  CONSTRAINT work_permit_closed CHECK (
    status <> 'closed' OR closed_at IS NOT NULL
  ),
  CONSTRAINT work_permit_time CHECK (
    closed_at IS NULL OR opened_at IS NULL OR closed_at > opened_at
  )
);
CREATE TRIGGER rdo_work_permits_updated_at BEFORE UPDATE ON rdo_work_permits
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE work_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  activity_group_id uuid NOT NULL,
  collaborator_id uuid NOT NULL,
  original_start_at timestamptz,
  original_end_at timestamptz,
  declared_start_at timestamptz NOT NULL,
  declared_end_at timestamptz NOT NULL,
  declared_period tstzrange GENERATED ALWAYS AS
    (tstzrange(declared_start_at, declared_end_at, '[)')) STORED,
  allocation_status text NOT NULL DEFAULT 'active' CHECK (allocation_status IN ('active', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id, activity_group_id)
    REFERENCES rdo_activity_groups(organization_id, rdo_version_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  UNIQUE (activity_group_id, collaborator_id),
  UNIQUE (organization_id, id),
  CONSTRAINT allocation_time CHECK (declared_end_at > declared_start_at),
  CONSTRAINT allocation_original_time CHECK (
    original_end_at IS NULL OR original_start_at IS NULL OR original_end_at > original_start_at
  ),
  EXCLUDE USING gist (
    rdo_version_id WITH =,
    collaborator_id WITH =,
    declared_period WITH &&
  ) WHERE (allocation_status = 'active')
);
CREATE INDEX work_allocations_collaborator_idx
  ON work_allocations(organization_id, collaborator_id, declared_start_at);

CREATE FUNCTION validate_activity_group_scope() RETURNS trigger
LANGUAGE plpgsql SET search_path = rdo, pg_temp AS $$
DECLARE
  expected_project uuid;
  expected_date date;
  task_project uuid;
  location_project uuid;
  org_timezone text;
BEGIN
  SELECT r.project_id, r.work_date, o.timezone
    INTO expected_project, expected_date, org_timezone
    FROM rdo_versions v
    JOIN rdos r ON r.id = v.rdo_id
    JOIN organizations o ON o.id = v.organization_id
   WHERE v.id = NEW.rdo_version_id AND v.organization_id = NEW.organization_id;

  SELECT project_id INTO task_project FROM tasks
   WHERE id = NEW.task_id AND organization_id = NEW.organization_id;
  SELECT project_id INTO location_project FROM work_locations
   WHERE id = NEW.location_id AND organization_id = NEW.organization_id;

  IF expected_project IS NULL OR task_project <> expected_project OR location_project <> expected_project THEN
    RAISE EXCEPTION 'Tarefa, local e RDO devem pertencer ao mesmo projeto';
  END IF;
  IF (NEW.group_start_at AT TIME ZONE org_timezone)::date <> expected_date THEN
    RAISE EXCEPTION 'A atividade deve começar na data de trabalho do RDO';
  END IF;
  IF (NEW.group_end_at AT TIME ZONE org_timezone)::date NOT IN (expected_date, expected_date + 1) THEN
    RAISE EXCEPTION 'A atividade só pode terminar no mesmo dia ou atravessar a meia-noite';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER rdo_activity_group_scope
BEFORE INSERT OR UPDATE OF organization_id, rdo_version_id, task_id, location_id, group_start_at, group_end_at
ON rdo_activity_groups FOR EACH ROW EXECUTE FUNCTION validate_activity_group_scope();

CREATE FUNCTION validate_allocation_scope() RETURNS trigger
LANGUAGE plpgsql SET search_path = rdo, pg_temp AS $$
DECLARE
  group_start timestamptz;
  group_end timestamptz;
BEGIN
  SELECT group_start_at, group_end_at INTO group_start, group_end
    FROM rdo_activity_groups
   WHERE id = NEW.activity_group_id
     AND rdo_version_id = NEW.rdo_version_id
     AND organization_id = NEW.organization_id;
  IF group_start IS NULL THEN
    RAISE EXCEPTION 'Grupo de atividade inválido para esta versão do RDO';
  END IF;
  IF NEW.declared_start_at < group_start OR NEW.declared_end_at > group_end THEN
    RAISE EXCEPTION 'O intervalo individual deve estar contido no intervalo do grupo';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER work_allocation_scope
BEFORE INSERT OR UPDATE OF organization_id, rdo_version_id, activity_group_id, declared_start_at, declared_end_at
ON work_allocations FOR EACH ROW EXECUTE FUNCTION validate_allocation_scope();

CREATE TABLE allocation_time_segments (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  allocation_id uuid NOT NULL,
  time_segment_id uuid NOT NULL,
  PRIMARY KEY (allocation_id, time_segment_id),
  FOREIGN KEY (organization_id, allocation_id) REFERENCES work_allocations(organization_id, id),
  FOREIGN KEY (organization_id, time_segment_id) REFERENCES time_segments(organization_id, id)
);

CREATE TABLE time_divergences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  allocation_id uuid NOT NULL,
  divergence_type text NOT NULL
    CHECK (divergence_type IN ('changed_start', 'changed_end', 'changed_both', 'missing_punch', 'manual_entry', 'other')),
  start_difference_minutes integer,
  end_difference_minutes integer,
  justification text NOT NULL,
  review_status text NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'accepted', 'rejected')),
  reviewed_by_user_id uuid,
  reviewed_at timestamptz,
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, allocation_id) REFERENCES work_allocations(organization_id, id),
  FOREIGN KEY (organization_id, reviewed_by_user_id) REFERENCES organization_users(organization_id, user_id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (allocation_id),
  CONSTRAINT divergence_justification CHECK (btrim(justification) <> ''),
  CONSTRAINT divergence_review CHECK (
    (review_status = 'pending' AND reviewed_at IS NULL AND reviewed_by_user_id IS NULL)
    OR (review_status IN ('accepted', 'rejected') AND reviewed_at IS NOT NULL AND reviewed_by_user_id IS NOT NULL)
  )
);

CREATE TABLE time_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  collaborator_id uuid NOT NULL,
  exception_type text NOT NULL
    CHECK (exception_type IN ('gap', 'overlap', 'unallocated', 'missing_start', 'missing_end', 'cross_midnight', 'other')),
  starts_at timestamptz,
  ends_at timestamptz,
  reason text,
  resolution_status text NOT NULL DEFAULT 'open' CHECK (resolution_status IN ('open', 'justified', 'resolved', 'waived')),
  resolved_by_user_id uuid,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, resolved_by_user_id) REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT time_exception_bounds CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at > starts_at),
  CONSTRAINT time_exception_resolution CHECK (
    resolution_status = 'open'
    OR (btrim(coalesce(reason, '')) <> '' AND resolved_at IS NOT NULL AND resolved_by_user_id IS NOT NULL)
  )
);

-- 6. Recursos, condições, segurança, qualidade e continuidade ----------------

CREATE TABLE material_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  name text NOT NULL,
  normalized_name text NOT NULL,
  default_unit text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  UNIQUE (organization_id, normalized_name),
  UNIQUE (organization_id, id)
);

CREATE TABLE rdo_material_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  activity_group_id uuid,
  material_id uuid NOT NULL,
  movement_type text NOT NULL CHECK (movement_type IN ('used', 'received', 'missing')),
  quantity numeric(14,3) NOT NULL CHECK (quantity >= 0),
  unit text NOT NULL,
  notes text,
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, material_id) REFERENCES material_catalog(organization_id, id),
  FOREIGN KEY (organization_id, rdo_version_id, activity_group_id)
    REFERENCES rdo_activity_groups(organization_id, rdo_version_id, id),
  UNIQUE NULLS NOT DISTINCT (rdo_version_id, activity_group_id, material_id, movement_type)
);

CREATE TABLE equipment_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  asset_code text NOT NULL,
  name text NOT NULL,
  normalized_name text NOT NULL,
  asset_type text NOT NULL CHECK (asset_type IN ('equipment', 'tool')),
  active boolean NOT NULL DEFAULT true,
  UNIQUE (organization_id, asset_code),
  UNIQUE (organization_id, id)
);

CREATE TABLE rdo_equipment_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  activity_group_id uuid,
  equipment_id uuid NOT NULL,
  usage_minutes integer NOT NULL DEFAULT 0 CHECK (usage_minutes >= 0),
  downtime_minutes integer NOT NULL DEFAULT 0 CHECK (downtime_minutes >= 0),
  downtime_reason text,
  notes text,
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, equipment_id) REFERENCES equipment_assets(organization_id, id),
  FOREIGN KEY (organization_id, rdo_version_id, activity_group_id)
    REFERENCES rdo_activity_groups(organization_id, rdo_version_id, id),
  UNIQUE NULLS NOT DISTINCT (rdo_version_id, activity_group_id, equipment_id),
  CONSTRAINT equipment_downtime_reason CHECK (downtime_minutes = 0 OR btrim(coalesce(downtime_reason, '')) <> '')
);

CREATE TABLE rdo_conditions (
  rdo_version_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  weather_condition text,
  temperature_c numeric(5,2),
  impacted_execution boolean NOT NULL DEFAULT false,
  impact_description text,
  source text NOT NULL DEFAULT 'leader' CHECK (source IN ('leader', 'weather_api')),
  captured_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  CONSTRAINT weather_impact_description CHECK (
    NOT impacted_execution OR btrim(coalesce(impact_description, '')) <> ''
  )
);

CREATE TABLE rdo_safety_checklists (
  rdo_version_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  dds_performed boolean NOT NULL,
  ppe_compliant boolean NOT NULL,
  unsafe_condition_found boolean NOT NULL,
  details text,
  corrective_action text,
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT safety_critical_details CHECK (
    (dds_performed AND ppe_compliant AND NOT unsafe_condition_found)
    OR btrim(coalesce(details, '')) <> ''
  ),
  CONSTRAINT safety_corrective_action CHECK (
    NOT unsafe_condition_found OR btrim(coalesce(corrective_action, '')) <> ''
  )
);

CREATE TABLE rdo_occurrences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  occurrence_type text NOT NULL CHECK (occurrence_type IN ('incident', 'accident', 'blockage', 'near_miss', 'other')),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  occurred_at timestamptz NOT NULL,
  description text NOT NULL,
  immediate_action text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'monitoring', 'closed')),
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (organization_id, id),
  CONSTRAINT occurrence_text CHECK (btrim(description) <> '' AND btrim(immediate_action) <> '')
);

CREATE TABLE rdo_quality_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  activity_group_id uuid,
  record_type text NOT NULL CHECK (record_type IN ('inspection', 'test', 'nonconformity')),
  description text NOT NULL,
  result text NOT NULL CHECK (result IN ('approved', 'rejected', 'not_applicable', 'pending')),
  corrective_action text,
  created_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, created_by_user_id) REFERENCES organization_users(organization_id, user_id),
  FOREIGN KEY (organization_id, rdo_version_id, activity_group_id)
    REFERENCES rdo_activity_groups(organization_id, rdo_version_id, id),
  UNIQUE (organization_id, id),
  CONSTRAINT quality_rejection_action CHECK (
    result <> 'rejected' OR btrim(coalesce(corrective_action, '')) <> ''
  )
);

CREATE TABLE media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  storage_provider text NOT NULL CHECK (storage_provider IN ('s3', 'minio', 'azure_blob', 'other')),
  object_key text NOT NULL,
  original_filename text NOT NULL,
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL CHECK (size_bytes > 0),
  sha256 char(64) NOT NULL CHECK (sha256 ~ '^[0-9a-f]{64}$'),
  latitude numeric(9,6),
  longitude numeric(9,6),
  captured_at timestamptz,
  uploaded_by_user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, sha256),
  UNIQUE (storage_provider, object_key),
  UNIQUE (organization_id, id),
  FOREIGN KEY (organization_id, uploaded_by_user_id) REFERENCES organization_users(organization_id, user_id)
);

-- O áudio original permanece imutável em media_files. A transcrição é um
-- artefato derivado e auditável, nunca substitui nem sobrescreve o arquivo.
CREATE TABLE media_transcriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  media_file_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'cancelled')),
  transcription_text text,
  language_code text,
  provider text,
  model_name text,
  confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
  error_message text,
  requested_by_user_id uuid NOT NULL,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, media_file_id) REFERENCES media_files(organization_id, id),
  FOREIGN KEY (organization_id, requested_by_user_id)
    REFERENCES organization_users(organization_id, user_id),
  UNIQUE (media_file_id),
  UNIQUE (organization_id, id),
  CONSTRAINT transcription_result CHECK (
    (status = 'completed' AND btrim(coalesce(transcription_text, '')) <> '' AND completed_at IS NOT NULL)
    OR (status = 'failed' AND btrim(coalesce(error_message, '')) <> '')
    OR status IN ('queued', 'processing', 'cancelled')
  )
);
CREATE TRIGGER media_transcriptions_updated_at BEFORE UPDATE ON media_transcriptions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE evidence_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  media_file_id uuid NOT NULL,
  rdo_version_id uuid,
  activity_group_id uuid,
  occurrence_id uuid,
  quality_record_id uuid,
  caption text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, media_file_id) REFERENCES media_files(organization_id, id),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, activity_group_id) REFERENCES rdo_activity_groups(organization_id, id),
  FOREIGN KEY (organization_id, occurrence_id) REFERENCES rdo_occurrences(organization_id, id),
  FOREIGN KEY (organization_id, quality_record_id) REFERENCES rdo_quality_records(organization_id, id),
  CONSTRAINT evidence_one_parent CHECK (
    num_nonnulls(rdo_version_id, activity_group_id, occurrence_id, quality_record_id) = 1
  ),
  UNIQUE NULLS NOT DISTINCT (media_file_id, rdo_version_id, activity_group_id, occurrence_id, quality_record_id)
);

CREATE TABLE rdo_followups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  followup_type text NOT NULL CHECK (followup_type IN ('pending_item', 'next_step')),
  description text NOT NULL,
  responsible_user_id uuid,
  due_on date,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'done', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, responsible_user_id) REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT followup_description CHECK (btrim(description) <> '')
);

-- 7. Workflow, auditoria, comunicação e exportação --------------------------

CREATE TABLE workflow_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  rdo_version_id uuid NOT NULL,
  action text NOT NULL
    CHECK (action IN ('submitted', 'returned', 'approved', 'reviewed', 'reopened', 'director_changed', 'cancelled')),
  actor_user_id uuid NOT NULL,
  from_status text,
  to_status text NOT NULL,
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, actor_user_id) REFERENCES organization_users(organization_id, user_id)
);
CREATE INDEX workflow_actions_timeline_idx ON workflow_actions(rdo_version_id, created_at);
CREATE TRIGGER workflow_actions_immutable
BEFORE UPDATE OR DELETE ON workflow_actions
FOR EACH ROW EXECUTE FUNCTION reject_mutation();

CREATE TABLE audit_events (
  id bigserial PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  actor_user_id uuid,
  entity_table text NOT NULL,
  entity_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('insert', 'update', 'delete', 'status_change', 'export')),
  old_data jsonb,
  new_data jsonb,
  reason text,
  request_id uuid,
  source_ip inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, actor_user_id) REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT audit_has_change CHECK (old_data IS NOT NULL OR new_data IS NOT NULL)
);
CREATE INDEX audit_events_entity_idx ON audit_events(organization_id, entity_table, entity_id, created_at);
CREATE TRIGGER audit_events_immutable
BEFORE UPDATE OR DELETE ON audit_events
FOR EACH ROW EXECUTE FUNCTION reject_mutation();

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  recipient_user_id uuid NOT NULL,
  rdo_version_id uuid,
  notification_type text NOT NULL
    CHECK (notification_type IN ('reminder', 'submitted', 'returned', 'approved', 'reviewed', 'integration_error')),
  channel text NOT NULL DEFAULT 'in_app' CHECK (channel IN ('in_app', 'email', 'whatsapp', 'push')),
  title text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'read', 'failed', 'cancelled')),
  deduplication_key text NOT NULL,
  scheduled_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, rdo_version_id) REFERENCES rdo_versions(organization_id, id),
  FOREIGN KEY (organization_id, recipient_user_id) REFERENCES organization_users(organization_id, user_id),
  UNIQUE (organization_id, deduplication_key)
);

CREATE TABLE export_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  destination_connection_id uuid NOT NULL,
  export_type text NOT NULL DEFAULT 'imuv_timer_file' CHECK (export_type IN ('imuv_timer_file', 'imuv_timer_api')),
  idempotency_key text NOT NULL,
  status text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'generated', 'sent', 'imported', 'partial', 'failed', 'cancelled')),
  file_object_key text,
  file_sha256 char(64) CHECK (file_sha256 IS NULL OR file_sha256 ~ '^[0-9a-f]{64}$'),
  generated_by_user_id uuid,
  generated_at timestamptz,
  sent_at timestamptz,
  imported_at timestamptz,
  error_summary text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, destination_connection_id)
    REFERENCES integration_connections(organization_id, id),
  FOREIGN KEY (organization_id, generated_by_user_id)
    REFERENCES organization_users(organization_id, user_id),
  UNIQUE (destination_connection_id, idempotency_key),
  UNIQUE (organization_id, id)
);

CREATE TABLE export_rows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  export_batch_id uuid NOT NULL,
  work_allocation_id uuid NOT NULL,
  line_number integer NOT NULL CHECK (line_number > 0),
  timer_type text NOT NULL DEFAULT 'Tarefa' CHECK (timer_type = 'Tarefa'),
  task_code text NOT NULL,
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  collaborator_cpf_digits varchar(11) NOT NULL CHECK (collaborator_cpf_digits ~ '^[0-9]{11}$'),
  project_code text NOT NULL,
  client_document_digits varchar(14) NOT NULL CHECK (client_document_digits ~ '^[0-9]{11}([0-9]{3})?$'),
  payload_sha256 char(64) NOT NULL CHECK (payload_sha256 ~ '^[0-9a-f]{64}$'),
  import_status text NOT NULL DEFAULT 'pending' CHECK (import_status IN ('pending', 'accepted', 'rejected', 'unknown')),
  import_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, export_batch_id) REFERENCES export_batches(organization_id, id),
  FOREIGN KEY (organization_id, work_allocation_id) REFERENCES work_allocations(organization_id, id),
  UNIQUE (export_batch_id, line_number),
  UNIQUE (export_batch_id, work_allocation_id),
  UNIQUE (organization_id, payload_sha256),
  CONSTRAINT export_row_time CHECK (end_at > start_at)
);

-- 8. Validação transacional antes do envio ----------------------------------

CREATE FUNCTION submission_errors(p_rdo_version_id uuid)
RETURNS TABLE(error_code text, error_message text)
LANGUAGE sql STABLE SET search_path = rdo, pg_temp AS $$
  SELECT 'TIME_NOT_RECONCILED', 'A conciliação DIMEP x horários declarados ainda não foi concluída'
  FROM rdo_versions v
  WHERE v.id = p_rdo_version_id AND v.time_reconciled_at IS NULL

  UNION ALL
  SELECT 'NO_ACTIVITY', 'O RDO precisa ter pelo menos um grupo de atividade'
  WHERE NOT EXISTS (
    SELECT 1 FROM rdo_activity_groups g WHERE g.rdo_version_id = p_rdo_version_id
  )

  UNION ALL
  SELECT 'ACTIVITY_WITHOUT_TEAM', 'Existe atividade sem colaborador alocado'
  WHERE EXISTS (
    SELECT 1 FROM rdo_activity_groups g
    WHERE g.rdo_version_id = p_rdo_version_id
      AND NOT EXISTS (
        SELECT 1 FROM work_allocations a
        WHERE a.activity_group_id = g.id AND a.allocation_status = 'active'
      )
  )

  UNION ALL
  SELECT 'MISSING_DIVERGENCE', 'Horário alterado ou batida ausente sem justificativa de divergência'
  WHERE EXISTS (
    SELECT 1 FROM work_allocations a
    WHERE a.rdo_version_id = p_rdo_version_id
      AND a.allocation_status = 'active'
      AND (
        a.original_start_at IS NULL OR a.original_end_at IS NULL
        OR a.original_start_at <> a.declared_start_at
        OR a.original_end_at <> a.declared_end_at
      )
      AND NOT EXISTS (SELECT 1 FROM time_divergences d WHERE d.allocation_id = a.id)
  )

  UNION ALL
  SELECT 'OPEN_TIME_EXCEPTION', 'Há lacuna, sobreposição ou tempo não alocado sem resolução'
  WHERE EXISTS (
    SELECT 1 FROM time_exceptions e
    WHERE e.rdo_version_id = p_rdo_version_id AND e.resolution_status = 'open'
  )

  UNION ALL
  SELECT 'MISSING_SAFETY', 'O checklist de segurança é obrigatório'
  WHERE NOT EXISTS (
    SELECT 1 FROM rdo_safety_checklists s WHERE s.rdo_version_id = p_rdo_version_id
  )

  UNION ALL
  SELECT 'OCCURRENCE_WITHOUT_EVIDENCE', 'Toda ocorrência precisa de pelo menos uma evidência'
  WHERE EXISTS (
    SELECT 1 FROM rdo_occurrences o
    WHERE o.rdo_version_id = p_rdo_version_id
      AND NOT EXISTS (SELECT 1 FROM evidence_links e WHERE e.occurrence_id = o.id)
  );
$$;

CREATE FUNCTION guard_rdo_submission() RETURNS trigger
LANGUAGE plpgsql SET search_path = rdo, pg_temp AS $$
DECLARE
  messages text;
BEGIN
  IF NEW.status = 'submitted' AND OLD.status IS DISTINCT FROM 'submitted' THEN
    SELECT string_agg(error_code || ': ' || error_message, E'\n')
      INTO messages
      FROM submission_errors(NEW.id);
    IF messages IS NOT NULL THEN
      RAISE EXCEPTION 'RDO não pode ser enviado:%', E'\n' || messages;
    END IF;
    NEW.submitted_at := coalesce(NEW.submitted_at, now());
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER rdo_submission_guard BEFORE UPDATE OF status ON rdo_versions
FOR EACH ROW EXECUTE FUNCTION guard_rdo_submission();

-- Visão operacional: uma linha pronta para o layout de cronômetro do IMUV.
CREATE VIEW v_imuv_timer_candidates WITH (security_invoker = true) AS
SELECT
  a.organization_id,
  a.id AS work_allocation_id,
  'Tarefa'::text AS timer_type,
  t.code AS task_code,
  a.declared_start_at AS start_at,
  a.declared_end_at AS end_at,
  c.cpf_digits AS collaborator_cpf_digits,
  p.code AS project_code,
  cl.document_digits AS client_document_digits,
  v.status AS rdo_status
FROM work_allocations a
JOIN rdo_activity_groups g ON g.id = a.activity_group_id
JOIN rdo_versions v ON v.id = a.rdo_version_id
JOIN rdos r ON r.id = v.rdo_id
JOIN tasks t ON t.id = g.task_id
JOIN projects p ON p.id = r.project_id
JOIN clients cl ON cl.id = p.client_id
JOIN collaborators c ON c.id = a.collaborator_id
WHERE a.allocation_status = 'active'
  AND v.status IN ('approved', 'reviewed')
  AND c.cpf_digits IS NOT NULL
  AND cl.document_digits IS NOT NULL;

-- 9. Papel de execução e isolamento por tenant ------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rdo_runtime') THEN
    CREATE ROLE rdo_runtime NOLOGIN;
  END IF;
END;
$$;

CREATE FUNCTION current_organization_id() RETURNS uuid
LANGUAGE sql STABLE SET search_path = rdo, pg_temp AS $$
  SELECT nullif(current_setting('app.organization_id', true), '')::uuid;
$$;

GRANT USAGE ON SCHEMA rdo TO rdo_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA rdo TO rdo_runtime;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA rdo TO rdo_runtime;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA rdo TO rdo_runtime;
ALTER DEFAULT PRIVILEGES IN SCHEMA rdo
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO rdo_runtime;
ALTER DEFAULT PRIVILEGES IN SCHEMA rdo
  GRANT USAGE, SELECT ON SEQUENCES TO rdo_runtime;
ALTER DEFAULT PRIVILEGES IN SCHEMA rdo
  GRANT EXECUTE ON FUNCTIONS TO rdo_runtime;

DO $$
DECLARE
  tenant_table record;
BEGIN
  FOR tenant_table IN
    SELECT DISTINCT c.table_name
      FROM information_schema.columns c
      JOIN information_schema.tables t
        ON t.table_schema = c.table_schema AND t.table_name = c.table_name
     WHERE c.table_schema = 'rdo'
       AND c.column_name = 'organization_id'
       AND t.table_type = 'BASE TABLE'
       AND c.table_name <> 'organizations'
  LOOP
    EXECUTE format('ALTER TABLE rdo.%I ENABLE ROW LEVEL SECURITY', tenant_table.table_name);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON rdo.%I TO rdo_runtime '
      || 'USING (organization_id = rdo.current_organization_id()) '
      || 'WITH CHECK (organization_id = rdo.current_organization_id())',
      tenant_table.table_name
    );
  END LOOP;
END;
$$;

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY organizations_current_tenant ON organizations
  FOR SELECT TO rdo_runtime
  USING (id = current_organization_id());

ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY app_users_current_tenant_select ON app_users
  FOR SELECT TO rdo_runtime
  USING (
    EXISTS (
      SELECT 1 FROM organization_users ou
      WHERE ou.user_id = app_users.id
        AND ou.organization_id = current_organization_id()
        AND ou.active
    )
  );
CREATE POLICY app_users_current_tenant_update ON app_users
  FOR UPDATE TO rdo_runtime
  USING (
    EXISTS (
      SELECT 1 FROM organization_users ou
      WHERE ou.user_id = app_users.id
        AND ou.organization_id = current_organization_id()
        AND ou.active
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_users ou
      WHERE ou.user_id = app_users.id
        AND ou.organization_id = current_organization_id()
        AND ou.active
    )
  );

COMMIT;
