import { LinkRepository } from "@/repositories/link/link-repository";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { LinkNotFoundError, IncrementAccessCountError } from "@/shared/errors";

interface IncrementAccessCountRequest {
  shortUrl: string
}

interface IncrementAccessCountResponse {
  link: {
    shortUrl: string
    originalUrl: string
    accessCount: number
    createdAt: Date
  }
}

export class IncrementAccessCountUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ shortUrl }: IncrementAccessCountRequest): Promise<Either<LinkNotFoundError | IncrementAccessCountError, IncrementAccessCountResponse>> {
    try {
      const link = await this.linkRepository.incrementAccessCount(shortUrl);
      if (!link) {
        return makeLeft(new LinkNotFoundError());
      }
      return makeRight({ link });
    } catch (error) {
      return makeLeft(new IncrementAccessCountError());
    }
  }
} 