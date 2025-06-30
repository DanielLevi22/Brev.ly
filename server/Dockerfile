# Multi-stage build para otimizar o tamanho da imagem
FROM node:20-alpine AS base

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Stage de dependências e build
FROM base AS builder
WORKDIR /app

# Copiar arquivos de dependências do server
COPY package.json pnpm-lock.yaml ./

# Instalar dependências (incluindo devDependencies para build)
RUN pnpm install --no-frozen-lockfile

# Copiar todo o código do server
COPY . .

# Buildar o server
RUN pnpm build

# Stage de produção enxuto
FROM node:20-alpine AS production
WORKDIR /app

# Copiar apenas arquivos essenciais
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Instalar apenas dependências de produção
RUN npm install --only=production

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# O Render usa a porta definida na variável de ambiente PORT
EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const port = process.env.PORT || 10000; require('http').get(\`http://localhost:\${port}/health\`, (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "dist/server.mjs"]