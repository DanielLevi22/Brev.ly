import { MakeGenerateLinksReportUseCase } from '@/use-cases/factories/make-generate-links-report-use-case';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { isRight } from '@/shared/either';

export const generateLinksReportController: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/report',
    {
      schema: {
        summary: 'Gerar e baixar relatório CSV dos links',
        tags: ['Link'],
        response: {
          200: z.object({ url: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (_, reply) => {
      const makeGenerateLinksReportUseCase = MakeGenerateLinksReportUseCase();
      const result = await makeGenerateLinksReportUseCase.execute();
      if (isRight(result)) {
        return reply.status(200).send({ url: result.right.url });
      }
      return reply.status(500).send({ error: result.left.message });
    }
  );
}; 