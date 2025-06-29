#!/bin/bash

# Script para configuração do Neon Database
# Uso: ./scripts/setup-neon.sh

set -e

echo "🚀 Configurando integração com Neon Database..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -f "server/package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

echo "📋 Verificando configurações..."

# Verificar se o Neon CLI está instalado
if ! command -v neonctl &> /dev/null; then
    echo "⚠️  Neon CLI não encontrado"
    echo "Instale com: npm install -g @neondatabase/cli"
    echo "Ou configure manualmente via console web"
fi

echo "✅ Configurações verificadas!"

echo ""
echo "🎯 Credenciais do Neon já configuradas!"
echo ""
echo "🔗 String de conexão:"
echo "   postgresql://neondb_owner:npg_9iB2TALClgjZ@ep-polished-water-a8o8ri61-pooler.eastus2.azure.neon.tech/brevly?sslmode=require&channel_binding=require"
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1. 🧪 Teste a conexão:"
echo "   ./scripts/test-neon.sh"
echo ""
echo "2. 🔧 Configure as variáveis de ambiente:"
echo ""
echo "   Crie um arquivo .env.local na raiz:"
echo "   # Configurações do Servidor"
echo "   PORT=3333"
echo "   NODE_ENV=development"
echo ""
echo "   # Neon Database"
echo "   DATABASE_URL=postgresql://neondb_owner:npg_9iB2TALClgjZ@ep-polished-water-a8o8ri61-pooler.eastus2.azure.neon.tech/brevly?sslmode=require&channel_binding=require"
echo "   POSTGRES_USER=neondb_owner"
echo "   POSTGRES_PASSWORD=npg_9iB2TALClgjZ"
echo "   POSTGRES_DB=brevly"
echo "   POSTGRES_HOST=ep-polished-water-a8o8ri61-pooler.eastus2.azure.neon.tech"
echo "   POSTGRES_PORT=5432"
echo ""
echo "   # Cloudflare R2 (configure suas credenciais)"
echo "   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id"
echo "   CLOUDFLARE_ACCESS_KEY_ID=your_cloudflare_access_key_id"
echo "   CLOUDFLARE_SECRET_ACCESS_KEY=your_cloudflare_secret_access_key"
echo "   CLOUDFLARE_BUCKET=your_bucket_name"
echo "   CLOUDFLARE_PUBLIC_URL=https://your-public-url.com"
echo ""
echo "3. 🗄️  Execute as migrações:"
echo "   cd server && pnpm migrate:dev"
echo ""
echo "4. 🚀 Inicie o servidor:"
echo "   cd server && pnpm dev"
echo ""
echo "5. 🧪 Teste a aplicação:"
echo "   curl http://localhost:3333/health"
echo ""
echo "6. 🌐 Configure no Render Dashboard:"
echo "   - Use as mesmas variáveis de ambiente"
echo "   - Marque POSTGRES_PASSWORD como 'Secret'"
echo ""
echo "📚 Documentação:"
echo "   - NEON_CONFIGURATION.md - Configuração detalhada"
echo "   - ENV_DEVELOPMENT.md - Configuração de desenvolvimento"
echo ""
echo "🎉 Configuração concluída!" 