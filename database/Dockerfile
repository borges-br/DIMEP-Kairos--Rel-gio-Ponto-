# syntax=docker/dockerfile:1
#
# Imagem que carrega o schema dentro de si. Sem isso o compose precisa de bind
# mount de ./database, e o Portainer clona o repositorio para dentro do proprio
# container: o daemon do Docker resolve o caminho no host, nao acha nada e cria
# diretorios vazios no lugar dos .sql, sem erro nenhum ate o psql reclamar que
# o arquivo "is a directory".
FROM postgres:16-alpine

ARG BUILD_ID=dev
LABEL org.opencontainers.image.revision=$BUILD_ID

COPY 0*.sql 002_create_runtime_user.sh /migrations/
COPY apply.sh /usr/local/bin/apply.sh

RUN chmod +x /usr/local/bin/apply.sh

USER postgres
ENTRYPOINT ["/usr/local/bin/apply.sh"]
