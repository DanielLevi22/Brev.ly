// Configuração de ambiente
export const config = {
  // URL base do frontend
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  
  // URL base para redirecionamento (pode ser diferente do frontend)
  REDIRECT_URL: import.meta.env.VITE_REDIRECT_URL || 'http://localhost:5173',
  
  // URL base para exibição (domínio público)
  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL || 'brev.ly',
  
  // URL da API
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  
  // Ambiente
  NODE_ENV: import.meta.env.MODE || 'development',
  
  // Verificar se está em produção
  IS_PRODUCTION: import.meta.env.PROD || false,
} as const;

// Função para gerar URL completa do short link
export function getShortUrl(shortKey: string): string {
  return `${config.PUBLIC_URL}/${shortKey}`;
}

// Função para gerar URL de redirecionamento
export function getRedirectUrl(shortKey: string): string {
  return `${config.REDIRECT_URL}/${shortKey}`;
}

// Função para gerar URL completa do frontend
export function getFrontendUrl(path: string = ''): string {
  return `${config.FRONTEND_URL}${path}`;
} 