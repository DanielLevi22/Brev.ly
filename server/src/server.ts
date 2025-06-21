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
import { createLinkController } from './controllers/create-link'
import { deleteLinkController } from './controllers/delete-link'

export const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Image API',
      description: 'API for managing images',
      version: '1.0.0',
    },
  },
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})


server.register(createLinkController)
server.register(deleteLinkController)
server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.validation })
  }

  console.log(error)
  return reply.status(500).send({ message: 'Internal Server Error' })
})


server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server Running ${env.PORT}!`)
})