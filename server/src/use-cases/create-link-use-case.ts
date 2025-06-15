import { Link } from "@/entities/link";
import { LinkRepository } from "@/repositories/link/link-repository";
import { makeLeft, makeRight, type Either } from "@/shared/either";

interface CreateLinkRequest {
  originalUrl: string
}

interface CreateLinkResponse {
  link: Link
}

export class CreateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ originalUrl }: CreateLinkRequest): Promise<Either<Error, CreateLinkResponse>> {
    try {
      new URL(originalUrl);
    } catch (error) {
      return makeLeft(new Error('URL inválida'));
    }

    const shortKey = this.generateShortKey();
   
    const existing = await this.linkRepository.findByShortKey(shortKey);
   
    if (existing) {
      return makeLeft(new Error('Chave curta já existe'));
    } 
    
    const createLink: Link = { 
      shortKey, 
      originalUrl, 
      accessCount: 0, 
      createdAt: new Date() 
    };
    
    try {
      const link = await this.linkRepository.create(createLink);
      return makeRight({ link });
    } catch (error) {
      return makeLeft(new Error('Erro ao criar link'));
    }
  }

  private generateShortKey(): string {
    return Math.random().toString(36).slice(2, 8);
  }
}