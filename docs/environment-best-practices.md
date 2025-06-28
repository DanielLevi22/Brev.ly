# Melhores Práticas de Ambiente - Documentação

## 🌍 Configuração de Ambientes

### Visão Geral

O projeto Brev.ly implementa uma configuração robusta de ambientes seguindo as melhores práticas da indústria, garantindo separação adequada entre desenvolvimento, teste e produção.

## 📁 Estrutura de Arquivos de Ambiente

### Arquivos de Configuração

```
server/
├── .env                 # Desenvolvimento local
├── .env.test           # Ambiente de testes
├── .env.production     # Ambiente de produção
└── .env.example        # Template de configuração
```

### Configuração por Ambiente

#### 1. Desenvolvimento (`.env`)

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/brevly_dev"

# Server
PORT=3333
HOST=0.0.0.0

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET=brevly-dev
CLOUDFLARE_PUBLIC_URL=https://pub-xxx.r2.dev

# Logging
LOG_LEVEL=debug

# Security
JWT_SECRET=your_jwt_secret_dev
```

#### 2. Teste (`.env.test`)

```env
# Database - Banco isolado para testes
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/brevly_test"

# Server
PORT=3334
HOST=0.0.0.0

# Cloudflare R2 - Bucket separado para testes
CLOUDFLARE_BUCKET=brevly-test
CLOUDFLARE_PUBLIC_URL=https://pub-xxx-test.r2.dev

# Logging
LOG_LEVEL=error

# Security
JWT_SECRET=test_jwt_secret
```

#### 3. Produção (`.env.production`)

```env
# Database - Banco de produção
DATABASE_URL="postgresql://user:password@prod-db:5432/brevly_prod"

# Server
PORT=3333
HOST=0.0.0.0

# Cloudflare R2 - Bucket de produção
CLOUDFLARE_BUCKET=brevly-prod
CLOUDFLARE_PUBLIC_URL=https://pub-xxx-prod.r2.dev

# Logging
LOG_LEVEL=info

# Security
JWT_SECRET=your_secure_production_jwt_secret
```

## 🗄️ Configuração de Banco de Dados

### Separação de Bancos

#### 1. Desenvolvimento
- **Banco**: `brevly_dev`
- **Propósito**: Desenvolvimento local
- **Dados**: Pode conter dados de teste
- **Reset**: Manual quando necessário

#### 2. Teste
- **Banco**: `brevly_test`
- **Propósito**: Execução de testes automatizados
- **Dados**: Sempre limpo antes dos testes
- **Reset**: Automático antes de cada execução

#### 3. Produção
- **Banco**: `brevly_prod`
- **Propósito**: Dados reais dos usuários
- **Dados**: Dados críticos - nunca deletar
- **Reset**: Nunca

### Scripts de Migração

#### Migração por Ambiente

```bash
# Desenvolvimento
npm run migrate:dev

# Teste
npm run migrate:test

# Produção
npm run migrate:prod
```

#### Implementação dos Scripts

```json
// package.json
{
  "scripts": {
    "migrate:dev": "dotenv -e .env -- drizzle-kit migrate",
    "migrate:test": "dotenv -e .env.test -- drizzle-kit migrate",
    "migrate:prod": "dotenv -e .env.production -- drizzle-kit migrate"
  }
}
```

### Limpeza do Banco de Teste

#### Script de Reset

```bash
#!/bin/bash
# scripts/reset-test-db.sh

echo "🧹 Limpando banco de teste..."

# Parar container se estiver rodando
docker-compose down

# Iniciar apenas o banco
docker-compose up -d postgres

# Aguardar banco estar pronto
echo "⏳ Aguardando banco estar pronto..."
until docker-compose exec -T postgres pg_isready -U postgres; do
  sleep 1
done

# Dropar e recriar banco de teste
docker-compose exec -T postgres psql -U postgres -c "DROP DATABASE IF EXISTS brevly_test;"
docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE brevly_test;"

# Executar migrações
npm run migrate:test

echo "✅ Banco de teste limpo e pronto!"
```

## 🧪 Configuração de Testes

### Isolamento de Testes

#### 1. Banco Isolado

```typescript
// server/src/controllers/create-link.e2e.spec.ts
describe('E2E - Create Link', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Limpar dados antes de cada teste
    await db.delete(links);
  });

  it('should create a new link', async () => {
    // Teste isolado
  });
});
```

#### 2. Configuração de Teste

```typescript
// server/src/app.ts
const app = fastify({
  logger: process.env.NODE_ENV === 'test' ? false : logger,
  // Outras configurações específicas para teste
});
```

### Scripts de Teste

#### Execução Isolada

```bash
# Testes unitários
npm run test:unit

# Testes E2E com banco isolado
npm run test:e2e

# Todos os testes
npm run test:full
```

#### Implementação

```json
// package.json
{
  "scripts": {
    "test:unit": "dotenv -e .env.test -- vitest run src/use-cases/*.test.ts src/shared/errors/*.test.ts",
    "test:e2e": "./scripts/test-e2e-isolated.sh",
    "test:full": "pnpm test:unit && pnpm test:e2e"
  }
}
```

## 🔧 Configuração de Aplicação

### Validação de Variáveis de Ambiente

#### Schema de Validação

```typescript
// server/src/env.ts
import { z } from 'zod';

