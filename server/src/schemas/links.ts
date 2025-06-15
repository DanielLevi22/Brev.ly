import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  shortKey: text('short_key').unique().notNull(),
  originalUrl: text('original_url').notNull(),
  accessCount: integer('access_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});