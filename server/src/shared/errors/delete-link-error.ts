export class DeleteLinkError extends Error {
  constructor() {
    super('Erro ao deletar link');
    this.name = 'DeleteLinkError';
  }
} 