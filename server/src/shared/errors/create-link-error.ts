export class CreateLinkError extends Error {
  constructor(message: string = 'Erro ao criar link') {
    super(message)
    this.name = 'CreateLinkError'
  }
} 