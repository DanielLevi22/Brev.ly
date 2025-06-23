import { MakeGetOriginalUrlUseCase } from "@/use-cases/factories/make-get-original-url-use-case";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { LinkNotFoundError } from "@/shared/errors";
import { isLeft } from "@/shared/either";
import { fastifyLoggerAdapter } from '@/shared/fastify-logger-adapter';

export const getOriginalUrlController: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/:shortUrl',
    {
      schema: {
        summary: 'Obter URL Original',
        tags: ['Link'],
        params: z.object({
          shortUrl: z.string()
        }),
        response: {
          200: z.object({
            originalUrl: z.string(),
            shortUrl: z.string(),
            accessCount: z.number(),
          }),
          404: z.object({
            error: z.string(),
            type: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;
      const logger = fastifyLoggerAdapter(request.log);
      logger.info({ shortUrl }, 'Recebida requisição para buscar URL original');
      const makeGetOriginalUrlUseCase = MakeGetOriginalUrlUseCase();
      const result = await makeGetOriginalUrlUseCase.execute({ shortUrl });

      if (isLeft(result)) {
        logger.warn({ error: result.left }, 'Erro ao buscar URL original');
        const error = result.left;
        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ error: error.message, type: error.name });
        }
        return reply.status(500).send({ error: 'Erro interno do servidor', type: 'InternalServerError' });
      }
      logger.info({ shortUrl }, 'URL original encontrada com sucesso');
      return reply.status(200).send(result.right);
    }
  );
}; 