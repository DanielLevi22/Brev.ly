import { MakeListAllLinksUseCase } from "@/use-cases/factories/make-list-all-links-use-case";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { ListLinksError } from "@/shared/errors";
import { isRight } from "@/shared/either";
import { fastifyLoggerAdapter } from '@/shared/fastify-logger-adapter';

export const listAllLinksController: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Listar Todos os Links',
        tags: ['Link'],
        response: {
          200: z.object({
            links: z.array(z.object({
              shortUrl: z.string(),
              originalUrl: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            })),
            total: z.number(),
          }),
          500: z.object({
            error: z.string(),
            type: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const logger = fastifyLoggerAdapter(request.log);
      logger.info({}, 'Recebida requisição para listar todos os links');
      const makeListAllLinksUseCase = MakeListAllLinksUseCase();
      const result = await makeListAllLinksUseCase.execute();

      if (isRight(result)) {
        logger.info({ total: result.right.total }, 'Links listados com sucesso');
        return reply.status(200).send(result.right);
      }
      
      logger.error({ error: result.left }, 'Erro ao listar links');
      const error = result.left;
      if (error instanceof ListLinksError) {
        return reply.status(500).send({ error: error.message, type: error.name });
      }
      
      return reply.status(500).send({ error: 'Erro interno do servidor', type: 'InternalServerError' });
    }
  );
}; 