# Multi-stage build para otimizar o tamanho da imagem
FROM node:20-alpine AS base

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Stage de dependências
FROM base AS deps
WORKDIR /app

# Copiar arquivos de dependências da raiz
COPY package.json pnpm-workspace.yaml ./
COPY server/package.json ./server/
COPY web/package.json ./web/

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Stage de build
FROM base AS builder
WORKDIR /app

# Copiar dependências
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY . .

# Build da aplicação
RUN cd server && pnpm build

# Remover dependências de desenvolvimento
RUN cd server && pnpm prune --prod

# Stage de produção
FROM node:20-alpine AS production

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Copiar arquivos necessários
COPY --from=builder --chown=nodejs:nodejs /app/server/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/server/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/server/package.json ./package.json

# Mudar para usuário não-root
USER nodejs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para iniciar a aplicação
CMD ["node", "dist/server.mjs"]