export class ShortUrlAlreadyExistsError extends Error {
  constructor(message: string = 'URL encurtada já existe') {
    super(message)
    this.name = 'ShortUrlAlreadyExistsError'
  }
}
