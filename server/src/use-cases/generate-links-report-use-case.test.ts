import { describe, it, expect } from 'vitest';
import { GenerateLinksReportUseCase } from './generate-links-report-use-case';
import { GenerateLinksReportError } from '@/shared/errors';
import { isRight, isLeft } from '@/shared/either';
import type { GenerateLinksCsvPort } from './ports/generate-links-csv-port';

describe('GenerateLinksReportUseCase', () => {
  describe('execute', () => {
    it('should return the CSV URL on success', async () => {
      const url = 'https://fake-url.com/links.csv';
      const fakePort: GenerateLinksCsvPort = {
        generateAndUploadLinksCsv: async () => ({ url }),
      };
      const useCase = new GenerateLinksReportUseCase(fakePort);
      const result = await useCase.execute();

      expect(isRight(result)).toBe(true);
      if (isRight(result)) {
        expect(result.right.url).toBe(url);
      }
    });

    it('should return a custom error if CSV generation fails', async () => {
      const fakePort: GenerateLinksCsvPort = {
        generateAndUploadLinksCsv: async () => { throw new Error('Falha ao gerar CSV'); },
      };
      const useCase = new GenerateLinksReportUseCase(fakePort);
      const result = await useCase.execute();

      expect(isLeft(result)).toBe(true);
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(GenerateLinksReportError);
        expect(result.left.message).toBe('Falha ao gerar CSV');
      }
    });
  });
}); 