export const env = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Server
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('0.0.0.0'),
  
  // Cloudflare R2
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string().url(),
  
  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Security
  JWT_SECRET: z.string().min(32),
}).parse(process.env);
```

### Configuração Dinâmica

#### Por Ambiente

```typescript
// server/src/config/database.ts
export const databaseConfig = {
  url: env.DATABASE_URL,
  pool: {
    min: env.NODE_ENV === 'production' ? 5 : 1,
    max: env.NODE_ENV === 'production' ? 20 : 5,
  },
  logging: env.NODE_ENV === 'development',
};
```

## 🐳 Docker e Containers

### Docker Compose

#### Desenvolvimento

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: brevly_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Teste

```yaml
# docker-compose.test.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: brevly_test
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5433:5432"  # Porta diferente para evitar conflito
```

### Scripts Docker

```bash
# Iniciar ambiente de desenvolvimento
npm run docker:up

# Parar ambiente
npm run docker:down

# Reiniciar ambiente
npm run docker:restart
```

## 🔒 Segurança por Ambiente

### Variáveis Sensíveis

#### Desenvolvimento
- **JWT_SECRET**: Chave simples para desenvolvimento
- **DATABASE_URL**: Local com credenciais básicas
- **R2**: Bucket de desenvolvimento

#### Teste
- **JWT_SECRET**: Chave específica para testes
- **DATABASE_URL**: Banco isolado para testes
- **R2**: Bucket separado para testes

#### Produção
- **JWT_SECRET**: Chave forte e única
- **DATABASE_URL**: Credenciais seguras
- **R2**: Bucket de produção com políticas restritivas

### Políticas de Acesso

#### R2 por Ambiente

```typescript
// Configurações específicas por ambiente
const r2Config = {
  development: {
    bucket: 'brevly-dev',
    publicUrl: 'https://pub-dev.r2.dev',
    cors: ['http://localhost:5173'],
  },
  test: {
    bucket: 'brevly-test',
    publicUrl: 'https://pub-test.r2.dev',
    cors: ['http://localhost:5174'],
  },
  production: {
    bucket: 'brevly-prod',
    publicUrl: 'https://pub-prod.r2.dev',
    cors: ['https://brevly.com'],
  },
};
```

## 📊 Monitoramento por Ambiente

### Logs

#### Desenvolvimento
- **Nível**: `debug`
- **Formato**: Colorido e detalhado
- **Destino**: Console

#### Teste
- **Nível**: `error`
- **Formato**: Estruturado
- **Destino**: Arquivo de log

#### Produção
- **Nível**: `info`
- **Formato**: JSON estruturado
- **Destino**: Sistema de logs (CloudWatch, etc.)

### Métricas

#### Desenvolvimento
- Logs detalhados de performance
- Debug de queries SQL
- Stack traces completos

#### Teste
- Logs de erro apenas
- Métricas de cobertura de teste
- Tempo de execução dos testes

#### Produção
- Métricas de performance
- Alertas de erro
- Monitoramento de saúde

## 🚀 Deploy por Ambiente

### Desenvolvimento

```bash
# Setup local
npm install
npm run docker:up
npm run migrate:dev
npm run dev
```

### Teste

```bash
# Setup de teste
npm run docker:restart
./scripts/reset-test-db.sh
npm run test:full
```

### Produção

```bash
# Deploy de produção
npm run build
npm run migrate:prod
npm start
```

## 📋 Checklist de Implementação

### ✅ Configuração de Ambiente
- [ ] Arquivos `.env` separados por ambiente
- [ ] Validação de variáveis com Zod
- [ ] Configuração dinâmica por ambiente
- [ ] Template `.env.example`

### ✅ Banco de Dados
- [ ] Bancos separados por ambiente
- [ ] Scripts de migração por ambiente
- [ ] Limpeza automática do banco de teste
- [ ] Isolamento de dados

### ✅ Testes
- [ ] Configuração isolada para testes
- [ ] Banco de teste separado
- [ ] Limpeza antes de cada teste
- [ ] Scripts de execução isolada

### ✅ Segurança
- [ ] Variáveis sensíveis por ambiente
- [ ] Políticas de acesso R2
- [ ] Configuração CORS por ambiente
- [ ] Logs apropriados por ambiente

### ✅ Monitoramento
- [ ] Níveis de log por ambiente
- [ ] Métricas específicas por ambiente
- [ ] Alertas configurados
- [ ] Documentação de troubleshooting

## 🎯 Benefícios Implementados

### Desenvolvimento
- ✅ **Ambiente isolado** para desenvolvimento
- ✅ **Dados seguros** sem risco de produção
- ✅ **Debugging facilitado** com logs detalhados
- ✅ **Setup rápido** com Docker

### Testes
- ✅ **Testes confiáveis** com banco isolado
- ✅ **Execução rápida** sem interferência
- ✅ **Cobertura completa** sem dados externos
- ✅ **Reproduzibilidade** garantida

### Produção
- ✅ **Segurança máxima** com configurações restritivas
- ✅ **Performance otimizada** para produção
- ✅ **Monitoramento completo** com alertas
- ✅ **Deploy seguro** com validações

Esta documentação garante que o projeto siga as melhores práticas de configuração de ambiente, proporcionando segurança, confiabilidade e facilidade de manutenção em todos os ambientes. 