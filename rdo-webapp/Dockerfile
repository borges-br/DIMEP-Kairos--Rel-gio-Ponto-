# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Depois dos COPY de proposito: ARG/ENV invalidam todas as camadas seguintes,
# e BUILD_ID muda a cada commit. Aqui embaixo o node_modules continua em cache.
#
# BUILD_ID vira o deploymentId do Next, que protege contra skew entre o bundle
# ja carregado no navegador e o servidor novo. Precisa ser fixado no build: a
# config do standalone e serializada dentro de server.js.
ARG BUILD_ID=dev
ARG SERVER_ACTIONS_ALLOWED_ORIGINS=""
ENV DEPLOYMENT_VERSION=$BUILD_ID \
    SERVER_ACTIONS_ALLOWED_ORIGINS=$SERVER_ACTIONS_ALLOWED_ORIGINS
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
