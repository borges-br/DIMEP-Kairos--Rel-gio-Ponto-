-- Frentes e locais de trabalho passam a ser cadastrados no proprio RDO, com
-- publicacao opcional no IMUV.
--
-- O IMUV nao tem entidade de frente/local: a unica forma de publicar uma e como
-- Tarefa (POST /task). Isso cria um problema de volta: no sync seguinte essa
-- tarefa retorna pelo GET /task e entraria em rdo.tasks como atividade comum,
-- duplicando a mesma coisa em duas telas. Guardar aqui o id remoto e o que
-- permite ao sync reconhecer e ignorar o que foi publicado por nos.
--
-- Idempotente de proposito: o servico "migrate" do compose reexecuta todos os
-- arquivos a cada subida.

BEGIN;

SET search_path TO rdo, public;

ALTER TABLE work_locations
  ADD COLUMN IF NOT EXISTS imuv_task_id text,
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS published_by_user_id uuid,
  ADD COLUMN IF NOT EXISTS created_by_user_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'work_locations_published_by_fk'
  ) THEN
    ALTER TABLE work_locations ADD CONSTRAINT work_locations_published_by_fk
      FOREIGN KEY (organization_id, published_by_user_id)
      REFERENCES organization_users(organization_id, user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'work_locations_created_by_fk'
  ) THEN
    ALTER TABLE work_locations ADD CONSTRAINT work_locations_created_by_fk
      FOREIGN KEY (organization_id, created_by_user_id)
      REFERENCES organization_users(organization_id, user_id);
  END IF;

  -- Publicado e tudo ou nada: sem os tres campos juntos nao da para auditar
  -- quem mandou o que para um sistema que ja esta em producao ha tempo.
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'work_location_publication'
  ) THEN
    ALTER TABLE work_locations ADD CONSTRAINT work_location_publication CHECK (
      (imuv_task_id IS NULL AND published_at IS NULL AND published_by_user_id IS NULL)
      OR (imuv_task_id IS NOT NULL AND published_at IS NOT NULL AND published_by_user_id IS NOT NULL)
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'work_location_label_not_blank'
  ) THEN
    ALTER TABLE work_locations ADD CONSTRAINT work_location_label_not_blank
      CHECK (btrim(label) <> '');
  END IF;
END $$;

-- Uma tarefa do IMUV nunca pode ser reivindicada por duas frentes: e essa
-- unicidade que garante que o filtro do sync nao deixe passar duplicata.
CREATE UNIQUE INDEX IF NOT EXISTS work_locations_imuv_task_uq
  ON work_locations(organization_id, imuv_task_id)
  WHERE imuv_task_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS work_locations_project_idx
  ON work_locations(organization_id, project_id)
  WHERE active;

COMMIT;
