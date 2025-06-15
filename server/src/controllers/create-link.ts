import { unwrapEither } from "@/shared/either";
import { MakeCreateLinkUseCase } from "@/use-cases/factories/make-create-link-use-case";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";



export const createLinkController: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create Links',
        tags: ['Link'],
        body: z.object({
          originalUrl: z.string().url(),
        }),
        response: {
          200: z.object({
            shortkey: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl } = request.body
   
      const   makeCreateLinkUseCase = MakeCreateLinkUseCase()
      const  result  = await  makeCreateLinkUseCase.execute({ originalUrl })
      const response = unwrapEither(result)

      if ('link' in response) {
        return reply.status(200).send({ shortkey: response.link.shortKey })
      }

      throw new Error('Erro ao criar link')
    }
  )
}