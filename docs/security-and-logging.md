# Segurança e Logging - Documentação

## 🔒 Melhorias de Segurança

### 1. Sanitização de Inputs

#### Implementação de Sanitização Dupla

Para proteger contra ataques XSS e injeção de HTML malicioso, implementamos sanitização dupla usando duas bibliotecas complementares:

```typescript
// server/src/controllers/create-link.ts
import xss from 'xss';
import sanitizeHtml from 'sanitize-html';

// Sanitização dupla para máxima segurança
const sanitizedOriginalUrl = sanitizeHtml(xss(originalUrl), {
  allowedTags: [],
  allowedAttributes: {},
});

const sanitizedShortUrl = sanitizeHtml(xss(shortUrl), {
  allowedTags: [],
  allowedAttributes: {},
});
```

#### Bibliotecas Utilizadas

- **xss**: Remove scripts e tags maliciosas
- **sanitize-html**: Remove HTML não permitido
- **@types/xss**: Tipos TypeScript para xss
- **@types/sanitize-html**: Tipos TypeScript para sanitize-html

#### Benefícios

- ✅ **Proteção XSS**: Remove scripts maliciosos
- ✅ **Sanitização HTML**: Remove tags HTML não permitidas
- ✅ **Dupla camada**: Duas bibliotecas complementares
- ✅ **Tipagem**: Suporte completo a TypeScript

### 2. Validação de Entrada

#### Schema de Validação com Zod

```typescript
// server/src/controllers/create-link.ts
const createLinkSchema = z.object({
  originalUrl: z.string().url('URL original deve ser uma URL válida'),
  shortUrl: z.string()
    .min(1, 'URL encurtada é obrigatória')
    .max(20, 'URL encurtada deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9-_]+$/, 'URL encurtada deve conter apenas letras, números, hífens e underscores'),
});
```

#### Validações Implementadas

- **URL Original**: Deve ser uma URL válida
- **URL Curta**: Máximo 20 caracteres, apenas caracteres seguros
- **Campos obrigatórios**: Validação de presença
- **Formato específico**: Regex para caracteres permitidos

## 📝 Logging Estruturado

### 1. Configuração do Pino

#### Instalação e Setup

```bash
npm install pino pino-pretty
```

#### Configuração no Fastify

```typescript
// server/src/app.ts
import fastify from 'fastify';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
});

const app = fastify({
  logger,
});
```

### 2. Interface de Logger

#### Logger Genérico

```typescript
// server/src/shared/logger/logger.ts
export interface Logger {
  info(message: string, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
  error(message: string, meta?: Record<string, any>): void;
  debug(message: string, meta?: Record<string, any>): void;
}
```

#### Adapter para Fastify

```typescript
// server/src/shared/fastify-logger-adapter.ts
import { FastifyLoggerInstance } from 'fastify';
import { Logger } from './logger/logger';

export function fastifyLoggerAdapter(fastifyLogger: FastifyLoggerInstance): Logger {
  return {
    info: (message: string, meta?: Record<string, any>) => {
      fastifyLogger.info(meta || {}, message);
    },
    warn: (message: string, meta?: Record<string, any>) => {
      fastifyLogger.warn(meta || {}, message);
    },
    error: (message: string, meta?: Record<string, any>) => {
      fastifyLogger.error(meta || {}, message);
    },
    debug: (message: string, meta?: Record<string, any>) => {
      fastifyLogger.debug(meta || {}, message);
    },
  };
}
```

### 3. Logging nos Controllers

#### Exemplo de Implementação

```typescript
// server/src/controllers/create-link.ts
export const createLinkController: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        body: createLinkSchema,
        response: {
          200: createLinkResponseSchema,
          400: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const logger = fastifyLoggerAdapter(request.log);
      
      logger.info('Recebida requisição para criar link', {
        originalUrl: request.body.originalUrl,
        shortUrl: request.body.shortUrl,
      });

      const makeCreateLinkUseCase = MakeCreateLinkUseCase();
      const result = await makeCreateLinkUseCase.execute(request.body);

      if (isRight(result)) {
        logger.info('Link criado com sucesso', {
          shortUrl: result.right.shortUrl,
        });
        return reply.status(200).send(result.right);
      }

      logger.warn('Erro ao criar link', {
        error: result.left,
      });

      const error = result.left;
      if (error instanceof InvalidUrlError) {
        return reply.status(400).send({ error: error.message, type: error.name });
      }
      // ... outros tratamentos de erro
    }
  );
};
```

