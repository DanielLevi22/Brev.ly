import { isLeft } from "@/shared/either";
import { MakeCreateLinkUseCase } from "@/use-cases/factories/make-create-link-use-case";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { 
  InvalidUrlError, 
  InvalidShortUrlError, 
  ShortUrlAlreadyExistsError, 
  CreateLinkError 
} from "@/shared/errors";
import xss from 'xss';
import sanitizeHtml from 'sanitize-html';
import { fastifyLoggerAdapter } from '@/shared/fastify-logger-adapter';

export const createLinkController: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create Links',
        tags: ['Link'],
        body: z.object({
          originalUrl: z.string().url('URL original deve ser uma URL válida'),
          shortUrl: z.string()
            .min(3, 'URL encurtada deve ter pelo menos 3 caracteres')
            .max(20, 'URL encurtada deve ter no máximo 20 caracteres')
            .regex(/^[a-zA-Z0-9_-]+$/, 'URL encurtada deve conter apenas letras, números, hífens e underscores')
        }),
        response: {
          200: z.object({
            shortUrl: z.string(),
          }),
          400: z.object({
            error: z.string(),
            type: z.string(),
          }),
          409: z.object({
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
      // Sanitização dupla: xss e sanitize-html
      let { originalUrl, shortUrl } = request.body;
      originalUrl = sanitizeHtml(xss(originalUrl), { allowedTags: [], allowedAttributes: {} }).trim();
      shortUrl = sanitizeHtml(xss(shortUrl), { allowedTags: [], allowedAttributes: {} }).trim();

      const logger = fastifyLoggerAdapter(request.log);
      logger.info({ originalUrl, shortUrl }, 'Recebida requisição para criar link');
      const makeCreateLinkUseCase = MakeCreateLinkUseCase();
      const result = await makeCreateLinkUseCase.execute({ originalUrl, shortUrl });
      
      if (isLeft(result)) {
        logger.warn({ error: result.left }, 'Erro ao criar link');
        const error = result.left
        
        if (error instanceof InvalidUrlError || error instanceof InvalidShortUrlError) {
          return reply.status(400).send({ 
            error: error.message, 
            type: error.name 
          })
        }
        
        if (error instanceof ShortUrlAlreadyExistsError) {
          return reply.status(409).send({ 
            error: error.message, 
            type: error.name 
          })
        }
        
        if (error instanceof CreateLinkError) {
          return reply.status(500).send({ 
            error: error.message, 
            type: error.name 
          })
        }
      }

      logger.info({ shortUrl: result.right!.link.shortUrl }, 'Link criado com sucesso');
      const response = result.right!
      return reply.status(200).send({ shortUrl: response.link.shortUrl })
    }
  )
}