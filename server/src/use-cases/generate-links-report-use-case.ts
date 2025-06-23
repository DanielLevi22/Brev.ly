import { type GenerateLinksCsvPort } from './ports/generate-links-csv-port';
import { makeLeft, makeRight, type Either } from '@/shared/either';
import { GenerateLinksReportError } from '@/shared/errors';

export class GenerateLinksReportUseCase {
  constructor(private readonly csvPort: GenerateLinksCsvPort) {}

  async execute(): Promise<Either<GenerateLinksReportError, { url: string }>> {
    try {
      const { url } = await this.csvPort.generateAndUploadLinksCsv();
      return makeRight({ url });
    } catch (error) {
      return makeLeft(new GenerateLinksReportError(error instanceof Error ? error.message : undefined));
    }
  }
} 