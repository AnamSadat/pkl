# apps/web/Dockerfile

FROM node:20.11.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# --- STAGE: DEPS ---
FROM base AS deps
WORKDIR /app

# 1. Copy file konfigurasi DARI ROOT (pnpm-lock & package.json root)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Copy semua package.json dari workspace packages
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/tailwind-config/package.json ./packages/tailwind-config/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json

# 3. Install dependencies
RUN pnpm install --frozen-lockfile

# --- STAGE: BUILDER ---
FROM base AS builder
WORKDIR /app

# Copy node_modules dari stage deps (root + all workspaces)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules

# Copy sisa source code (Semuanya, dari root)
COPY . .

# Build project (gunakan filter untuk build apps/web saja)
ENV NEXT_TELEMETRY_DISABLED=1

# Set API URL for Docker network
ARG NEXT_PUBLIC_API_URL=http://api:8000
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm --filter "./apps/web" run build

# --- STAGE: RUNNER ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder (Sesuaikan pathnya)
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copy hasil build standalone
# Ingat, nextjs standalone meniru struktur folder asli
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Jalankan server
CMD ["node", "apps/web/server.js"]