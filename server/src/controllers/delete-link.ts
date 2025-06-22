import { MakeDeleteLinkUseCase } from "@/use-cases/factories/make-delete-link-use-case";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { isLeft } from "@/shared/either";
import { LinkNotFoundError } from "../shared/errors";
import { DeleteLinkError } from "../shared/errors";

export const deleteLinkController: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link/:shortUrl',
    {
      schema: {
        summary: 'Deletar Link',
        tags: ['Link'],
        params: z.object({
          shortUrl: z.string()
        }),
        response: {
          200: z.object({
            message: z.string(),
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
      const makeDeleteLinkUseCase = MakeDeleteLinkUseCase();
      const result = await makeDeleteLinkUseCase.execute({ shortUrl });

      if (isLeft(result)) {
        const error = result.left;
        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ error: error.message, type: error.name });
        }
        if (error instanceof DeleteLinkError) {
          return reply.status(500).send({ error: error.message, type: error.name });
        }
        return reply.status(500).send({ error: 'Erro interno do servidor', type: 'InternalServerError' });
      }
      return reply.status(200).send({ message: result.right.message });
    }
  );
}; 