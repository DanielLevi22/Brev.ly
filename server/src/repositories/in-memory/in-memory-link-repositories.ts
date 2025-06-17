import { LinkRepository } from '@/repositories/link/link-repository'
import { Link } from '@/entities/link'

export class InMemoryLinkRepository implements LinkRepository {
  public items: Link[] = []

  async create(data: Link) {
    this.items.push(data)
    return  data
  }

  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const link = this.items.find(item => item.shortUrl === shortUrl)
    return Promise.resolve(link || null)
  }
}