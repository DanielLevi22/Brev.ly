import { DrizzleLinkRepository } from "@/repositories/drizzle/drizzle-link-repository"
import { CreateLinkUseCase } from "../create-link-use-case"

export function MakeCreateLinkUseCase() {
  const repository = new DrizzleLinkRepository()
  const createLinkUseCase = new CreateLinkUseCase(repository)
  return createLinkUseCase
}