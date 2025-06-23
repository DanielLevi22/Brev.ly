import { eq, sql } from 'drizzle-orm';
import { links } from '@/schemas/links';
import { Link, CreateLinkData } from '@/entities/link';
import { LinkRepository } from '../link/link-repository';
import { db } from '@/db';

export class DrizzleLinkRepository implements LinkRepository {
  async create(data: CreateLinkData): Promise<Link> {
    const [newLink] = await db.insert(links).values(data).returning();
    return {
      ...newLink,
    };
  }

  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const [link] = await db.select().from(links).where(eq(links.shortUrl, shortUrl));
    if (!link) return null;
    return {
      ...link,
    };
  }

  async delete(shortUrl: string): Promise<void> {
    await db.delete(links).where(eq(links.shortUrl, shortUrl));
  }

  async findAll(): Promise<Link[]> {
    const allLinks = await db.select().from(links).orderBy(sql`${links.createdAt} DESC`);
    return allLinks.map(link => ({
      ...link,
    }));
  }

  async incrementAccessCount(shortUrl: string): Promise<Link | null> {
    const [updated] = await db.update(links)
      .set({ accessCount: sql`${links.accessCount} + 1` })
      .where(eq(links.shortUrl, shortUrl))
      .returning();
    if (!updated) return null;
    return {
      ...updated,
    };
  }
}