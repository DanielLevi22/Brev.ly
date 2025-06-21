export class IncrementAccessCountError extends Error {
  constructor() {
    super('Erro ao incrementar contador de acessos');
    this.name = 'IncrementAccessCountError';
  }
} 