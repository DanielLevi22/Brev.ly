import { GenerateLinksReportUseCase } from '../generate-links-report-use-case';
import { generateLinksCsvAdapter } from '@/storage/generate-links-csv-adapter';

export function MakeGenerateLinksReportUseCase() {
  return new GenerateLinksReportUseCase(generateLinksCsvAdapter);
} 