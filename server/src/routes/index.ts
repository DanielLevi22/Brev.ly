import type { FastifyInstance } from "fastify";
import { createLinkController } from "@/controllers/create-link";
import { deleteLinkController } from "@/controllers/delete-link";
import { getOriginalUrlController } from "@/controllers/get-original-url";
import { listAllLinksController } from "@/controllers/list-all-links";
import { incrementAccessCountController } from "@/controllers/increment-access-count";
import { generateLinksReportController } from "@/controllers/generate-links-report";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const routes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  await app.register(createLinkController);
  await app.register(deleteLinkController);
  await app.register(getOriginalUrlController);
  await app.register(listAllLinksController);
  await app.register(incrementAccessCountController);
  await app.register(generateLinksReportController);
};