export class InvalidShortUrlError extends Error {
  constructor(message: string = 'URL encurtada mal formatada') {
    super(message)
    this.name = 'InvalidShortUrlError'
  }
}