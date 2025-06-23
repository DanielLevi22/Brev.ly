import { generateAndUploadLinksCsv } from '@/storage/generate-links-csv';
import { makeLeft, makeRight, type Either } from '@/shared/either';

export class GenerateLinksReportUseCase {
  async execute(): Promise<Either<Error, { url: string }>> {
    try {
      const { url } = await generateAndUploadLinksCsv();
      return makeRight({ url });
    } catch (error) {
      return makeLeft(error instanceof Error ? error : new Error('Erro ao gerar relatório CSV'));
    }
  }
} 