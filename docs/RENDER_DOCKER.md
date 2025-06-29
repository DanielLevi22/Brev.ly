# Deploy com Docker no Render

Este documento explica como configurar o deploy do Brev.ly usando Docker no Render.

## Pipeline Docker Existente

Você já possui uma pipeline CI/CD completa configurada no GitHub Actions que:

1. **Executa testes** (`ci.yml`)
2. **Constrói e faz push da imagem Docker** para Docker Hub
3. **Cria releases automáticos** com semantic-release

### Imagens Disponíveis

Após cada push para `main` ou `master`, as seguintes imagens são criadas:

```
daniellevi23/brevly:latest
daniellevi23/brevly:main
daniellevi23/brevly:master
daniellevi23/brevly:v1.0.0 (para tags semver)
```

## Configuração no Render

### Opção 1: Build Local no Render (Recomendado)

O Render irá construir a imagem Docker localmente usando o `Dockerfile`:

```yaml
services:
  - type: web
    name: brevly-server
    runtime: docker
    dockerfilePath: ./server/Dockerfile
    dockerContext: .
```

**Vantagens:**
- Build automático a cada push
- Sem necessidade de registry externo
- Mais simples de configurar

### Opção 2: Usar Imagem Pré-construída (Avançado)

Para usar a imagem pré-construída do Docker Hub, você precisará:

1. **Configurar credenciais do Docker Hub no Render**
2. **Usar uma configuração personalizada**

## Deploy Automático

### Fluxo Atual

1. **Push para GitHub:**
   ```bash
   git push origin main
   ```

2. **GitHub Actions executa:**
   - ✅ Testes unitários e E2E
   - ✅ Build da imagem Docker
   - ✅ Push para Docker Hub
   - ✅ Release automático (se aplicável)

3. **Render detecta mudanças e faz deploy**

### Configuração das Variáveis de Ambiente

Configure no Render Dashboard:

```bash
# Configurações do Servidor
NODE_ENV=production
PORT=10000

# Configurações do Banco de Dados (fornecidas pelo Render)
DATABASE_URL=postgresql://username:password@host:port/database
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name

# Configurações do Cloudflare R2 (Storage)
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_cloudflare_access_key_id
CLOUDFLARE_SECRET_ACCESS_KEY=your_cloudflare_secret_access_key
CLOUDFLARE_BUCKET=your_bucket_name
CLOUDFLARE_PUBLIC_URL=https://your-public-url.com
```

## Monitoramento

### GitHub Actions
- **CI Pipeline:** `.github/workflows/ci.yml`
- **Status:** Verifique na aba "Actions" do GitHub
- **Logs:** Acesse os logs de cada job

### Render
- **Deploy:** Automático a cada push
- **Logs:** Dashboard do Render
- **Health Check:** `https://seu-servico.onrender.com/health`

### Docker Hub
- **Imagens:** https://hub.docker.com/r/daniellevi23/brevly
- **Tags:** Verifique as versões disponíveis

## URLs após o Deploy

- **API:** https://seu-servico.onrender.com
- **Health Check:** https://seu-servico.onrender.com/health
- **Documentação Swagger:** https://seu-servico.onrender.com/docs

## Troubleshooting

### Erro de Build no GitHub Actions
- Verifique se todos os testes passaram
- Confirme se o `Dockerfile` está correto
- Verifique os logs do job "Build and Push Docker Image"

### Erro de Deploy no Render
- Verifique se a imagem foi construída com sucesso
- Confirme se as variáveis de ambiente estão configuradas
- Verifique os logs do Render

### Erro de Conexão com Banco
- Verifique se o banco PostgreSQL está ativo
- Confirme se as credenciais estão corretas
- Execute as migrações se necessário

## Próximos Passos

1. **Configure o serviço no Render** usando o `render.yaml`
2. **Configure as variáveis de ambiente** no Dashboard
3. **Faça push para o GitHub** para trigger o deploy
4. **Monitore o processo** nos logs do Render 