# Evolução do RDO integrado ao IMUV, DIMEP e OMIE

Data da revisão: 19/08/2026

## Princípio de arquitetura

O aplicativo não deve criar um cadastro paralelo sem origem. O desenho adotado mantém:

- **IMUV** como mestre de clientes, projetos, tarefas, equipes e dados operacionais relacionados;
- **DIMEP** como mestre das batidas e da jornada efetivamente realizada;
- **Aplicativo RDO** como registro de execução em campo, evidências, segurança, distribuição do tempo e trilha de aprovação;
- **OMIE**, em etapa futura, como mestre financeiro/fiscal e de ERP, usando identificadores externos preservados desde agora.

O CPF validado e um De-Para confirmado são usados para conciliar colaboradores. Nome isolado não é chave definitiva.

## O que a API IMUV pode fornecer ao aplicativo

| Domínio | Recursos IMUV | Informações úteis | Onde popular no aplicativo | Prioridade |
|---|---|---|---|---|
| Colaborador | `/collaborator`, `/department` | nome, CPF, e-mail, telefones, foto, empresa, admissão, expediente, departamento, profissão, função/nível, gestor, horista e situação ativa | seletor de equipe, perfil, filtros, permissões e planejamento | Alta |
| Cliente | `/people` | nome/razão social, CPF/CNPJ, contatos, endereços, observação e `id_omie` | cabeçalho do projeto, contatos e futuro De-Para OMIE | Alta |
| Projeto | `/project` | código, nome, cliente, descrição, endereço, datas, prazo, status, progresso, membros, horas estimadas e custos agregados | projeto, local padrão, prazo, painel e filtros | Alta |
| Tarefa | `/task` | nome, projeto relacionado, descrição, observação, prioridade, datas, status, responsável, seguidores, departamento, horas estimadas, tempo total e peso | RDO, distribuição de trabalho, responsáveis e comparação planejado x realizado | Alta |
| Fluxo | `/workflow`, `/card-status` | fluxo, etapas, ordem, cores e status ativos | status legível da tarefa/projeto e filas operacionais | Média |
| Checklist | `/layout_checklist`, `/layout_checklist_group`, `/layout_checklist_item`, `/layout_checklist_item_workflow` | modelos, grupos, itens, ordem, conclusão, comentário e etapa | checklists de qualidade, comissionamento e segurança no RDO | Alta |
| Materiais e serviços | `/product`, `/service`, `/kit` | código, nome, unidade, estoque, dimensões, valor e dados técnicos | catálogo de materiais/serviços e medições | Média |
| Estoque | `/warehouse`, `/stock-movement` | locais, saldos e movimentos | recebidos, utilizados e faltantes do diário | Média |
| Produção | `/production-order` | projeto, colaborador, previsão, execução, status e observação | programação e confirmação de execução | Média |
| Pendências pessoais | `/todo` | descrição, data, hora e conclusão | próximos passos e alertas do líder | Baixa |

### Dados que não devem ser copiados sem necessidade

Salário, documentos pessoais extensos, filiação, dados de CNH/CTPS/passaporte e credenciais de configuração não são necessários ao RDO. A integração deve aplicar minimização de dados e regras de acesso compatíveis com LGPD.

## Cobertura atual do conector

Hoje o pull implementado consulta `people`, `collaborator`, `project` e `task`, preserva snapshots brutos e IDs externos e cria os relacionamentos locais. A revisão atual também normaliza função e departamento quando a API devolve esses valores como objetos, evitando a exibição de `[object Object]`.

Ainda devem ser ampliados e homologados:

1. `department`, profissão, função e expediente como catálogos relacionados, em vez de apenas texto;
2. prazo, prioridade, estimativa, progresso e workflow de projeto/tarefa;
3. modelos e itens de checklist;
4. produtos, serviços, estoque e ordens de produção;
5. escrita de responsáveis/distribuição no IMUV.

A documentação pública analisada não apresenta um endpoint específico de cronômetro/timesheet. Por isso, o apontamento aprovado continua sendo exportado no leiaute de sete campos até que um endpoint do tenant seja formalmente homologado. O payload de escrita de responsáveis da tarefa também não deve ser inventado.

## Correções de produto desta etapa

