import { Link } from "@/entities/link";
import { LinkRepository } from "@/repositories/link/link-repository";

export class CreateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute(originalUrl: string): Promise<Link> {
    const shortKey = this.generateShortKey();
    const existing = await this.linkRepository.findByShortKey(shortKey);
    if (existing) throw new Error('Short key exists');
    const link: Link = { shortKey, originalUrl, accessCount: 0, createdAt: new Date() };
    return await this.linkRepository.create(link);
  }

  private generateShortKey(): string {
    return Math.random().toString(36).slice(2, 8);
  }
}