import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DeleteLinkUseCase } from './delete-link-use-case'
import { InMemoryLinkRepository } from '@/repositories/in-memory/in-memory-link-repositories'
import { 
  LinkNotFoundError, 
  DeleteLinkError 
} from '@/shared/errors'
import { isRight, isLeft } from '@/shared/either'

describe('DeleteLinkUseCase', () => {
  let useCase: DeleteLinkUseCase
  let repository: InMemoryLinkRepository

  beforeEach(() => {
    repository = new InMemoryLinkRepository()
    useCase = new DeleteLinkUseCase(repository)
  })

  describe('execute', () => {
    it('should delete a link successfully', async () => {
      // Primeiro, criar um link
      const createRequest = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }
      
      await repository.create(createRequest)

      // Agora deletar o link
      const deleteRequest = {
        shortUrl: 'google'
      }

      const result = await useCase.execute(deleteRequest)

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.message).toBe('Link deletado com sucesso')
      }

      // Verificar se o link foi realmente deletado
      const deletedLink = await repository.findByShortUrl('google')
      expect(deletedLink).toBeNull()
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

    it('should return error when repository throws an error during deletion', async () => {
      // Criar um link primeiro
      const createRequest = {
        originalUrl: 'https://www.google.com',
        shortUrl: 'google'
      }
      
      await repository.create(createRequest)

      // Mockar o método delete para lançar um erro
      vi.spyOn(repository, 'delete').mockRejectedValueOnce(new Error('Database error'))

      const request = {
        shortUrl: 'google'
      }

      const result = await useCase.execute(request)

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(DeleteLinkError)
        expect(result.left.message).toBe('Erro ao deletar link')
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

    it('should be able to delete multiple links', async () => {
      // Criar múltiplos links
      const links = [
        { originalUrl: 'https://www.google.com', shortUrl: 'google' },
        { originalUrl: 'https://www.github.com', shortUrl: 'github' },
        { originalUrl: 'https://www.stackoverflow.com', shortUrl: 'stack' }
      ]

      for (const link of links) {
        await repository.create(link)
      }

      // Deletar todos os links
      for (const link of links) {
        const result = await useCase.execute({ shortUrl: link.shortUrl })
        expect(isRight(result)).toBe(true)
      }

      // Verificar se todos foram deletados
      for (const link of links) {
        const deletedLink = await repository.findByShortUrl(link.shortUrl)
        expect(deletedLink).toBeNull()
      }
    })
  })
}) 