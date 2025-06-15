import { eq } from 'drizzle-orm';
import { links } from '@/schemas/links';
import { Link } from '@/entities/link';
import { LinkRepository } from '../link/link-repository';
import { db } from '@/db';

export class DrizzleLinkRepository implements LinkRepository {
  async create(link: Link): Promise<Link> {
    const [newLink] = await db.insert(links).values(link).returning();
    return {
      ...newLink,
      accessCount: newLink.accessCount ?? 0,
      createdAt: newLink.createdAt ?? new Date()
    };
  }

  async findByShortKey(shortKey: string): Promise<Link | null> {
    const [link] = await db.select().from(links).where(eq(links.shortKey, shortKey));
    if (!link) return null;
    return {
      ...link,
      accessCount: link.accessCount ?? 0,
      createdAt: link.createdAt ?? new Date()
    };
  }
}