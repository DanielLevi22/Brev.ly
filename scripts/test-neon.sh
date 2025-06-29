#!/bin/bash

# Script para testar conexão com Neon Database
# Uso: ./scripts/test-neon.sh

set -e

echo "🧪 Testando conexão com Neon Database..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -f "server/package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# String de conexão do Neon
NEON_URL="postgresql://neondb_owner:npg_9iB2TALClgjZ@ep-polished-water-a8o8ri61-pooler.eastus2.azure.neon.tech/brevly?sslmode=require&channel_binding=require"

echo "🔗 String de conexão:"
echo "   $NEON_URL"
echo ""

# Teste 1: Verificar se o endpoint está acessível
echo "1️⃣  Testando conectividade do endpoint..."
if ping -c 1 ep-polished-water-a8o8ri61-pooler.eastus2.azure.neon.tech > /dev/null 2>&1; then
    echo "✅ Endpoint acessível"
else
    echo "⚠️  Endpoint não responde ao ping (pode ser normal)"
fi

# Teste 2: Testar conexão via Docker
echo ""
echo "2️⃣  Testando conexão via Docker..."
if docker run --rm postgres:15 psql "$NEON_URL" -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ Conexão via Docker bem-sucedida"
else
    echo "❌ Erro na conexão via Docker"
    echo "   Verifique se o Docker está rodando"
fi

# Teste 3: Testar via aplicação
echo ""
echo "3️⃣  Testando via aplicação..."

# Criar arquivo .env temporário para teste
cat > .env.test << EOF
NODE_ENV=development
PORT=3333
DATABASE_URL=$NEON_URL
POSTGRES_USER=neondb_owner
POSTGRES_PASSWORD=npg_9iB2TALClgjZ
POSTGRES_DB=brevly
POSTGRES_HOST=ep-polished-water-a8o8ri61-pooler.eastus2.azure.neon.tech
POSTGRES_PORT=5432
CLOUDFLARE_ACCOUNT_ID=test
CLOUDFLARE_ACCESS_KEY_ID=test
CLOUDFLARE_SECRET_ACCESS_KEY=test
CLOUDFLARE_BUCKET=test
CLOUDFLARE_PUBLIC_URL=https://test.com
EOF

# Testar build da aplicação
echo "   Testando build..."
cd server
if pnpm build > /dev/null 2>&1; then
    echo "✅ Build bem-sucedido"
else
    echo "❌ Erro no build"
    cd ..
    rm -f .env.test
    exit 1
fi
cd ..

# Testar migração
echo "   Testando migração..."
cd server
if DATABASE_URL="$NEON_URL" pnpm migrate:dev > /dev/null 2>&1; then
    echo "✅ Migração bem-sucedida"
else
    echo "❌ Erro na migração"
    cd ..
    rm -f .env.test
    exit 1
fi
cd ..

# Limpar arquivo temporário
rm -f .env.test

echo ""
echo "🎉 Testes concluídos!"
echo ""
echo "📝 Próximos passos:"
echo "1. Configure o arquivo .env.local com as credenciais do Neon"
echo "2. Configure as credenciais do Cloudflare R2"
echo "3. Teste a aplicação: cd server && pnpm dev"
echo "4. Verifique o health check: curl http://localhost:3333/health"
echo ""
echo "📚 Consulte NEON_CONFIGURATION.md para configuração completa" 