import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './env'
import { routes } from './routes'
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