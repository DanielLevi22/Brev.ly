import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CreateLinkUseCase } from './create-link-use-case'
import { InMemoryLinkRepository } from '@/repositories/in-memory/in-memory-link-repositories'
import { 
  InvalidUrlError, 
  InvalidShortUrlError, 
  ShortUrlAlreadyExistsError, 
  CreateLinkError 
} from '@/shared/errors'
import { isRight, isLeft } from '@/shared/either'

describe('CreateLinkUseCase', () => {
  let useCase: CreateLinkUseCase
  let repository: InMemoryLinkRepository

  beforeEach(() => {
    repository = new InMemoryLinkRepository()
    useCase = new CreateLinkUseCase(repository)
  })

  describe('execute', () => {
    it('should create a link successfully', async () => {
      const request = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }

      const result = await useCase.execute(request)

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.link).toEqual({
          shortUrl: 'google',
          originalUrl: 'https://www.google.com',
          accessCount: 0,
          createdAt: expect.any(Date)
        })
      }
    })

    it('should return error when original URL is invalid', async () => {
      const request = {
        originalUrl: 'url-invalida',
        shortUrl: 'test'
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(InvalidUrlError)
        expect(result.left.message).toBe('URL inválida')
      }
    })

    it('should return error when original URL is empty', async () => {
      const request = {
        originalUrl: '',
        shortUrl: 'test'
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(InvalidUrlError)
      }
    })

    it('should return error when shortUrl is empty', async () => {
      const request = {
        originalUrl: 'https://www.google.com',
        shortUrl: ''
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(InvalidShortUrlError)
        expect(result.left.message).toBe('URL encurtada mal formatada')
      }
    })

    it('should return error when shortUrl has less than 3 characters', async () => {
      const request = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'ab'
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(InvalidShortUrlError)
      }
    })

    it('should return error when shortUrl has more than 20 characters', async () => {
      const request = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'a'.repeat(21)
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(InvalidShortUrlError)
      }
    })

    it('should return error when shortUrl contains invalid characters', async () => {
      const invalidShortUrls = [
        'test@123',
        'test#123',
        'test$123',
        'test%123',
        'test&123',
        'test*123',
        'test+123',
        'test=123',
        'test[123',
        'test]123',
        'test{123',
        'test}123',
        'test|123',
        'test\\123',
        'test/123',
        'test?123',
        'test,123',
        'test.123',
        'test;123',
        'test:123',
        'test!123',
        'test~123',
        'test`123',
        'test\'123',
        'test"123',
        'test<123',
        'test>123'
      ]

      for (const shortUrl of invalidShortUrls) {
        const request = {
          originalUrl: 'https://www.google.com',
          shortUrl
        }

        const result = await useCase.execute(request)

        expect(isLeft(result)).toBe(true)
        
        if (isLeft(result)) {
          expect(result.left).toBeInstanceOf(InvalidShortUrlError)
        }
      }
    })

    it('should accept shortUrl with valid characters', async () => {
      const validShortUrls = [
        'test123',
        'test-123',
        'test_123',
        'TEST123',
        'Test123',
        'test-123_test',
        '123test',
        'test_123-test'
      ]

      for (const shortUrl of validShortUrls) {
        const request = {
          originalUrl: 'https://www.google.com',
          shortUrl
        }

        const result = await useCase.execute(request)

        expect(isRight(result)).toBe(true)
        
        if (isRight(result)) {
          expect(result.right.link.shortUrl).toBe(shortUrl)
        }
      }
    })

    it('should return error when shortUrl already exists', async () => {
      const firstRequest = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }
      
      await useCase.execute(firstRequest)

      const secondRequest = {
        originalUrl: 'https://www.github.com',
        shortUrl: 'google'
      }

      const result = await useCase.execute(secondRequest)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(ShortUrlAlreadyExistsError)
        expect(result.left.message).toBe('URL encurtada já existe')
      }
    })

    it('should allow creating links with different shortUrls', async () => {
      const requests = [
        {
          originalUrl: 'https://www.google.com',
          shortUrl: 'google'
        },
        {
          originalUrl: 'https://www.github.com',
          shortUrl: 'github'
        },
        {
          originalUrl: 'https://www.stackoverflow.com',
          shortUrl: 'stackoverflow'
        }
      ]

      for (const request of requests) {
        const result = await useCase.execute(request)

        expect(isRight(result)).toBe(true)
        
        if (isRight(result)) {
          expect(result.right.link.shortUrl).toBe(request.shortUrl)
          expect(result.right.link.originalUrl).toBe(request.originalUrl)
        }
      }

      expect(repository.items).toHaveLength(3)
    })

    it('should return error when repository fails', async () => {
      const mockRepository = {
        findByShortUrl: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockRejectedValue(new Error('Database error'))
      }

      const useCaseWithMock = new CreateLinkUseCase(mockRepository as any)

      const request = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }

      const result = await useCaseWithMock.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(CreateLinkError)
        expect(result.left.message).toBe('Erro ao criar link')
      }
    })

    it('should set accessCount to 0 and createdAt to current date', async () => {
      const request = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }

      const beforeExecution = new Date()
      const result = await useCase.execute(request)
      const afterExecution = new Date()

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.link.accessCount).toBe(0)
        expect(result.right.link.createdAt).toBeInstanceOf(Date)
        expect(result.right.link.createdAt.getTime()).toBeGreaterThanOrEqual(beforeExecution.getTime())
        expect(result.right.link.createdAt.getTime()).toBeLessThanOrEqual(afterExecution.getTime())
      }
    })
  })

  describe('isValidShortUrl (private method)', () => {
    it('should validate shortUrl correctly', () => {
      const validCases = [
        'abc',
        'test123',
        'test-123',
        'test_123',
        'TEST123',
        'Test123',
        'test-123_test',
        '123test',
        'test_123-test',
        'a'.repeat(20) 
      ]

      
      const invalidCases = [
        '', 
        '  ', 
        'ab', 
        'a'.repeat(21), 
        'test@123',
        'test#123',
        'test$123',
        'test%123',
        'test&123',
        'test*123',
        'test+123',
        'test=123',
        'test[123',
        'test]123',
        'test{123',
        'test}123',
        'test|123',
        'test\\123',
        'test/123',
        'test?123',
        'test,123',
        'test.123',
        'test;123',
        'test:123',
        'test!123',
        'test~123',
        'test`123',
        'test\'123',
        'test"123',
        'test<123',
        'test>123'
      ]

      for (const shortUrl of validCases) {
        const request = {
          originalUrl: 'https://www.google.com',
          shortUrl
        }

        expect(async () => {
          const result = await useCase.execute(request)
          if (isLeft(result)) {
            throw new Error(`Valid shortUrl "${shortUrl}" was rejected`)
          }
        }).not.toThrow()
      }

      for (const shortUrl of invalidCases) {
        const request = {
          originalUrl: 'https://www.google.com',
          shortUrl
        }

        expect(async () => {
          const result = await useCase.execute(request)
          if (isRight(result)) {
            throw new Error(`Invalid shortUrl "${shortUrl}" was accepted`)
          }
        }).not.toThrow()
      }
    })
  })
}) 