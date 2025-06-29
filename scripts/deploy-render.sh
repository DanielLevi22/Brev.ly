#!/bin/bash

# Script para deploy no Render
# Uso: ./scripts/deploy-render.sh

set -e

echo "🚀 Iniciando deploy no Render..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -f "server/package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Verificar se o git está configurado
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Erro: Este diretório não é um repositório git"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Aviso: Há mudanças não commitadas no repositório"
    echo "Recomendamos commitar todas as mudanças antes do deploy"
    read -p "Deseja continuar mesmo assim? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Verificar se o render.yaml existe
if [ ! -f "render.yaml" ]; then
    echo "❌ Erro: Arquivo render.yaml não encontrado"
    exit 1
fi

echo "📋 Verificando configuração do Render..."

# Validar render.yaml (verificação básica)
if ! grep -q "brevly-server" render.yaml; then
    echo "❌ Erro: Configuração do serviço não encontrada no render.yaml"
    exit 1
fi

if ! grep -q "runtime: docker" render.yaml; then
    echo "❌ Erro: Configuração Docker não encontrada no render.yaml"
    exit 1
fi

echo "✅ Configuração do Render válida!"

# Verificar se o Dockerfile existe
if [ ! -f "server/Dockerfile" ]; then
    echo "❌ Erro: Dockerfile não encontrado em server/Dockerfile"
    exit 1
fi

echo "🐳 Dockerfile encontrado!"

# Verificar se a pipeline CI existe
if [ ! -f ".github/workflows/ci.yml" ]; then
    echo "⚠️  Aviso: Pipeline CI não encontrada em .github/workflows/ci.yml"
    echo "O deploy pode não funcionar corretamente"
else
    echo "✅ Pipeline CI encontrada!"
fi

# Verificar configuração de ambiente
echo "🔍 Verificando configuração de ambiente..."

if grep -q "getDatabaseConfig" server/src/env.ts; then
    echo "✅ Detecção automática de ambiente configurada!"
    echo "   - Desenvolvimento: PostgreSQL local (Docker)"
    echo "   - Produção: Neon Database"
else
    echo "⚠️  Aviso: Detecção automática de ambiente não encontrada"
fi

# Instruções finais
echo ""
echo "🎉 Preparação concluída!"
echo ""
echo "📝 Próximos passos:"
echo "1. Faça push das mudanças para o GitHub:"
echo "   git add ."
echo "   git commit -m 'feat: prepare for render deployment'"
echo "   git push origin main"
echo ""
echo "2. O GitHub Actions irá executar automaticamente:"
echo "   ✅ Testes unitários e E2E"
echo "   ✅ Build da imagem Docker"
echo "   ✅ Push para Docker Hub"
echo ""
echo "3. Configure o serviço no Render Dashboard:"
echo "   https://dashboard.render.com"
echo "   - Crie um novo Web Service"
echo "   - Conecte seu repositório GitHub"
echo "   - Use o arquivo render.yaml para configuração"
echo ""
echo "4. Configure as variáveis de ambiente no Render:"
echo "   # Configurações obrigatórias:"
echo "   NODE_ENV=production"
echo "   PORT=10000"
echo "   DATABASE_URL=postgresql://... (Neon Database)"
echo "   POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB"
echo "   CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_ACCESS_KEY_ID, etc."
echo ""
echo "5. O Render irá fazer deploy automaticamente após o push"
echo ""
echo "📚 Documentação:"
echo "   - RENDER_DOCKER.md - Instruções detalhadas de deploy"
echo "   - NEON_INTEGRATION.md - Configuração do banco Neon"
echo "   - ENV_DEVELOPMENT.md - Configuração de desenvolvimento local" 