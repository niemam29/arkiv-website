FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* package-lock.json* ./
RUN \
  if [ -f bun.lockb ]; then \
    npm install -g bun && bun install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci --only=production && npm cache clean --force; \
  else \
    npm install --only=production && npm cache clean --force; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Skip TypeScript compilation for now
# RUN npm run build

# Production image, copy all the files and run payload
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payload

COPY --from=builder /app/*.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

USER payload

EXPOSE 1337

ENV PORT=1337

CMD ["npx", "tsx", "server.ts"]