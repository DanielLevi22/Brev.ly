import { createLinkController } from '../controllers/create-link'
import { deleteLinkController } from '../controllers/delete-link'
import { getOriginalUrlController } from '../controllers/get-original-url'

export async function routes(app: any) {
  await app.register(createLinkController)
  await app.register(deleteLinkController)
  await app.register(getOriginalUrlController)
} 