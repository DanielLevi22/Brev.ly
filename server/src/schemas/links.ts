import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  shortUrl: text('short_key').unique().notNull(),
  originalUrl: text('original_url').notNull(),
  accessCount: integer('access_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});