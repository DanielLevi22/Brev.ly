import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ListAllLinksUseCase } from './list-all-links-use-case'
import { InMemoryLinkRepository } from '@/repositories/in-memory/in-memory-link-repositories'
import { ListLinksError } from '@/shared/errors'
import { isRight, isLeft } from '@/shared/either'

describe('ListAllLinksUseCase', () => {
  let useCase: ListAllLinksUseCase
  let repository: InMemoryLinkRepository

  beforeEach(() => {
    repository = new InMemoryLinkRepository()
    useCase = new ListAllLinksUseCase(repository)
  })

  describe('execute', () => {
    it('should return empty list when no links exist', async () => {
      const result = await useCase.execute()

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.links).toEqual([])
        expect(result.right.total).toBe(0)
      }
    })

    it('should return all links when they exist', async () => {
      const links = [
        { originalUrl: 'https://www.google.com', shortUrl: 'google' },
        { originalUrl: 'https://www.github.com', shortUrl: 'github' },
        { originalUrl: 'https://www.stackoverflow.com', shortUrl: 'stack' }
      ]

      for (const link of links) {
        await repository.create(link)
      }

      const result = await useCase.execute()

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.total).toBe(3)
        expect(result.right.links).toHaveLength(3)
        
        const shortUrls = result.right.links.map(link => link.shortUrl)
        expect(shortUrls).toContain('google')
        expect(shortUrls).toContain('github')
        expect(shortUrls).toContain('stack')
        
        const googleLink = result.right.links.find(link => link.shortUrl === 'google')
        expect(googleLink).toBeDefined()
        expect(googleLink?.originalUrl).toBe('https://www.google.com')
        expect(googleLink?.accessCount).toBe(0)
        expect(googleLink?.createdAt).toBeInstanceOf(Date)
      }
    })

    it('should return error when repository throws an error', async () => {
      vi.spyOn(repository, 'findAll').mockRejectedValueOnce(new Error('Database error'))

      const result = await useCase.execute()

      expect(isLeft(result)).toBe(true)
      
      if (isLeft(result)) {
        expect(result.left).toBeInstanceOf(ListLinksError)
        expect(result.left.message).toBe('Erro ao listar links')
      }
    })

    it('should return correct data structure for each link', async () => {
      // Criar um link
      await repository.create({
        originalUrl: 'https://www.example.com',
        shortUrl: 'example'
      })

      const result = await useCase.execute()

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.links[0]).toEqual({
          shortUrl: 'example',
          originalUrl: 'https://www.example.com',
          accessCount: 0,
          createdAt: expect.any(Date)
        })
      }
    })

    it('should handle multiple links with different data', async () => {
      // Criar links com dados diferentes
      const links = [
        { originalUrl: 'https://www.google.com', shortUrl: 'google' },
        { originalUrl: 'https://www.github.com', shortUrl: 'github' },
        { originalUrl: 'https://www.stackoverflow.com', shortUrl: 'stack' },
        { originalUrl: 'https://www.youtube.com', shortUrl: 'youtube' }
      ]

      for (const link of links) {
        await repository.create(link)
      }

      const result = await useCase.execute()

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.total).toBe(4)
        expect(result.right.links).toHaveLength(4)
        
        // Verificar se todos os links têm a estrutura correta
        result.right.links.forEach(link => {
          expect(link).toHaveProperty('shortUrl')
          expect(link).toHaveProperty('originalUrl')
          expect(link).toHaveProperty('accessCount')
          expect(link).toHaveProperty('createdAt')
          expect(typeof link.shortUrl).toBe('string')
          expect(typeof link.originalUrl).toBe('string')
          expect(typeof link.accessCount).toBe('number')
          expect(link.createdAt).toBeInstanceOf(Date)
        })
      }
    })

    it('should return links in the order they were created', async () => {
      // Criar links em ordem específica
      const links = [
        { originalUrl: 'https://www.first.com', shortUrl: 'first' },
        { originalUrl: 'https://www.second.com', shortUrl: 'second' },
        { originalUrl: 'https://www.third.com', shortUrl: 'third' }
      ]

      for (const link of links) {
        await repository.create(link)
      }

      const result = await useCase.execute()

      expect(isRight(result)).toBe(true)
      
      if (isRight(result)) {
        expect(result.right.links[0].shortUrl).toBe('first')
        expect(result.right.links[1].shortUrl).toBe('second')
        expect(result.right.links[2].shortUrl).toBe('third')
      }
    })

    it('should update total count correctly after deletions', async () => {
      // Criar alguns links
      const links = [
        { originalUrl: 'https://www.google.com', shortUrl: 'google' },
        { originalUrl: 'https://www.github.com', shortUrl: 'github' },
        { originalUrl: 'https://www.stackoverflow.com', shortUrl: 'stack' }
      ]

      for (const link of links) {
        await repository.create(link)
      }

      // Verificar total inicial
      let result = await useCase.execute()
      expect(isRight(result)).toBe(true)
      if (isRight(result)) {
        expect(result.right.total).toBe(3)
      }

      // Deletar um link
      await repository.delete('github')

      // Verificar total após deleção
      result = await useCase.execute()
      expect(isRight(result)).toBe(true)
      if (isRight(result)) {
        expect(result.right.total).toBe(2)
        expect(result.right.links).toHaveLength(2)
        
        const shortUrls = result.right.links.map(link => link.shortUrl)
        expect(shortUrls).toContain('google')
        expect(shortUrls).toContain('stack')
        expect(shortUrls).not.toContain('github')
      }
    })
  })
}) 