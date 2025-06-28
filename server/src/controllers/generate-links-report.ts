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
          200: z.string(),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (_, reply) => {
      const makeGenerateLinksReportUseCase = MakeGenerateLinksReportUseCase();
      const result = await makeGenerateLinksReportUseCase.execute();
      
      if (isRight(result)) {
        // Fazer o download do arquivo do R2 e retornar diretamente
        const fileResponse = await fetch(result.right.url);
        
        if (!fileResponse.ok) {
          return reply.status(500).send({ error: 'Erro ao baixar arquivo CSV' });
        }

        const csvContent = await fileResponse.text();
        
        // Configurar headers para download
        reply.header('Content-Type', 'text/csv');
        reply.header('Content-Disposition', `attachment; filename="relatorio-links-${new Date().toISOString().split('T')[0]}.csv"`);
        
        return reply.status(200).send(csvContent);
      }
      
      return reply.status(500).send({ error: result.left.message });
    }
  );
}; 