### 4. Logs Estruturados

#### Formato dos Logs

```json
{
  "level": 30,
  "time": 1719580800000,
  "pid": 12345,
  "hostname": "server-1",
  "reqId": "req-1",
  "req": {
    "method": "POST",
    "url": "/link",
    "host": "127.0.0.1:3333",
    "remoteAddress": "::ffff:127.0.0.1",
    "remotePort": 12345
  },
  "msg": "Recebida requisição para criar link",
  "originalUrl": "https://www.google.com",
  "shortUrl": "google"
}
```

#### Benefícios do Logging Estruturado

- ✅ **Rastreabilidade**: Cada requisição tem um ID único
- ✅ **Contexto rico**: Metadados sobre a requisição
- ✅ **Performance**: Logs de tempo de resposta
- ✅ **Debugging**: Informações detalhadas para troubleshooting
- ✅ **Monitoramento**: Fácil integração com ferramentas de observabilidade

## 🛡️ Melhorias de Segurança Adicionais

### 1. Headers de Segurança

#### Configuração no Fastify

```typescript
// server/src/app.ts
import helmet from '@fastify/helmet';

await app.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});
```

### 2. Rate Limiting

#### Implementação com @fastify/rate-limit

```typescript
// server/src/app.ts
import rateLimit from '@fastify/rate-limit';

await app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: (request, context) => ({
    code: 429,
    error: 'Too Many Requests',
    message: `Rate limit exceeded, retry in ${context.after}`,
    expiresIn: context.ttl,
  }),
});
```

### 3. Validação de CORS

#### Configuração CORS

```typescript
// server/src/app.ts
import cors from '@fastify/cors';

await app.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
});
```

## 📊 Monitoramento e Observabilidade

### 1. Métricas de Performance

#### Logs de Performance

```typescript
// Log automático de tempo de resposta
logger.info('request completed', {
  reqId: request.id,
  res: {
    statusCode: reply.statusCode,
  },
  responseTime: reply.getResponseTime(),
});
```

### 2. Tratamento de Erros Global

#### Error Handler

```typescript
// server/src/app.ts
app.setErrorHandler((error, request, reply) => {
  const logger = fastifyLoggerAdapter(request.log);
  
  logger.error('Erro não tratado', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    reqId: request.id,
  });

  return reply.status(500).send({
    error: 'Erro interno do servidor',
    type: 'InternalServerError',
  });
});
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente

```env
# .env
NODE_ENV=development
LOG_LEVEL=info
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000
```

### Configuração por Ambiente

```typescript
// server/src/env.ts
export const env = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  FRONTEND_URL: z.string().url().optional(),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW: z.coerce.number().default(60000),
});
```

## 📈 Benefícios Implementados

### Segurança
- ✅ **Sanitização dupla** de inputs
- ✅ **Validação rigorosa** com Zod
- ✅ **Headers de segurança** com Helmet
- ✅ **Rate limiting** para prevenir abuso
- ✅ **CORS configurado** adequadamente

### Observabilidade
- ✅ **Logs estruturados** com Pino
- ✅ **Rastreabilidade** com request IDs
- ✅ **Métricas de performance** automáticas
- ✅ **Tratamento de erros** global
- ✅ **Contexto rico** nos logs

### Manutenibilidade
- ✅ **Interfaces tipadas** para logger
- ✅ **Adapters** para diferentes implementações
- ✅ **Configuração por ambiente**
- ✅ **Documentação completa**
- ✅ **Testes de segurança**

## 🧪 Testes de Segurança

### Testes de Sanitização

```typescript
// server/src/controllers/create-link.test.ts
it('should sanitize malicious input', async () => {
  const maliciousInput = {
    originalUrl: '<script>alert("xss")</script>https://www.google.com',
    shortUrl: 'test<script>alert("xss")</script>',
  };

  const response = await request(app.server)
    .post('/link')
    .send(maliciousInput);

  expect(response.status).toBe(400);
});
```

### Testes de Rate Limiting

```typescript
// server/src/app.test.ts
it('should enforce rate limiting', async () => {
  const requests = Array.from({ length: 101 }, () =>
    request(app.server).get('/links')
  );

  const responses = await Promise.all(requests);
  const rateLimited = responses.filter(r => r.status === 429);

  expect(rateLimited.length).toBeGreaterThan(0);
});
```

Esta documentação cobre todas as melhorias de segurança e logging implementadas no projeto, fornecendo uma base sólida para manutenção e evolução do sistema. 