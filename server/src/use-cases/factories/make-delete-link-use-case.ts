import { DrizzleLinkRepository } from "@/repositories/drizzle/drizzle-link-repository";
import { DeleteLinkUseCase } from "../delete-link-use-case";

export function MakeDeleteLinkUseCase() {
  const linkRepository = new DrizzleLinkRepository();
  return new DeleteLinkUseCase(linkRepository);
} 