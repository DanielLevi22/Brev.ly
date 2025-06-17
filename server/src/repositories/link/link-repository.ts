import { Link } from "@/entities/link";

export interface LinkRepository {
  create(link: Link): Promise<Link>;
  findByShortUrl(shortUrl: string): Promise<Link | null>;
}
