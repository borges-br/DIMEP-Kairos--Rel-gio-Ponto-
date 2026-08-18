# Banco PostgreSQL do RDO

## Arquivos

- `001_initial_schema.sql`: esquema relacional, constraints, triggers e view de exportação IMUV.
- `002_create_runtime_user.sh`: cria o login restrito usado pelo backend.
- `003_field_diary_extensions.sql`: adiciona PT por atividade e transcrição de mídia.
- `004_collaborator_profile_overrides.sql`: adiciona correções cadastrais locais sem sobrescrever as fontes sincronizadas.
- `006_hr_employee_imuv.sql`: adiciona o perfil RH e campos cadastrais auditáveis usados na prévia de envio de funcionários ao IMUV.
- `005_dimep_sync_issues.sql`: registra, sem vínculo obrigatório com RDO, pendências de identidade e pareamento vindas do DIMEP.
- `DICIONARIO_DADOS_MVP.md`: modelo funcional para revisão do diretor.
- `docker-compose.database.yml`: stack PostgreSQL para Portainer/Docker.
- `.env.example`: nomes das variáveis, sem credenciais reais.

## Subida local

1. Copie `.env.example` para `.env` e troque a senha.
2. Execute `docker compose -f docker-compose.database.yml up -d`.
3. O SQL em `docker-entrypoint-initdb.d` roda apenas quando o volume está vazio.

Em ambientes que já tenham dados, não apague o volume para aplicar mudanças. Use migrações incrementais versionadas.

## Conexão do backend

Dentro da rede Docker, use host `postgres`, porta `5432`, banco `rdo` e o usuário de `POSTGRES_RUNTIME_USER`. Não use `rdo_admin` no backend e não publique a porta do PostgreSQL na internet. O backend deve entrar na rede `rdo_internal` e oferecer uma API HTTPS para web/PWA/Flutter.

Em toda transação do backend, antes de consultar ou gravar dados, execute `SET LOCAL app.organization_id = '<uuid-do-tenant>';`. As políticas de Row Level Security bloqueiam leitura e escrita fora desse tenant. Criação inicial de usuários/tenants fica restrita ao fluxo administrativo, porque o papel de execução não pode inserir em `app_users` nem em `organizations`.

As credenciais IMUV e DIMEP devem ser Docker Secrets ou variáveis protegidas. Grave no banco somente o nome/referência do secret em `integration_connections.secret_ref`.

## Primeiro cadastro

Não há seed com CNPJ ou IDs inventados. Cadastre a GLB Tech apenas quando CNPJ, tenant DIMEP e subdomínio/tenant IMUV forem confirmados.
