# Configuração do Banco de Dados no Render

## Criação do Banco PostgreSQL

1. **No Render Dashboard:**
   - Vá para "New +" → "PostgreSQL"
   - Configure:
     - **Name**: brevly-db
     - **Database**: brevly
     - **User**: brevly_user
     - **Plan**: Starter (ou escolha conforme sua necessidade)
     - **Region**: Oregon (mesma região do seu serviço web)

2. **Após a criação:**
   - Anote as credenciais fornecidas
   - O Render irá fornecer uma string de conexão completa

## Variáveis de Ambiente do Banco

Configure estas variáveis no seu serviço web:

```bash
# String de conexão completa (fornecida pelo Render)
DATABASE_URL=postgresql://brevly_user:password@host:port/brevly

# Credenciais individuais (opcional, mas recomendado)
POSTGRES_USER=brevly_user
POSTGRES_PASSWORD=your_password_here
POSTGRES_DB=brevly
```

## Migrações Automáticas

O script de build (`render-build.sh`) irá executar automaticamente as migrações quando:
- `NODE_ENV=production`
- `DATABASE_URL` estiver configurada

## Execução Manual de Migrações

Se precisar executar migrações manualmente:

1. **Via Render Shell:**
   ```bash
   cd server
   pnpm migrate:prod
   ```

2. **Via Terminal Local (se conectado ao banco):**
   ```bash
   cd server
   DATABASE_URL="sua_url_aqui" pnpm migrate:prod
   ```

## Verificação da Conexão

Para verificar se a conexão está funcionando:

1. **Health Check:**
   - Acesse: `https://seu-servico.onrender.com/health`
   - Deve retornar status 200

2. **Logs do Render:**
   - Verifique os logs do serviço para erros de conexão
   - Procure por mensagens relacionadas ao banco

## Troubleshooting

### Erro de Conexão
- Verifique se o banco está ativo no Render
- Confirme se as credenciais estão corretas
- Verifique se o IP do serviço está liberado (se aplicável)

### Erro de Migração
- Verifique se o usuário tem permissões de escrita
- Confirme se o banco existe e está acessível
- Verifique os logs de erro específicos

### Timeout de Conexão
- O Render pode ter timeouts específicos
- Considere usar connection pooling se necessário
- Verifique se o banco está na mesma região 