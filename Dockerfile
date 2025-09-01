FROM node:22-alpine AS base

WORKDIR /app

# =========================================================================== #

FROM base AS builder

ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

# =========================================================================== #

FROM builder AS api-pruner

RUN pnpm install --global turbo@^2.5.6

COPY . .

# https://turbo.build/repo/docs/guides/tools/docker#the-solution
RUN turbo prune @repo/api --docker

# =========================================================================== #

FROM builder AS api-installer

COPY --from=api-pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=api-pruner /app/out/full/ .
RUN pnpm build

# =========================================================================== #

FROM builder AS web-pruner

RUN pnpm install --global turbo@^2.5.6

COPY . .

# https://turbo.build/repo/docs/guides/tools/docker#the-solution
RUN turbo prune @repo/web --docker

# =========================================================================== #

FROM builder AS web-installer

COPY --from=web-pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=web-pruner /app/out/full/ .
RUN pnpm build

# =========================================================================== #

FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 hono

COPY --from=api-installer --chown=hono:nodejs /app .
COPY --from=web-installer --chown=hono:nodejs /app/apps/web/dist ../web/dist

EXPOSE 3000

USER hono

CMD node apps/api/dist/src/index.js
