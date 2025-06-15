import { shortenLinkController } from '../controllers/create-link'

export async function routes(app: any) {
  await app.register(shortenLinkController)
} 