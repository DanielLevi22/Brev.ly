import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env, getDatabaseConfig } from './env'
import { routes } from './routes'
import { db } from './db'
import { sql } from 'drizzle-orm'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: process.env.NODE_ENV !== 'production' ? {
      target: 'pino-pretty',
      options: { colorize: true }
    } : undefined
  }
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Create Short url',
      description: 'API for create short Url',
      version: '1.0.0',
    },
  },
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Health check endpoint para o Render com verificação do banco
app.get('/health', async (request, reply) => {
  try {
    const dbConfig = getDatabaseConfig()
    
    // Testar conexão com banco
    await db.execute(sql`SELECT 1`)
    
    return reply.status(200).send({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: 'connected',
      database_type: dbConfig.databaseType,
      database_host: dbConfig.url.split('@')[1]?.split('/')[0] || 'localhost'
    })
  } catch (error) {
    app.log.error({ err: error }, 'Health check failed - database connection error')
    return reply.status(503).send({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.register(routes)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    app.log.warn({ err: error, req: request }, 'Validation Error')
    return reply
      .status(400)
      .send({ error: 'Validation Error', type: 'ValidationError' })
  }

  app.log.error({ err: error, req: request }, 'Unhandled Error')
  return reply.status(500).send({ 
    error: error?.message || 'Internal Server Error', 
    type: error?.name || 'InternalServerError' 
  })
}) 