export class InvalidUrlError extends Error {
  constructor(message: string = 'URL inválida') {
    super(message)
    this.name = 'InvalidUrlError'
  }
}

export class InvalidShortUrlError extends Error {
  constructor(message: string = 'URL encurtada mal formatada') {
    super(message)
    this.name = 'InvalidShortUrlError'
  }
}

export class ShortUrlAlreadyExistsError extends Error {
  constructor(message: string = 'URL encurtada já existe') {
    super(message)
    this.name = 'ShortUrlAlreadyExistsError'
  }
}

export class CreateLinkError extends Error {
  constructor(message: string = 'Erro ao criar link') {
    super(message)
    this.name = 'CreateLinkError'
  }
} 