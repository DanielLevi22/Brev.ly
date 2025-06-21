import { DrizzleLinkRepository } from "@/repositories/drizzle/drizzle-link-repository";
import { GetOriginalUrlUseCase } from "../get-original-url-use-case";

export function MakeGetOriginalUrlUseCase() {
  const linkRepository = new DrizzleLinkRepository();
  return new GetOriginalUrlUseCase(linkRepository);
} 