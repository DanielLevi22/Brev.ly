import { describe, it, expect, beforeEach, vi } from 'vitest'
import { IncrementAccessCountUseCase } from './increment-access-count-use-case'
import { InMemoryLinkRepository } from '@/repositories/in-memory/in-memory-link-repositories'
import { LinkNotFoundError, IncrementAccessCountError } from '@/shared/errors'
import { isRight, isLeft } from '@/shared/either'

describe('IncrementAccessCountUseCase', () => {
  let useCase: IncrementAccessCountUseCase
  let repository: InMemoryLinkRepository

  beforeEach(() => {
    repository = new InMemoryLinkRepository()
    useCase = new IncrementAccessCountUseCase(repository)
  })

  describe('execute', () => {
    it('should increment access count successfully', async () => {
      // Criar um link
      const createRequest = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }
      await repository.create(createRequest)

      // Incrementar acesso
      const result = await useCase.execute({ shortUrl: 'google' })

      expect(isRight(result)).toBe(true)
      if (isRight(result)) {
        expect(result.right.link.accessCount).toBe(1)
      }
    })

    it('should increment access count multiple times', async () => {
      await repository.create({ originalUrl: 'https://www.google.com', shortUrl: 'google' })
      await useCase.execute({ shortUrl: 'google' })
      await useCase.execute({ shortUrl: 'google' })
      const result = await useCase.execute({ shortUrl: 'google' })
      expect(isRight(result)).toBe(true)
      if (isRight(result)) {
        expect(result.right.link.accessCount).toBe(3)
      }
    })

    it('should return error when link does not exist', async () => {
      const result = await useCase.execute({ shortUrl: 'inexistente' })
      expect(isLeft(result)).toBe(true)
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(LinkNotFoundError)
      }
    })

    it('should return error when repository throws an error', async () => {
      await repository.create({ originalUrl: 'https://www.google.com', shortUrl: 'google' })
      vi.spyOn(repository, 'incrementAccessCount').mockRejectedValueOnce(new Error('Database error'))
      const result = await useCase.execute({ shortUrl: 'google' })
      expect(isLeft(result)).toBe(true)
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(IncrementAccessCountError)
      }
    })
  })
}) 