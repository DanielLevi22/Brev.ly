import { generateAndUploadLinksCsv } from './generate-links-csv';
import { GenerateLinksCsvPort } from '@/use-cases/ports/generate-links-csv-port';

export const generateLinksCsvAdapter: GenerateLinksCsvPort = {
  generateAndUploadLinksCsv,
}; 