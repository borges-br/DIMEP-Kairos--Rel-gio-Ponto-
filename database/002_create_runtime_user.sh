#!/bin/sh
set -eu

: "${POSTGRES_RUNTIME_USER:=rdo_app}"
: "${POSTGRES_RUNTIME_PASSWORD:?defina POSTGRES_RUNTIME_PASSWORD}"

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  --set=runtime_user="$POSTGRES_RUNTIME_USER" \
  --set=runtime_password="$POSTGRES_RUNTIME_PASSWORD" <<-'EOSQL'
SELECT format(
  'CREATE ROLE %I LOGIN PASSWORD %L IN ROLE rdo_runtime',
  :'runtime_user',
  :'runtime_password'
)
WHERE NOT EXISTS (
  SELECT 1 FROM pg_roles WHERE rolname = :'runtime_user'
) \gexec
EOSQL
