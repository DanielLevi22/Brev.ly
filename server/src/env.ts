import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(process.env.NODE_ENV === 'production' ? 10000 : 3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  
  // Configurações de banco de dados
  DATABASE_URL: z.string().url().optional(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional(),
  POSTGRES_HOST: z.string().optional(),
  POSTGRES_PORT: z.coerce.number().default(5432),
  
  // Cloudflare R2
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string().url(),
})

const env = envSchema.parse(process.env)

// Função para obter a URL do banco baseada no ambiente
export function getDatabaseUrl(): string {
  // Se DATABASE_URL está definida, use ela (prioridade para Neon)
  if (env.DATABASE_URL) {
    return env.DATABASE_URL
  }
  
  // Em desenvolvimento, use banco local Docker
  if (env.NODE_ENV === 'development') {
    const user = env.POSTGRES_USER || 'postgres'
    const password = env.POSTGRES_PASSWORD || 'postgres'
    const db = env.POSTGRES_DB || 'brevly'
    const host = env.POSTGRES_HOST || 'localhost'
    const port = env.POSTGRES_PORT || 5432
    
    return `postgresql://${user}:${password}@${host}:${port}/${db}`
  }
  
  // Em produção, requer DATABASE_URL (Neon)
  throw new Error('DATABASE_URL is required in production environment')
}

// Função para obter configurações do banco
export function getDatabaseConfig() {
  const isDevelopment = env.NODE_ENV === 'development'
  const isProduction = env.NODE_ENV === 'production'
  
  return {
    url: getDatabaseUrl(),
    ssl: isProduction ? 'require' as const : false, // SSL apenas em produção (Neon)
    max: isProduction ? 1 : 10, // Pool menor para Neon, maior para local
    connect_timeout: 10,
    databaseType: isProduction ? 'neon' : 'local-docker'
  }
}

export { env }