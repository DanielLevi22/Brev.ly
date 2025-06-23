export class GenerateLinksReportError extends Error {
  constructor(message: string = 'Erro ao gerar relatório CSV dos links') {
    super(message);
    this.name = 'GenerateLinksReportError';
  }
} 