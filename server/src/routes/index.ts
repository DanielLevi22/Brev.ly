import { createLinkController } from '../controllers/create-link'
import { deleteLinkController } from '../controllers/delete-link'

export async function routes(app: any) {
  await app.register(createLinkController)
  await app.register(deleteLinkController)
} 