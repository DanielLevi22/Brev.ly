# Deploy no Render

Este documento explica como fazer o deploy do servidor Brev.ly no Render.

## Pré-requisitos

1. Conta no Render (https://render.com)
2. Repositório no GitHub com o código
3. Configuração das variáveis de ambiente

## Configuração do Banco de Dados

1. No Render Dashboard, crie um novo banco PostgreSQL
2. Anote as credenciais fornecidas pelo Render
3. Configure as variáveis de ambiente com essas credenciais

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no seu serviço no Render:

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

## Passos para Deploy

1. **Conecte seu repositório GitHub ao Render**
   - Vá para o Dashboard do Render
   - Clique em "New +" e selecione "Web Service"
   - Conecte seu repositório GitHub

2. **Configure o serviço**
   - **Name**: brevly-server
   - **Environment**: Node
   - **Build Command**: `cd server && pnpm install && pnpm build`
   - **Start Command**: `cd server && pnpm start`
   - **Plan**: Starter (ou escolha conforme sua necessidade)

3. **Configure as variáveis de ambiente**
   - Adicione todas as variáveis listadas acima
   - Para variáveis sensíveis, marque como "Secret"

4. **Configure o banco de dados**
   - Crie um banco PostgreSQL no Render
   - Conecte o banco ao seu serviço web
   - As variáveis de banco serão automaticamente injetadas

5. **Deploy**
   - Clique em "Create Web Service"
   - O Render irá fazer o build e deploy automaticamente

## Migrações do Banco

Após o primeiro deploy, você precisará executar as migrações:

1. Acesse o terminal do seu serviço no Render
2. Execute: `cd server && pnpm migrate:prod`

## Monitoramento

- Use os logs do Render para monitorar a aplicação
- Configure alertas para downtime
- Monitore o uso de recursos

## URLs

- **API**: https://seu-servico.onrender.com
- **Health Check**: https://seu-servico.onrender.com/health
- **Documentação Swagger**: https://seu-servico.onrender.com/documentation

## Troubleshooting

### Erro de Build
- Verifique se todas as dependências estão no `package.json`
- Confirme se o comando de build está correto

### Erro de Conexão com Banco
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o banco está ativo e acessível

### Erro de Porta
- O Render usa a porta 10000 por padrão
- Certifique-se de que a aplicação está configurada para usar a porta correta 