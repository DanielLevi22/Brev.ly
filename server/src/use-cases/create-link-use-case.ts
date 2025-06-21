import { Link } from "@/entities/link";
import { LinkRepository } from "@/repositories/link/link-repository";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { 
  InvalidUrlError, 
  InvalidShortUrlError, 
  ShortUrlAlreadyExistsError, 
  CreateLinkError 
} from "@/shared/errors";

interface CreateLinkRequest {
  originalUrl: string
  shortUrl: string
}

interface CreateLinkResponse {
  link: Link
}

export class CreateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ originalUrl, shortUrl }: CreateLinkRequest): Promise<Either<
  InvalidUrlError | InvalidShortUrlError  | ShortUrlAlreadyExistsError | CreateLinkError, CreateLinkResponse>> {

    try {
      new URL(originalUrl);
    } catch (error) {
      return makeLeft(new InvalidUrlError());
    }

    if (!this.isValidShortUrl(shortUrl)) {
      return makeLeft(new InvalidShortUrlError());
    }

    const existing = await this.linkRepository.findByShortUrl(shortUrl);
   
    if (existing) {
      return makeLeft(new ShortUrlAlreadyExistsError());
    } 
    
    try {
      const link = await this.linkRepository.create({ shortUrl, originalUrl });
      return makeRight({ link });
    } catch (error) {
      return makeLeft(new CreateLinkError());
    }
  }

  private isValidShortUrl(shortUrl: string): boolean {
    if (!shortUrl || shortUrl.trim().length === 0) {
      return false;
    }

    const validShortUrlPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validShortUrlPattern.test(shortUrl)) {
      return false;
    }

    if (shortUrl.length < 3 || shortUrl.length > 20) {
      return false;
    }

    return true;
  }
}