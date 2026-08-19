BEGIN;

SET search_path TO rdo, public;

-- Agenda da sincronizacao automatica. A linha e a fonte da verdade do proximo
-- disparo, entao o contador exibido ao usuario sobrevive a reinicio do container
-- e mostra o mesmo horario para todo mundo.
CREATE TABLE IF NOT EXISTS sync_schedules (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  provider text NOT NULL CHECK (provider IN ('dimep', 'imuv')),
  enabled boolean NOT NULL DEFAULT true,
  interval_minutes integer NOT NULL DEFAULT 60 CHECK (interval_minutes BETWEEN 5 AND 1440),
  window_start time NOT NULL DEFAULT '06:00',
  window_end time NOT NULL DEFAULT '23:59',
  lookback_days integer NOT NULL DEFAULT 1 CHECK (lookback_days BETWEEN 0 AND 30),
  next_run_at timestamptz NOT NULL DEFAULT now(),
  last_run_at timestamptz,
  last_trigger text CHECK (last_trigger IN ('schedule', 'manual')),
  last_status text CHECK (last_status IN ('succeeded', 'partial', 'failed')),
  last_message text,
  last_records_written integer,
  last_records_rejected integer,
  running_since timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, provider),
  CONSTRAINT sync_schedule_window CHECK (window_end > window_start)
);

DROP TRIGGER IF EXISTS sync_schedules_updated_at ON sync_schedules;
CREATE TRIGGER sync_schedules_updated_at BEFORE UPDATE ON sync_schedules
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

GRANT SELECT, INSERT, UPDATE ON sync_schedules TO rdo_runtime;
ALTER TABLE sync_schedules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON sync_schedules;
CREATE POLICY tenant_isolation ON sync_schedules TO rdo_runtime
  USING (organization_id = rdo.current_organization_id())
  WITH CHECK (organization_id = rdo.current_organization_id());

COMMIT;
