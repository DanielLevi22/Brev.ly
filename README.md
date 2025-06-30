# 🚀 Brev.ly - Encurtador de Links

Um encurtador de URLs moderno e eficiente, construído com React + Vite (frontend) e Fastify + Node.js (backend) usando Clean Architecture.

## ✨ Funcionalidades

- 🔗 **Criar links encurtados** com URLs personalizadas
- 📊 **Acompanhar acessos** de cada link
- 📋 **Listar todos os links** criados
- 🗑️ **Deletar links** quando necessário
- 📄 **Exportar relatórios** em CSV
- 📱 **Interface responsiva** para desktop e mobile
- 🔒 **Validação robusta** de URLs e dados
- ⚡ **Performance otimizada** com React Query

## 🛠️ Tecnologias

### Frontend
- **React 18** + **TypeScript**
- **Vite** como bundler
- **React Router** para navegação
- **React Hook Form** + **Zod** para formulários
- **Tailwind CSS** para estilização
- **React Query** para gerenciamento de estado
- **Phosphor Icons** para ícones

### Backend
- **Fastify** + **TypeScript**
- **Clean Architecture** com Use Cases
- **Drizzle ORM** + **PostgreSQL**
- **Zod** para validação de schemas
- **Pino** para logging estruturado
- **Swagger** para documentação da API

## 🚀 Como Executar Localmente

### Pré-requisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Docker** e **Docker Compose**
- **Git**

### 1. Clone o Repositório

```bash
git clone https://github.com/DanielLevi22/Brev.ly.git
cd Brev.ly
```

### 2. Configurar o Backend

```bash
# Entrar na pasta do servidor
cd server

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp env.example .env
```

**Edite o arquivo `.env` com suas configurações:**
```env
# Banco de dados local
DATABASE_URL=postgres://postgres:postgres@localhost:5432/brevly

# Configurações do servidor
PORT=3333
NODE_ENV=development

# Configurações do Cloudflare R2 (opcional para desenvolvimento)
CLOUDFLARE_ACCOUNT_ID=seu_account_id
CLOUDFLARE_ACCESS_KEY_ID=sua_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=sua_secret_key
CLOUDFLARE_BUCKET=seu_bucket
CLOUDFLARE_PUBLIC_URL=https://seu_dominio.com
```

### 3. Iniciar o Banco de Dados

```bash
# Iniciar PostgreSQL via Docker
pnpm docker:up

# Executar migrações
pnpm migrate:dev
```

### 4. Executar o Backend

```bash
# Desenvolvimento (com hot reload)
pnpm dev

# Ou iniciar apenas o servidor (se o banco já estiver rodando)
tsx watch --env-file .env src/server.ts
```

O backend estará disponível em: **http://localhost:3333**

### 5. Configurar o Frontend

```bash
# Em outro terminal, entrar na pasta do frontend
cd web

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp env.example .env
```

**Edite o arquivo `.env` do frontend:**
```env
# URL da API (backend)
VITE_API_URL=http://localhost:3333

# URLs para redirecionamento
VITE_REDIRECT_URL=http://localhost:3333
VITE_PUBLIC_URL=http://localhost:5173
VITE_FRONTEND_URL=http://localhost:5173
```

### 6. Executar o Frontend

```bash
# Desenvolvimento
pnpm dev

# Preview da build
pnpm preview
```

O frontend estará disponível em: **http://localhost:5173**

## 📋 Scripts Disponíveis

### Backend (`server/`)

```bash
# Desenvolvimento
pnpm dev                    # Inicia servidor + banco de dados
pnpm docker:up             # Apenas inicia o banco
pnpm docker:down           # Para o banco
pnpm docker:restart        # Reinicia o banco

# Banco de dados
pnpm migrate:dev           # Executa migrações (desenvolvimento)
pnpm migrate:test          # Executa migrações (testes)
pnpm migrate:prod          # Executa migrações (produção)
pnpm db:generate           # Gera novas migrações
pnpm db:studio             # Abre Drizzle Studio

# Build e produção
pnpm build                 # Build para produção
pnpm start                 # Inicia servidor de produção

# Testes
pnpm test:unit             # Testes unitários
pnpm test:e2e              # Testes end-to-end
pnpm test:full             # Todos os testes
```

### Frontend (`web/`)

```bash
# Desenvolvimento
pnpm dev                   # Servidor de desenvolvimento
pnpm preview               # Preview da build

# Build
pnpm build                 # Build para produção

# Testes
pnpm test                  # Executa testes
pnpm test:ui               # Interface visual dos testes
pnpm test:run              # Executa testes sem UI
pnpm test:coverage         # Testes com cobertura

# Linting
pnpm lint                  # Verifica código
```

## 🌐 Endpoints da API

### Links
- `POST /link` - Criar novo link
- `GET /links` - Listar todos os links
- `DELETE /link/:shortUrl` - Deletar link
- `GET /:shortKey` - Redirecionar para URL original
- `GET /export` - Exportar links em CSV

### Documentação
- `GET /docs` - Documentação Swagger
- `GET /health` - Health check

## 🗄️ Estrutura do Banco

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  short_url VARCHAR(20) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Troubleshooting

### Problemas Comuns

**1. Erro de conexão com banco:**
```bash
# Verificar se o container está rodando
docker ps | grep brevly-pg

# Reiniciar o banco
cd server && pnpm docker:restart
```

**2. Erro de migração:**
```bash
# Limpar volume e recriar
cd server && pnpm docker:down -v && pnpm docker:up
pnpm migrate:dev
```

**3. Frontend não conecta com backend:**
- Verificar se `VITE_API_URL` está correto no `.env`
- Verificar se o backend está rodando na porta 3333
- Verificar CORS no backend

**4. Erro de dependências:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🚀 Deploy

### Frontend (Vercel)
```bash
cd web
vercel --prod
```

### Backend (Render/Railway)
```bash
cd server
# Configurar variáveis de ambiente
# Fazer deploy via Git
```

## 📚 Documentação Adicional

- [Documentação da API](./docs/)
- [Arquitetura do Projeto](./docs/url_shortener_project_documentation.markdown)
- [Configuração de Ambiente](./docs/ENV_DEVELOPMENT.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Daniel Levi**
- GitHub: [@DanielLevi22](https://github.com/DanielLevi22)
- LinkedIn: [Daniel Levi](https://www.linkedin.com/in/daniel-levi-22/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório! 