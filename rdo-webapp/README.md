# RDO Interproject / GLB Tech

Webapp do piloto GLB Tech para diário de campo, distribuição de horas e integrações DIMEP Kairos / IMUV. O endereço de produção previsto é `https://rdo.interproject.com.br`.

## O que já está implementado

- sessão opaca em cookie `HttpOnly`, hash do token no banco e bloqueio progressivo de login;
- perfis `leader`, `foreman`, `manager`, `director` e `admin`;
- isolamento por empresa com PostgreSQL Row Level Security;
- projetos, tarefas, clientes e equipes como dados mestres do IMUV;
- um grupo de atividade do líder gera apontamentos individuais para toda a equipe;
- horário declarado separado da cobertura DIMEP e justificativa de divergência;
- RDO versionado, segurança, condições, recursos, ocorrências, qualidade e continuidade;
- clima em quatro opções operacionais e listas repetíveis de materiais/equipamentos;
- evidências reais em S3/MinIO, com upload autenticado, hash, vínculo e leitura privada pelo backend;
- funcionários com projetos, histórico, divergências e correções locais auditáveis;
- tarefas do projeto em abas, sempre sincronizadas e administradas pelo IMUV;
- envio, devolução, aprovação, revisão e auditoria;
- interface responsiva instalável como PWA; um app Flutter pode consumir o mesmo backend no futuro.

O cronômetro público do IMUV ainda precisa ser homologado. Até isso ocorrer, o banco prepara lotes idempotentes para o layout de importação, sem fingir que existe um endpoint não documentado.

## Desenvolvimento

Requer Node.js 22+ e PostgreSQL 16+.

```bash
npm ci
npm run dev
```

As variáveis de desenvolvimento ficam em `.env.local`; use `.env.example` como referência. Nunca use o prefixo `NEXT_PUBLIC_` em credenciais DIMEP, IMUV, banco ou armazenamento.

Checagens:

```bash
npm run lint
npm run typecheck
npm run build
```

## Docker / Portainer

Na raiz do projeto:

1. Copie `.env.example` para `.env` e substitua todas as senhas e chaves.
2. Gere `APP_DEFAULT_ORGANIZATION_ID` com UUID v4 e não o altere depois do primeiro uso.
3. Se senhas tiverem caracteres reservados de URL (`@`, `:`, `/`, `%`), aplique URL encoding antes de usá-las na connection string do Compose.
4. Suba a stack: `docker compose -f docker-compose.mvp.yml up -d --build`.
5. Crie o primeiro administrador uma única vez: `docker compose -f docker-compose.mvp.yml --profile admin run --rm admin`.

O PostgreSQL não publica porta. Por padrão, o webapp escuta somente em `127.0.0.1:3000`; a API e o console MinIO ficam restritos a `127.0.0.1:9100` e `127.0.0.1:9101`. Para um proxy reverso em outro container, conecte-o à rede `rdo-interproject_rdo_edge` ou ajuste conscientemente `WEB_BIND_ADDRESS`.

## DNS e proxy reverso

- Crie o registro DNS de `rdo.interproject.com.br` para o IP do servidor.
- Termine TLS no Nginx, Traefik ou Caddy e redirecione HTTP para HTTPS.
- Encaminhe `Host`, `X-Forwarded-Proto`, `X-Forwarded-For` e um `X-Request-ID`.
- Limite o corpo de upload e a taxa de requisições no proxy.
- Não aplique cache a HTML autenticado, Server Actions ou rotas `/api`.
- Faça backup criptografado do volume PostgreSQL e, quando ativado, do bucket de evidências.

Exemplo Nginx resumido:

```nginx
server {
  listen 443 ssl http2;
  server_name rdo.interproject.com.br;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Request-ID $request_id;
    proxy_read_timeout 60s;
  }
}
```

## Banco e migrações

O schema inicial está em `../database/001_initial_schema.sql`. Os scripts em `docker-entrypoint-initdb.d` só executam com volume vazio. Depois do piloto iniciar, mudanças devem ser feitas por migrações incrementais; não remova o volume para atualizar estrutura.

O processo web usa `rdo_app`. `rdo_admin` existe apenas para migração e bootstrap. Toda transação do backend define o tenant local antes de consultar ou gravar.

## Integrações

As variáveis IMUV, DIMEP e S3/MinIO estão no `.env.example`. O navegador recebe somente status de configuração; tokens e senhas ficam no backend/Portainer. Antes de ativar sincronização:

- confirmar base URL, autenticação, tenant e paginação reais;
- validar identificadores de projeto/tarefa esperados pelo importador IMUV;
- confirmar timezone e semântica das batidas do DIMEP;
- registrar snapshots, cursor, contagens e erros em `sync_runs`;
- usar idempotência para impedir linhas duplicadas em reprocessamentos.
