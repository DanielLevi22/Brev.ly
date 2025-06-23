import { LinkRepository } from "@/repositories/link/link-repository";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { ListLinksError } from "@/shared/errors";

interface ListAllLinksResponse {
  links: Array<{
    shortUrl: string
    originalUrl: string
    accessCount: number
    createdAt: Date
  }>
  total: number
}

export class ListAllLinksUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute(): Promise<Either<ListLinksError, ListAllLinksResponse>> {
    try {
      const links = await this.linkRepository.findAll();
      return makeRight({
        links: links.map(link => ({
          shortUrl: link.shortUrl,
          originalUrl: link.originalUrl,
          accessCount: link.accessCount,
          createdAt: link.createdAt
        })),
        total: links.length
      });
    } catch (error) {
      return makeLeft(new ListLinksError());
    }
  }
} 