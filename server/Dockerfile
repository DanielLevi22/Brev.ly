# Multi-stage build para otimizar o tamanho da imagem
FROM node:20-alpine AS base

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Stage de dependências e build
FROM base AS builder
WORKDIR /app

# Copiar arquivos de dependências da raiz e do server
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY server/package.json ./server/
COPY web/package.json ./web/

# Instalar dependências do monorepo
RUN pnpm install --frozen-lockfile

# Copiar todo o código e buildar o server
COPY . .
RUN cd server && pnpm build

# Prunar dependências para produção no server
RUN cd server && pnpm prune --prod

# Stage de produção enxuto
FROM node:20-alpine AS production
WORKDIR /app

# Copiar apenas arquivos essenciais do server
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/package.json ./package.json

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "dist/server.mjs"]