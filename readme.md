# Descrição e Requisitos


Nesse projeto back-end, será desenvolvido uma API para gerenciar o encurtamento de URL's. 

## Funcionalidades e Regras


Para esse desafio é esperado que você utilize o banco de dados Postgres.


- [ ]  Deve ser possível criar um link
    - [ ]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [ ]  Não deve ser possível criar um link com URL encurtada já existente
- [ ]  Deve ser possível deletar um link
- [ ]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [ ]  Deve ser possível listar todas as URL's cadastradas
- [ ]  Deve ser possível incrementar a quantidade de acessos de um link
- [ ]  Deve ser possível exportar os links criados em um CSV
    - [ ]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [ ]  Deve ser gerado um nome aleatório e único para o arquivo
    - [ ]  Deve ser possível realizar a listagem de forma performática
    - [ ]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.
    - [ ]  

- [ ]  Deve ser possível criar um link
    - [ ]  Não deve ser possível criar um link com encurtamento mal formatado
    - [ ]  Não deve ser possível criar um link com encurtamento já existente
- [ ]  Deve ser possível deletar um link
- [ ]  Deve ser possível obter a URL original por meio do encurtamento
- [ ]  Deve ser possível listar todas as URL's cadastradas
- [ ]  Deve ser possível incrementar a quantidade de acessos de um link
- [ ]  Deve ser possível baixar um CSV com o relatório dos links criados

Além disso, também temos algumas regras importantes específicas para o front-end:

- [ ]  É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- [ ]  Siga o mais fielmente possível o layout do Figma;
- [ ]  Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- [ ]  Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.

## 🚀 Desenvolvimento Local

### Setup Automático

Execute o script de configuração para ambiente de desenvolvimento:

```bash
./scripts/setup-dev.sh
```

Este script irá:
- ✅ Verificar se Docker está instalado
- ✅ Iniciar banco PostgreSQL local
- ✅ Executar migrações
- ✅ Configurar dependências

### Setup Manual

1. **Iniciar banco local:**
   ```bash
   cd server && docker-compose up -d
   ```

2. **Configurar variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz
   - Configure credenciais do Cloudflare R2
   - Consulte `ENV_DEVELOPMENT.md` para exemplo

3. **Executar migrações:**
   ```bash
   cd server && pnpm migrate:dev
   ```

4. **Iniciar servidor:**
   ```bash
   cd server && pnpm dev
   ```

### Detecção Automática de Ambiente

A aplicação detecta automaticamente o ambiente:

- **Desenvolvimento:** PostgreSQL local via Docker
- **Produção:** Neon Database serverless

## 🚀 Deploy no Render

Este projeto está configurado para deploy automático no Render. Para fazer o deploy:

### Deploy Automático

1. **Execute o script de preparação:**
   ```bash
   ./scripts/deploy-render.sh
   ```

2. **Siga as instruções do script para:**
   - Fazer commit das mudanças
   - Conectar o repositório ao Render
   - Configurar as variáveis de ambiente

### Deploy Manual

Consulte o arquivo `RENDER_DOCKER.md` para instruções detalhadas de deploy manual.

### URLs após o Deploy

- **API**: https://seu-servico.onrender.com
- **Health Check**: https://seu-servico.onrender.com/health
- **Documentação Swagger**: https://seu-servico.onrender.com/docs

## 🗄️ Banco de Dados Neon

Este projeto está configurado para usar o **Neon Database** (PostgreSQL serverless) em produção.

### Configuração Rápida

1. **Execute o script de configuração:**
   ```bash
   ./scripts/setup-neon.sh
   ```

2. **Siga as instruções para:**
   - Criar conta no Neon
   - Configurar o projeto
   - Obter as credenciais
   - Configurar variáveis de ambiente

### Vantagens do Neon

- ✅ **Serverless**: Escala automaticamente
- ✅ **Branching**: Crie branches do banco para desenvolvimento
- ✅ **Pay-per-use**: Só paga pelo que usar
- ✅ **Compatibilidade**: PostgreSQL 100% compatível
- ✅ **Console web**: Interface intuitiva

### Documentação Completa

Consulte `NEON_INTEGRATION.md` para instruções detalhadas de configuração e troubleshooting.

## 📚 Documentação

- **`ENV_DEVELOPMENT.md`** - Configuração de desenvolvimento local
- **`NEON_INTEGRATION.md`** - Integração com Neon Database
- **`RENDER_DOCKER.md`** - Deploy no Render
- **`NEON_ENV_EXAMPLE.md`** - Exemplo de variáveis de ambiente