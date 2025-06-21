import { DrizzleLinkRepository } from "@/repositories/drizzle/drizzle-link-repository";
import { IncrementAccessCountUseCase } from "../increment-access-count-use-case";

export function MakeIncrementAccessCountUseCase() {
  const linkRepository = new DrizzleLinkRepository();
  return new IncrementAccessCountUseCase(linkRepository);
} 