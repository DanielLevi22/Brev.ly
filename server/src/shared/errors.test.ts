import { describe, it, expect } from 'vitest'
import { 
  InvalidUrlError, 
  InvalidShortUrlError, 
  ShortUrlAlreadyExistsError, 
  CreateLinkError 
} from './errors'

describe('Custom Error Classes', () => {
  describe('InvalidUrlError', () => {
    it('should create error with default message', () => {
      const error = new InvalidUrlError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(InvalidUrlError)
      expect(error.name).toBe('InvalidUrlError')
      expect(error.message).toBe('URL inválida')
    })

    it('should create error with custom message', () => {
      const customMessage = 'URL fornecida não é válida'
      const error = new InvalidUrlError(customMessage)
      
      expect(error.message).toBe(customMessage)
      expect(error.name).toBe('InvalidUrlError')
    })
  })

  describe('InvalidShortUrlError', () => {
    it('should create error with default message', () => {
      const error = new InvalidShortUrlError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(InvalidShortUrlError)
      expect(error.name).toBe('InvalidShortUrlError')
      expect(error.message).toBe('URL encurtada mal formatada')
    })

    it('should create error with custom message', () => {
      const customMessage = 'Formato de URL encurtada inválido'
      const error = new InvalidShortUrlError(customMessage)
      
      expect(error.message).toBe(customMessage)
      expect(error.name).toBe('InvalidShortUrlError')
    })
  })

  describe('ShortUrlAlreadyExistsError', () => {
    it('should create error with default message', () => {
      const error = new ShortUrlAlreadyExistsError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ShortUrlAlreadyExistsError)
      expect(error.name).toBe('ShortUrlAlreadyExistsError')
      expect(error.message).toBe('URL encurtada já existe')
    })

    it('should create error with custom message', () => {
      const customMessage = 'Esta URL encurtada já está em uso'
      const error = new ShortUrlAlreadyExistsError(customMessage)
      
      expect(error.message).toBe(customMessage)
      expect(error.name).toBe('ShortUrlAlreadyExistsError')
    })
  })

  describe('CreateLinkError', () => {
    it('should create error with default message', () => {
      const error = new CreateLinkError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(CreateLinkError)
      expect(error.name).toBe('CreateLinkError')
      expect(error.message).toBe('Erro ao criar link')
    })

    it('should create error with custom message', () => {
      const customMessage = 'Falha na criação do link no banco de dados'
      const error = new CreateLinkError(customMessage)
      
      expect(error.message).toBe(customMessage)
      expect(error.name).toBe('CreateLinkError')
    })
  })

  describe('Inheritance and Typing', () => {
    it('all classes should inherit from Error', () => {
      const errors = [
        new InvalidUrlError(),
        new InvalidShortUrlError(),
        new ShortUrlAlreadyExistsError(),
        new CreateLinkError()
      ]

      errors.forEach(error => {
        expect(error).toBeInstanceOf(Error)
        expect(error.stack).toBeDefined()
      })
    })

    it('should have unique names for each class', () => {
      const errorNames = [
        new InvalidUrlError().name,
        new InvalidShortUrlError().name,
        new ShortUrlAlreadyExistsError().name,
        new CreateLinkError().name
      ]

      const uniqueNames = new Set(errorNames)
      expect(uniqueNames.size).toBe(errorNames.length)
    })
  })
}) 