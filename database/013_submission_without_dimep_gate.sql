-- A conciliacao DIMEP deixa de impedir o envio do RDO.
--
-- TIME_NOT_RECONCILED bloqueava todo envio enquanto time_reconciled_at estivesse
-- nulo, ou seja: o RDO ficava preso esperando a sincronizacao do relogio de
-- ponto, que depende de evento externo e pode demorar. A conciliacao continua
-- sendo registrada e a tela de detalhe segue mostrando "Conciliacao DIMEP:
-- Pendente" — vira aviso, e nao tranca.
--
-- Os demais impedimentos permanecem: sao estruturais do proprio RDO (sem
-- atividade, atividade sem equipe, sem checklist de seguranca, ocorrencia sem
-- evidencia) e nao dependem de sistema externo.
--
-- A funcao e usada tambem pelo trigger guard_rdo_submission(), entao redefini-la
-- cobre os dois caminhos. Idempotente por ser CREATE OR REPLACE.

BEGIN;

SET search_path TO rdo, public;

CREATE OR REPLACE FUNCTION submission_errors(p_rdo_version_id uuid)
RETURNS TABLE(error_code text, error_message text)
LANGUAGE sql STABLE SET search_path = rdo, pg_temp AS $$
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

COMMIT;
