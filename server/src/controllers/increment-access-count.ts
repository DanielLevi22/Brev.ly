import { MakeIncrementAccessCountUseCase } from "@/use-cases/factories/make-increment-access-count-use-case";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { LinkNotFoundError, IncrementAccessCountError } from "@/shared/errors";
import { isLeft } from "@/shared/either";

export const incrementAccessCountController: FastifyPluginAsyncZod = async server => {
  server.patch(
    '/link/:shortUrl/access',
    {
      schema: {
        summary: 'Incrementar contador de acessos',
        tags: ['Link'],
        params: z.object({
          shortUrl: z.string()
        }),
        response: {
          200: z.object({
            link: z.object({
              shortUrl: z.string(),
              originalUrl: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            })
          }),
          404: z.object({
            error: z.string(),
            type: z.string(),
          }),
          500: z.object({
            error: z.string(),
            type: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;
      const makeIncrementAccessCountUseCase = MakeIncrementAccessCountUseCase();
      const result = await makeIncrementAccessCountUseCase.execute({ shortUrl });

      if (isLeft(result)) {
        const error = result.left;
        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ error: error.message, type: error.name });
        }
        if (error instanceof IncrementAccessCountError) {
          return reply.status(500).send({ error: error.message, type: error.name });
        }
        return reply.status(500).send({ error: 'Erro interno do servidor', type: 'InternalServerError' });
      }
      return reply.status(200).send(result.right);
    }
  );
}; 