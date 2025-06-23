import { LinkRepository } from "@/repositories/link/link-repository";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { LinkNotFoundError } from "@/shared/errors";

interface GetOriginalUrlRequest {
  shortUrl: string
}

interface GetOriginalUrlResponse {
  originalUrl: string
  shortUrl: string
  accessCount: number
}

export class GetOriginalUrlUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ shortUrl }: GetOriginalUrlRequest): Promise<Either<LinkNotFoundError, GetOriginalUrlResponse>> {
    const link = await this.linkRepository.findByShortUrl(shortUrl);
    
    if (!link) {
      return makeLeft(new LinkNotFoundError());
    }
    return makeRight({
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
      accessCount: link.accessCount
    });
  }
} 