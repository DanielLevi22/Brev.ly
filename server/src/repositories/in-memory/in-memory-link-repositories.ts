import { LinkRepository } from '@/repositories/link/link-repository'
import { Link, CreateLinkData } from '@/entities/link'

export class InMemoryLinkRepository implements LinkRepository {
  public items: Link[] = []

  async create(data: CreateLinkData): Promise<Link> {
    const link: Link = {
      ...data,
      accessCount: 0,
      createdAt: new Date()
    }
    this.items.push(link)
    return link
  }

  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const link = this.items.find(item => item.shortUrl === shortUrl)
    return Promise.resolve(link || null)
  }

  async delete(shortUrl: string): Promise<void> {
    const index = this.items.findIndex(item => item.shortUrl === shortUrl)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  async findAll(): Promise<Link[]> {
    return Promise.resolve([...this.items])
  }

  async incrementAccessCount(shortUrl: string): Promise<Link | null> {
    const link = this.items.find(item => item.shortUrl === shortUrl)
    if (!link) return null
    link.accessCount++
    return link
  }
}