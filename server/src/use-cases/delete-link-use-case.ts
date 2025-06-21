import { LinkRepository } from "@/repositories/link/link-repository";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { DeleteLinkError, LinkNotFoundError } from "../shared/errors";


interface DeleteLinkRequest {
  shortUrl: string
}

interface DeleteLinkResponse {
  message: string
}

export class DeleteLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ shortUrl }: DeleteLinkRequest): Promise<Either<LinkNotFoundError | DeleteLinkError, DeleteLinkResponse>> {
    const existingLink = await this.linkRepository.findByShortUrl(shortUrl);
    
    if (!existingLink) {
      return makeLeft(new LinkNotFoundError());
    }
    
    try {
      await this.linkRepository.delete(shortUrl);
      return makeRight({ message: 'Link deletado com sucesso' });
    } catch (error) {
      return makeLeft(new DeleteLinkError());
    }
  }
}
