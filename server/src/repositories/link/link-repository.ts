import { Link, CreateLinkData } from "@/entities/link";

export interface LinkRepository {
  create(data: CreateLinkData): Promise<Link>;
  findByShortUrl(shortUrl: string): Promise<Link | null>;
  delete(shortUrl: string): Promise<void>;
  findAll(): Promise<Link[]>;
}
