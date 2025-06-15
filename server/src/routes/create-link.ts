import { CreateLinkUseCase } from "@/use-cases/create-link-use-case";

export async function shortenLinkController(url: string, useCase: CreateLinkUseCase) {
  const link = await useCase.execute(url);
  return `http://localhost:3000/${link.shortKey}`;
}
