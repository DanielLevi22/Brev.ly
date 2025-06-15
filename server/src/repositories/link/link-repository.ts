import { Link } from "@/entities/link";

export interface LinkRepository {
  create(link: Link): Promise<Link>;
  findByShortKey(shortKey: string): Promise<Link | null>;
}
