import { Readable } from 'node:stream';
import { env } from '@/env';
import { r2 } from './client';
import { Upload } from '@aws-sdk/lib-storage';
import { db } from '@/db';
import { links as linksTable } from '@/schemas/links';
import { sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { stringify } from 'csv-stringify/sync';

export async function generateAndUploadLinksCsv() {
  // Buscar todos os links do banco
  const allLinks = await db.select().from(linksTable).orderBy(sql`${linksTable.createdAt} DESC`);

  // Gerar CSV
  const records = allLinks.map(link => [
    link.shortUrl,
    link.originalUrl,
    link.accessCount,
    link.createdAt instanceof Date ? link.createdAt.toISOString() : link.createdAt
  ]);
  const header = ['shortUrl', 'originalUrl', 'accessCount', 'createdAt'];
  const csvContent = stringify([header, ...records]);

  // Criar stream do CSV
  const csvStream = Readable.from([csvContent]);

  // Nome do arquivo
  const fileName = `downloads/links-report-${randomUUID()}.csv`;

  // Upload
  const upload = new Upload({
    client: r2,
    params: {
      Key: fileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: csvStream,
      ContentType: 'text/csv',
    },
  });
  await upload.done();

  return {
    key: fileName,
    url: new URL(fileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
} 