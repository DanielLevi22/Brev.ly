import { DrizzleLinkRepository } from "@/repositories/drizzle/drizzle-link-repository";
import { ListAllLinksUseCase } from "../list-all-links-use-case";

export function MakeListAllLinksUseCase() {
  const linkRepository = new DrizzleLinkRepository();
  return new ListAllLinksUseCase(linkRepository);
} 