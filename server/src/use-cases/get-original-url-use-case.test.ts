import { describe, it, expect, beforeEach } from 'vitest'
import { GetOriginalUrlUseCase } from './get-original-url-use-case'
import { InMemoryLinkRepository } from '@/repositories/in-memory/in-memory-link-repositories'
import { LinkNotFoundError } from '@/shared/errors'
import { isRight, isLeft } from '@/shared/either'

describe('GetOriginalUrlUseCase', () => {
  let useCase: GetOriginalUrlUseCase
  let repository: InMemoryLinkRepository

  beforeEach(() => {
    repository = new InMemoryLinkRepository()
    useCase = new GetOriginalUrlUseCase(repository)
  })

  describe('execute', () => {
    it('should get original URL successfully', async () => {
      // Primeiro, criar um link
      const createRequest = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }
      
      await repository.create(createRequest)

      // Agora obter a URL original
      const getRequest = {
        shortUrl: 'google'
      }

      const result = await useCase.execute(getRequest)

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.originalUrl).toBe('https://www.google.com')
        expect(result.right.shortUrl).toBe('google')
        expect(result.right.accessCount).toBe(0)
      }
    })

    it('should return error when link does not exist', async () => {
      const request = {
        shortUrl: 'link-inexistente'
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(LinkNotFoundError)
        expect(result.left.message).toBe('Link não encontrado')
      }
    })

    it('should handle empty shortUrl gracefully', async () => {
      const request = {
        shortUrl: ''
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(LinkNotFoundError)
      }
    })

    it('should handle whitespace-only shortUrl gracefully', async () => {
      const request = {
        shortUrl: '   '
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(LinkNotFoundError)
      }
    })

    it('should return correct data for multiple links', async () => {
      // Criar múltiplos links
      const links = [
        { originalUrl: 'https://www.google.com', shortUrl: 'google' },
        { originalUrl: 'https://www.github.com', shortUrl: 'github' },
        { originalUrl: 'https://www.stackoverflow.com', shortUrl: 'stack' }
      ]

      for (const link of links) {
        await repository.create(link)
      }

      // Verificar cada link
      for (const link of links) {
        const result = await useCase.execute({ shortUrl: link.shortUrl })
        expect(isRight(result)).toBe(true)
        
        if (isRight(result)) {
          expect(result.right.originalUrl).toBe(link.originalUrl)
          expect(result.right.shortUrl).toBe(link.shortUrl)
          expect(result.right.accessCount).toBe(0)
        }
      }
    })

    it('should be case sensitive for shortUrl', async () => {
      // Criar um link com shortUrl em minúsculo
      const createRequest = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }
      
      await repository.create(createRequest)

      // Tentar buscar com shortUrl em maiúsculo
      const request = {
        shortUrl: 'GOOGLE'
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(LinkNotFoundError)
      }
    })
  })
}) 