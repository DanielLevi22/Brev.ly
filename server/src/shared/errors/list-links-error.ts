export class ListLinksError extends Error {
  constructor() {
    super('Erro ao listar links');
    this.name = 'ListLinksError';
  }
} 