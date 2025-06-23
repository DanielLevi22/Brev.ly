export interface GenerateLinksCsvPort {
  generateAndUploadLinksCsv(): Promise<{ url: string }>;
} 