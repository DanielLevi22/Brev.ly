export class InvalidUrlError extends Error {
  constructor(message: string = 'URL inválida') {
    super(message)
    this.name = 'InvalidUrlError'
  }
}




