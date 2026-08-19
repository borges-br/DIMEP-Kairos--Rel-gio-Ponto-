-- Indices de performance para as telas de Colaboradores e Projetos.
--
-- Sem BEGIN/COMMIT de proposito: CREATE INDEX CONCURRENTLY nao pode rodar
-- dentro de um bloco de transacao. Rodando concorrente, a criacao nao bloqueia
-- escrita nas tabelas, o que permite aplicar em producao sem janela de parada.

SET search_path TO rdo, public;

-- project_members tem PK (project_id, collaborator_id). O join por colaborador
-- sozinho (telas de Colaboradores) nao alcanca o prefixo da PK e cai em seq scan.
CREATE INDEX CONCURRENTLY IF NOT EXISTS project_members_collaborator_idx
  ON project_members(organization_id, collaborator_id)
  WHERE active;

-- Mesmo caso: PK (task_id, collaborator_id), join por colaborador sem prefixo.
CREATE INDEX CONCURRENTLY IF NOT EXISTS task_assignees_collaborator_idx
  ON task_assignees(organization_id, collaborator_id)
  WHERE active;

-- dimep_sync_issues_open_idx e parcial em work_date; para contar pendencias por
-- colaborador sem filtrar data, o planner precisa de um indice proprio.
CREATE INDEX CONCURRENTLY IF NOT EXISTS dimep_sync_issues_collaborator_idx
  ON dimep_sync_issues(organization_id, collaborator_id)
  WHERE resolution_status = 'open';
