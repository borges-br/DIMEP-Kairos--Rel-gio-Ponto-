# Decisões de produto e interface — MVP RDO

## Navegação

- Usar breadcrumbs sempre que houver hierarquia útil, especialmente `Projetos → Projeto → Tarefa/RDO` e `Diários → Detalhe`.
- Breadcrumbs complementam, mas não substituem, menu principal e navegação móvel.
- Em telas pequenas, manter o primeiro e o último nível visíveis quando o caminho completo não couber.

## Limite do protótipo Base44

As telas e o prompt fornecidos pela diretoria são referência de intenção e linguagem visual, não especificação técnica. Regras de segurança, normalização, tenant, auditoria, versionamento, idempotência e fontes mestres deste repositório prevalecem.

## Identidade do diário

O RDO é único por `organization + project + work_date`. Um diário diário pode conter várias tarefas em `rdo_activity_groups`. Não usamos `projeto + tarefa + data` como identidade do RDO porque isso fragmentaria o fechamento de uma equipe em várias fichas e multiplicaria aprovações.

## Permissão de Trabalho

Cada atividade/tarefa pode ter uma PT própria. `rdo_work_permits` registra número, abertura, fechamento e status sem misturar PTs de tarefas diferentes.

## Evidências e áudio

Arquivos ficam em armazenamento de objetos; o PostgreSQL recebe metadados, hash e vínculos. A transcrição é derivada em `media_transcriptions` e nunca substitui o áudio original.

## Clima e recursos

- O MVP usa quatro cards climáticos: `Ensolarado`, `Nublado`, `Chuvoso` e `Vento forte`.
- Materiais e equipamentos são coleções repetíveis, não campos únicos; cada item mantém quantidade/movimento ou tempos de uso/parada próprios.

## Funcionários e correções

O cadastro sincronizado não é sobrescrito por ajustes de tela. Correções de nome, matrícula, função e departamento ficam em `collaborator_profile_overrides`, exigem motivo e geram auditoria. O CPF continua sendo dado de conciliação e deve ser corrigido no fluxo de identidade DIMEP/IMUV.

Ocorrências exibidas no histórico de uma pessoa são ocorrências dos RDOs em que ela participou; isso não atribui responsabilidade individual automaticamente.

## Projetos e tarefas

As tarefas podem ser apresentadas como abas (por exemplo, Instalação, Manutenção, Testes e Comissionamento), mas continuam sendo criadas e mantidas exclusivamente no IMUV.

## Exportações

- Cronômetro IMUV: planilha operacional com o contrato exato da amostra `78a58f40a_chronometer2.xlsx`.
- Relatório do RDO: documento narrativo/PDF com atividades, equipe, PT, clima e evidências.
- O status do workflow do RDO e o status de uma exportação são independentes. Reenvios são controlados por lote, checksum e chave de idempotência.
