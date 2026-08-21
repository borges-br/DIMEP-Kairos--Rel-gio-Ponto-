#!/bin/sh
# Aplica o schema inteiro a partir de dentro da imagem, sem depender de nenhum
# arquivo no host. Serve tanto para base vazia quanto para base ja existente:
# e o mesmo caminho nos dois casos, o que elimina a divergencia entre o que o
# initdb do Postgres rodava e o que este servico rodava.
set -eu

PGHOST="${PGHOST:-postgres}"
PGUSER="${POSTGRES_USER:-rdo_admin}"
PGDATABASE="${POSTGRES_DB:-rdo}"
export PGHOST PGUSER PGDATABASE

psql_admin() {
  psql -v ON_ERROR_STOP=1 --no-psqlrc "$@"
}

# O 001 cria tudo com CREATE TABLE simples: reexecutar quebra. A presenca de
# rdo.organizations e o que distingue base nova de base ja migrada.
schema_pronto=$(psql_admin -tAc "SELECT to_regclass('rdo.organizations') IS NOT NULL")

if [ "$schema_pronto" != "t" ]; then
  echo "==> 001_initial_schema.sql (base vazia)"
  psql_admin -f /migrations/001_initial_schema.sql
else
  echo "--- 001_initial_schema.sql ja aplicado, pulando"
fi

# Idempotente por conta propria: so cria o papel quando ele nao existe.
echo "==> 002_create_runtime_user.sh"
sh /migrations/002_create_runtime_user.sh

# De 003 em diante tudo precisa ser idempotente: roda a cada subida da stack.
# Ver database/README.md.
for arquivo in /migrations/*.sql; do
  case "${arquivo##*/}" in 001_*) continue ;; esac
  echo "==> ${arquivo##*/}"
  psql_admin -f "$arquivo"
done

echo "Schema aplicado."
