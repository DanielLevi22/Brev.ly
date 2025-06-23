import { pg } from '@/db';

export async function resetDatabase() {
  // Adapte para suas tabelas reais
  await pg`TRUNCATE TABLE links RESTART IDENTITY CASCADE;`;
} 