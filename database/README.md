# Banco PostgreSQL do RDO

## Arquivos

- `001_initial_schema.sql`: esquema relacional, constraints, triggers e view de exportação IMUV.
- `002_create_runtime_user.sh`: cria o login restrito usado pelo backend.
- `003_field_diary_extensions.sql`: adiciona PT por atividade e transcrição de mídia.
- `004_collaborator_profile_overrides.sql`: adiciona correções cadastrais locais sem sobrescrever as fontes sincronizadas.
- `005_dimep_sync_issues.sql`: registra, sem vínculo obrigatório com RDO, pendências de identidade e pareamento vindas do DIMEP.
- `006_hr_employee_imuv.sql`: adiciona o perfil RH e campos cadastrais auditáveis usados na prévia de envio de funcionários ao IMUV.
- `007_work_assignments.sql`: registra a distribuição planejada de tarefas para posterior conciliação com IMUV e DIMEP.
- `008_sanitize_collaborator_labels.sql`: cria `rdo.display_label()` e limpa cargos/departamentos herdados como `[object Object]`.
- `009_sync_schedules.sql`: guarda a agenda da sincronização automática de apontamentos (próximo disparo, janela e resultado da última execução).
- `010_rbac_and_duplicates.sql`: matriz de permissão por página e perfil, e o registro das decisões sobre cadastros duplicados.
- `DICIONARIO_DADOS_MVP.md`: modelo funcional para revisão do diretor.
- `docker-compose.database.yml`: stack PostgreSQL para Portainer/Docker.
- `.env.example`: nomes das variáveis, sem credenciais reais.

## Subida local

1. Copie `.env.example` para `.env` e troque a senha.
2. Execute `docker compose -f docker-compose.database.yml up -d`.
3. O SQL em `docker-entrypoint-initdb.d` roda apenas quando o volume está vazio.

Em ambientes que já tenham dados, não apague o volume para aplicar mudanças. Use migrações incrementais versionadas.

## Como uma migração nova é aplicada

Basta criar o arquivo aqui, com o próximo número. **Não é preciso editar o `docker-compose.mvp.yml`.**

O schema inteiro é aplicado pelo serviço `migrate`, que roda a imagem `rdo-migrations` — os `.sql` vão **dentro da imagem**, publicados pelo mesmo workflow do webapp. O `docker-entrypoint-initdb.d` do Postgres não é mais usado.

O `apply.sh` decide sozinho o cenário: consulta `to_regclass('rdo.organizations')` e, se a base ainda não tem schema, roda o `001` antes do resto. Depois aplica o `002` e todos os `*.sql` de `003` em diante, em ordem. É o mesmo caminho para instalação nova e para base existente.

Isso substituiu um arranjo com bind mount de `./database`, que quebrava de forma silenciosa: quando o caminho não existe no host, o Docker cria um **diretório vazio** no lugar do arquivo, e o erro só aparecia lá na frente como `psql: could not read from input file: Is a directory`. Com o Portainer isso era quase garantido, porque ele clona o repositório para dentro do próprio container, enquanto quem resolve o bind mount é o daemon do Docker no host.

Por isso **toda migração de `003` em diante precisa ser idempotente**: ela roda de novo a cada subida da stack. Use `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, `CREATE OR REPLACE FUNCTION`, `DROP POLICY IF EXISTS` antes de `CREATE POLICY`, `DROP TRIGGER IF EXISTS` antes de `CREATE TRIGGER` (ou um `DO` que consulte `pg_trigger`) e `ON CONFLICT DO NOTHING` em qualquer seed.

O arranjo anterior mantinha duas listas de arquivos no compose, uma para o `initdb` e outra para o `migrate`. O `005` acabou faltando na primeira: em volume novo o `011` tentava indexar `dimep_sync_issues` antes de a tabela existir, o `initdb` abortava, o Postgres nunca ficava *healthy* e o `migrate` falhava em seguida. A instância que já estava no ar nunca percebeu, porque nela o `initdb` não roda mais.

## Conexão do backend

Dentro da rede Docker, use host `postgres`, porta `5432`, banco `rdo` e o usuário de `POSTGRES_RUNTIME_USER`. Não use `rdo_admin` no backend e não publique a porta do PostgreSQL na internet. O backend deve entrar na rede `rdo_internal` e oferecer uma API HTTPS para web/PWA/Flutter.

Em toda transação do backend, antes de consultar ou gravar dados, execute `SET LOCAL app.organization_id = '<uuid-do-tenant>';`. As políticas de Row Level Security bloqueiam leitura e escrita fora desse tenant. Criação inicial de usuários/tenants fica restrita ao fluxo administrativo, porque o papel de execução não pode inserir em `app_users` nem em `organizations`.

As credenciais IMUV e DIMEP devem ser Docker Secrets ou variáveis protegidas. Grave no banco somente o nome/referência do secret em `integration_connections.secret_ref`.

## Mídia de rascunho sem vínculo

`POST /api/media/staging` grava a evidência em `media_files` antes de o RDO existir; o vínculo em `evidence_links` só é criado quando o rascunho é salvo. Um formulário abandonado deixa a mídia órfã.

A limpeza é feita por `rdo-webapp/scripts/cleanup-orphan-media.mjs`. Ele apaga somente mídia sem `evidence_links` e sem transcrição, com mais de `MEDIA_ORPHAN_MAX_AGE_HOURS` (padrão 48). Rode uma vez por dia.

**Pelo terminal**, o stack publica um serviço sob demanda:

```bash
docker compose -f docker-compose.mvp.yml --profile maintenance run --rm media-cleanup
```

**Pelo Portainer** (stack vindo do Git, sem acesso ao `docker compose run`), use o console do container do webapp, que já tem todas as variáveis de ambiente:

1. **Containers** → `rdo-interproject-web-1` → ícone **>_ Console** → **Connect** com `/bin/sh`.
2. Confira antes, sem apagar nada:
   ```sh
   DRY_RUN=1 node scripts/cleanup-orphan-media.mjs
   ```
3. Execute de verdade:
   ```sh
   node scripts/cleanup-orphan-media.mjs
   ```

Para automatizar no Portainer, crie uma segunda stack de uma linha com a mesma imagem e um agendamento externo, ou use **Edge Jobs** (Portainer Business) apontando para o mesmo comando.

Para inspecionar manualmente o que está pendente:

```sql
SELECT m.id, m.object_key
  FROM rdo.media_files m
 WHERE NOT EXISTS (SELECT 1 FROM rdo.evidence_links e WHERE e.media_file_id = m.id)
   AND m.created_at < now() - interval '2 days';
```

A ordem importa: o objeto sai do storage antes da linha, para nunca restar um registro apontando para um arquivo inexistente.

## Primeiro cadastro

Não há seed com CNPJ ou IDs inventados. Cadastre a GLB Tech apenas quando CNPJ, tenant DIMEP e subdomínio/tenant IMUV forem confirmados.
