import { env, getDatabaseConfig } from '@/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schema } from '@/schemas/schemas'

// Obter configuração do banco baseada no ambiente
const dbConfig = getDatabaseConfig()

// Configuração do cliente PostgreSQL
export const pg = postgres(dbConfig.url, {
  ssl: dbConfig.ssl,
  max: dbConfig.max,
  connect_timeout: dbConfig.connect_timeout,
})

export const db = drizzle(pg, { schema })

// Log da configuração do banco (apenas em desenvolvimento)
if (env.NODE_ENV === 'development') {
  console.log(`🗄️  Database: ${dbConfig.databaseType}`)
  console.log(`🔗 Host: ${dbConfig.url.split('@')[1]?.split('/')[0] || 'localhost'}`)
}