- cabeçalhos de Apontamentos explicam data, origem, tempo, alocações e conciliação;
- divergência abre a lista de problemas e permite aceitar a justificativa, solicitar correção ou dispensar uma ocorrência DIMEP com justificativa;
- equipe do RDO usa resumo + modal rolável com pesquisa por nome, CPF ou função;
- textos técnicos ambíguos, como `cadastro geral`, foram substituídos por origem explícita;
- fotos e áudios podem ser selecionados antes de salvar e já nascem ligados ao rascunho;
- a nova área **Distribuir trabalho** registra colaborador, tarefa IMUV, data, intervalo e orientações, preservando o vínculo para conciliação DIMEP.

### Ajustes da revisão seguinte

- **Evidência do rascunho passou a subir por `POST /api/media/staging`.** O envio pelo corpo da Server Action estourava o limite padrão de 1 MB do Next e inviabilizava qualquer foto de celular. Agora o arquivo sobe assim que é escolhido, o formulário envia apenas os identificadores e o botão de salvar espera o envio terminar. O upload para o object storage também saiu de dentro da transação do banco.
- **`[object Object]` deixou de depender de saneamento manual.** A migração `008` cria `rdo.display_label()`, usada em todas as consultas de colaborador, e limpa os registros herdados. Cargo e setor ausentes agora aparecem como *“Cargo e setor ainda não sincronizados do IMUV”*, no lugar de “Função não informada · Sem departamento”.
- **Divergência**: a lista de detalhes passou a respeitar `allocation_status = 'active'`, alinhando o conteúdo do modal ao número mostrado no botão.
- **Mídia órfã**: rascunho abandonado deixa arquivo sem vínculo. A rotina de limpeza está descrita em `database/README.md`.
- **Rascunho recuperável**: o preenchimento do RDO fica no navegador do líder e pode ser recuperado após queda de sessão ou aba fechada.

### Ficha do colaborador e sincronização automática

- **Erro ao abrir um colaborador corrigido.** As consultas de ocorrências e qualidade usavam `SELECT DISTINCT` com `ORDER BY r.work_date`, expressão ausente da lista de seleção — o PostgreSQL recusava a consulta e a página inteira falhava. O `DISTINCT` era desnecessário: o `EXISTS` já garante uma linha por registro.
- **Jornada do relógio de ponto na ficha**: batidas fechadas dos últimos 45 dias, com o total do dia, o tempo já distribuído em RDO e a situação da cobertura.
- **Divergências acionáveis fora de Apontamentos**: o mesmo cartão de revisão aparece na ficha do colaborador, com aceitar, solicitar correção ou dispensar ocorrência DIMEP.
- **Sincronização automática de apontamentos** (`009_sync_schedules.sql`): o servidor importa as batidas a cada 60 minutos entre 06:00 e 23:59, e Apontamentos mostra o contador para a próxima execução, o resultado da última e o botão **Sincronizar agora**. A agenda vive no banco, então o contador sobrevive a reinício do container e é o mesmo para todos os usuários; `running_since` impede execução dupla.

## Próximas etapas recomendadas

1. **Aplicar as migrações e publicar a versão**: executar `007_work_assignments.sql`, `008_sanitize_collaborator_labels.sql` e `009_sync_schedules.sql`, fazer backup e publicar o webapp.
2. **Ressincronizar cadastros**: atualizar colaboradores para repopular cargo e setor a partir do IMUV já normalizado.
3. **Homologar o tenant IMUV**: validar expansões, paginação, permissões, formatos de datas, catálogos de profissão/função/departamento e o payload de responsáveis da tarefa.
4. **Teste de aceitação em campo**: líder cria rascunho com evidência, seleciona equipe, distribui trabalho e trata divergência; encarregado aprova; exportação é conferida no IMUV.
5. **Ampliar a automação da conciliação**: a sincronização incremental agendada já está no ar; faltam alertas de batida ausente e o fechamento automático quando todas as divergências forem aceitas.
6. **Expandir dados operacionais IMUV**: checklist, prioridade/prazos, produtos/serviços, estoque e ordens de produção, sempre com prévia e auditoria.
7. **Preparar OMIE**: definir De-Para de clientes, projetos, serviços/produtos e centros de custo sem duplicar o papel de mestre de cada sistema.

## Referências técnicas

- `API_DIMEP_IMUV_GUIA_DE_INTEGRACAO.md`
- `API_DIMEP_IMUV_CATALOGO_EXAUSTIVO.md`
- `specs/imuv-apiary-2026-03-27.json`
- `specs/dimep-swagger-v1.json`

