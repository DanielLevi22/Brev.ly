import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { routes } from './routes'

export const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Create Short url',
      description: 'API for create short Url',
      version: '1.0.0',
    },
  },
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})


server.register(routes)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.validation })
  }

  console.log(error)
  return reply.status(500).send({ 
    error: 'Internal Server Error', 
    type: 'InternalServerError' 
  })
})


server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server Running ${env.PORT}!`)
})