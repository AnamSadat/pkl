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

# 2. Copy package.json milik APPS/WEB
# Kita harus buat foldernya dulu biar strukturnya sama kayak aslinya
COPY apps/web/package.json ./apps/web/package.json

# 3. Install dependencies
# Ini akan install semua node_modules berdasarkan lockfile di root
RUN pnpm install --frozen-lockfile

# --- STAGE: BUILDER ---
FROM base AS builder
WORKDIR /app

# Copy node_modules dari stage deps
COPY --from=deps /app/node_modules ./node_modules
# Copy sisa source code (Semuanya, dari root)
COPY . .

# Build project (gunakan filter untuk build apps/web saja)
ENV NEXT_TELEMETRY_DISABLED=1
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