#!/bin/bash

# Script para setup do ambiente de desenvolvimento
# Uso: ./scripts/setup-dev.sh

set -e

echo "🚀 Configurando ambiente de desenvolvimento..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -f "server/package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Erro: Docker não está instalado"
    echo "Instale o Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar se o Docker Compose está disponível
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Erro: Docker Compose não está instalado"
    echo "Instale o Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados!"

# Verificar se o banco já está rodando
if docker-compose -f server/docker-compose.yml ps | grep -q "Up"; then
    echo "⚠️  Banco já está rodando. Parando..."
    cd server && docker-compose down
    cd ..
fi

echo "🐳 Iniciando banco PostgreSQL local..."
cd server
docker-compose up -d
cd ..

# Aguardar o banco estar pronto
echo "⏳ Aguardando banco estar pronto..."
sleep 5

# Verificar se o banco está acessível
echo "🔍 Verificando conexão com banco..."
if ! docker exec brevly-pg pg_isready -U postgres; then
    echo "❌ Erro: Banco não está acessível"
    echo "Verifique os logs: cd server && docker-compose logs pg"
    exit 1
fi

echo "✅ Banco PostgreSQL iniciado com sucesso!"

# Instalar dependências se necessário
echo "📦 Verificando dependências..."
cd server
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    pnpm install
fi
cd ..

# Executar migrações
echo "🗄️  Executando migrações..."
cd server
pnpm migrate:dev
cd ..

echo ""
echo "🎉 Ambiente de desenvolvimento configurado!"
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1. Configure as variáveis de ambiente:"
echo "   - Crie um arquivo .env.local na raiz"
echo "   - Configure as credenciais do Cloudflare R2"
echo "   - Consulte ENV_DEVELOPMENT.md para exemplo"
echo ""
echo "2. Inicie o servidor:"
echo "   cd server && pnpm dev"
echo ""
echo "3. Teste a aplicação:"
echo "   curl http://localhost:3333/health"
echo ""
echo "4. Acesse a documentação:"
echo "   http://localhost:3333/docs"
echo ""
echo "📚 Documentação:"
echo "   - ENV_DEVELOPMENT.md - Configuração detalhada"
echo "   - NEON_INTEGRATION.md - Configuração para produção"
echo ""
echo "🛠️  Comandos úteis:"
echo "   - Parar banco: cd server && docker-compose down"
echo "   - Ver logs: cd server && docker-compose logs pg"
echo "   - Resetar banco: cd server && docker-compose down -v && docker-compose up -d" 