import { describe, it, expect } from 'vitest'
import { 
  InvalidUrlError, 
  InvalidShortUrlError, 
  ShortUrlAlreadyExistsError, 
  CreateLinkError,
  DeleteLinkError,
  LinkNotFoundError,
  ListLinksError,
  GenerateLinksReportError
} from '../errors'

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

  describe('DeleteLinkError', () => {
    it('should create error with default message', () => {
      const error = new DeleteLinkError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(DeleteLinkError)
      expect(error.name).toBe('DeleteLinkError')
      expect(error.message).toBe('Erro ao deletar link')
    })
  })

  describe('LinkNotFoundError', () => {
    it('should create error with default message', () => {
      const error = new LinkNotFoundError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(LinkNotFoundError)
      expect(error.name).toBe('LinkNotFoundError')
      expect(error.message).toBe('Link não encontrado')
    })
  })

  describe('ListLinksError', () => {
    it('should create error with default message', () => {
      const error = new ListLinksError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ListLinksError)
      expect(error.name).toBe('ListLinksError')
      expect(error.message).toBe('Erro ao listar links')
    })
  })

  describe('GenerateLinksReportError', () => {
    it('should create error with default message', () => {
      const error = new GenerateLinksReportError()
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(GenerateLinksReportError)
      expect(error.name).toBe('GenerateLinksReportError')
      expect(error.message).toBe('Erro ao gerar relatório CSV dos links')
    })

    it('should create error with custom message', () => {
      const customMessage = 'Falha ao gerar CSV'
      const error = new GenerateLinksReportError(customMessage)
      
      expect(error.message).toBe(customMessage)
      expect(error.name).toBe('GenerateLinksReportError')
    })
  })

  describe('Inheritance and Typing', () => {
    it('all classes should inherit from Error', () => {
      const errors = [
        new InvalidUrlError(),
        new InvalidShortUrlError(),
        new ShortUrlAlreadyExistsError(),
        new CreateLinkError(),
        new DeleteLinkError(),
        new LinkNotFoundError(),
        new ListLinksError(),
        new GenerateLinksReportError()
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
        new CreateLinkError().name,
        new DeleteLinkError().name,
        new LinkNotFoundError().name,
        new ListLinksError().name,
        new GenerateLinksReportError().name
      ]

      const uniqueNames = new Set(errorNames)
      expect(uniqueNames.size).toBe(errorNames.length)
    })
  })
}) 