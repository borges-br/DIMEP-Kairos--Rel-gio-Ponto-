BEGIN;

SET search_path TO rdo, public;

-- Rotulos vindos das integracoes podem chegar vazios ou como "[object Object]".
-- display_label devolve NULL nesses casos para a interface decidir o texto exibido.
CREATE OR REPLACE FUNCTION display_label(value text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT nullif(nullif(btrim(value), ''), '[object Object]');
$$;

GRANT EXECUTE ON FUNCTION display_label(text) TO rdo_runtime;

-- Cargos e departamentos gravados antes da normalizacao das integracoes chegaram
-- ao banco como o texto literal "[object Object]" (objeto JSON convertido em string).
-- Estas linhas limpam o historico para que a interface nao precise tratar o caso.

UPDATE collaborators
   SET job_title = NULL
 WHERE job_title IS NOT NULL
   AND btrim(job_title) IN ('', '[object Object]');

UPDATE collaborators
   SET department = NULL
 WHERE department IS NOT NULL
   AND btrim(department) IN ('', '[object Object]');

-- Uma correcao local cujo unico conteudo era o rotulo invalido perde o proposito e
-- violaria collaborator_override_has_value; por isso ela sai antes do UPDATE.
DELETE FROM collaborator_profile_overrides
 WHERE num_nonnulls(
         full_name_override,
         employee_number_override,
         nullif(btrim(job_title_override), '[object Object]'),
         nullif(btrim(department_override), '[object Object]'),
         email_override,
         phone_override,
         active_override
       ) = 0;

UPDATE collaborator_profile_overrides
   SET job_title_override = nullif(btrim(job_title_override), '[object Object]'),
       department_override = nullif(btrim(department_override), '[object Object]')
 WHERE btrim(job_title_override) = '[object Object]'
    OR btrim(department_override) = '[object Object]';

COMMIT;
