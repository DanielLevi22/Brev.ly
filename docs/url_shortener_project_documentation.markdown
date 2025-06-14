# Documentação do Projeto: Encurtador de URL

## 1. Introdução
Este documento descreve o desenvolvimento de um **Encurtador de URL**, conforme o desafio da Rocketseat. A aplicação permite criar, gerenciar e rastrear URLs encurtadas, com frontend em React + Vite, backend em Fastify + Node.js, e PostgreSQL com Drizzle, tudo em TypeScript. Esta é a primeira iteração, focada na inicialização do repositório. A documentação detalha a arquitetura, tecnologias, organização, boas práticas, design patterns, regras de negócio, infraestrutura e estratégia de documentação, servindo como guia para equipes e IA.

### 1.1. Objetivo
- Criar URLs encurtadas únicas.
- Redirecionar para URLs originais.
- Listar URLs, deletar links e exportar em CSV via CDN.
- Garantir responsividade, acessibilidade e performance.

### 1.2. Público-Alvo
- Usuários finais, empresas, desenvolvedores e IA.

### 1.3. Requisitos do Repositório
- Público no GitHub.
- Pastas `web` (Frontend), `server` (Backend/DevOps).
- Funcionalidades obrigatórias na branch `main`.
- Extras (ex.: SSR) em branches separadas (ex.: `feat/ssr`).
- Usar `shortKey` como identificador.

**Justificativa**: Estrutura atende requisitos, facilitando colaboração.

---

## 2. Requisitos Funcionais e Não Funcionais
### 2.1. Backend
- **Funcionalidades**:
  - `POST /shorten`: Criar link, validar URL, impedir duplicatas [REQ-001].
  - `DELETE /:shortKey`: Deletar link [REQ-002].
  - `GET /:shortKey`: Redirecionar, incrementar acessos [REQ-003, REQ-005].
  - `GET /links`: Listar URLs [REQ-004].
  - `GET /export`: Exportar CSV via Cloudflare R2 [REQ-006].
- **Não Funcionais**:
  - Performance [REQ-007].
  - Escalabilidade [REQ-008].
  - Segurança [REQ-009].
  - Logs [REQ-010].

### 2.2. Frontend
- **Funcionalidades**:
  - Criar, deletar, listar links, redirecionar, baixar CSV [REQ-011 a REQ-016].
- **Páginas**:
  - `/`: Formulário e listagem.
  - `/:shortKey`: Redirecionamento.
  - `*`: 404.
- **Não Funcionais**:
  - SPA com Vite [REQ-017].
  - Layout do Figma [REQ-018].
  - UX (loading, empty state) [REQ-019].
  - Responsividade [REQ-020].
  - Acessibilidade [REQ-021].

### 2.3. DevOps
- CI/CD com GitHub Actions [REQ-022].
- Vercel, Render, Neon [REQ-023].
- Cloudflare R2 [REQ-024].
- Sentry [REQ-025].

**Justificativa**: Requisitos garantem funcionalidade e qualidade.

---

## 3. Arquitetura Geral
Arquitetura RESTful com SPA:
- **Frontend**: React + Vite.
- **Backend**: Fastify + Node.
- **Banco**: PostgreSQL.
- **Infra**: Vercel, Render, Neon, Cloudflare R2.

**Diagrama**:
```mermaid
graph TD
    A[Usuário] --> B[Frontend: React + Vite]
    B --> C[Backend: Fastify + Node]
    C --> D[Banco: PostgreSQL]
    C --> E[CDN: Cloudflare R2]
```

**Justificativa**: Arquitetura simples e escalável.

---

## 4. Tecnologias
### 4.1. Frontend
- React, Vite, TypeScript, Tailwind CSS, React Query, React Hook Form, Zod, React Router.

**Justificativa**: Obrigatórias, garantem SPA rápida e UX.

### 4.2. Backend
- Fastify, Node.js, TypeScript, Drizzle, PostgreSQL, Pino, Zod.

**Justificativa**: Obrigatórias, performance e integração.

### 4.3. Infra
- Vercel, Render, Neon, Cloudflare R2, Sentry, GitHub Actions.

**Justificativa**: Simplicidade e escalabilidade.

---

## 5. Organização do Repositório
Monorepo com NPM Workspaces:
```
url-shortener/
├── web/                    # Frontend
│   ├── src/               # Código React
│   ├── public/            # Estáticos
│   ├── vite.config.ts     # Vite
│   ├── package.json       # Dependências
│   └── README.md          # Instruções
├── server/                # Backend/DevOps
│   ├── src/              # Código Fastify
│   ├── .github/          # CI/CD
│   ├── package.json      # Dependências
│   └── README.md         # Instruções
├── docs/                 # Documentação
│   ├── project.md        # Este arquivo
│   ├── api.md            # API
│   ├── setup.md          # Setup
│   ├── decisions.md      # ADRs
│   └── changelog.md      # Mudanças
├── package.json          # Scripts globais
├── LICENSE               # MIT
├── README.md             # Visão geral
└── .gitignore            # Ignora node_modules, .env
```

**Branches**:
- `main`: Funcionalidades obrigatórias.
- `feat/ssr`: SSR.
- `feat/turborepo`: Turborepo (futuro).

**Justificativa**:
- Monorepo atende requisitos (`web`, `server`).
- NPM Workspaces gerencia dependências sem overhead.
- `docs` centraliza documentação.

**Decisão: Monorepo sem Turborepo**:
- Pequeno porte do projeto (dois subprojetos) não justifica Turborepo.
- NPM Workspaces e scripts são suficientes.
- Turborepo pode ser avaliado em `feat/turborepo` se necessário.

---

## 6. Estratégia de Documentação
### 6.1. Formato
- Markdown em `docs/`.
- Arquivos: `project.md`, `api.md`, `setup.md`, `decisions.md`, `changelog.md`.

### 6.2. Ferramentas
- Swagger (API).
- Mermaid (diagramas).
- GitHub Wiki (complementar).

### 6.3. Conteúdo
- Visão geral, requisitos, setup, API, decisões, manutenção.
- Metadados (ex.: `REQ-001`) para IA.

### 6.4. Versionamento
- Versionada com Git.
- Tags (ex.: `v1.0.0`).
- Changelog.

**Justificativa**: Markdown é universal. Estrutura facilita colaboração e parsing.

---

## 7. Boas Práticas
### 7.1. Frontend
- Componentização, React Query, React Hook Form, Zod, Jest, ESLint, Prettier, ARIA.

### 7.2. Backend
- Modularização, Drizzle, Zod, Pino, Jest, `fastify-rate-limit`.

**Justificativa**: Garantem qualidade e manutenção.

---

## 8. Design Patterns
### 8.1. Frontend
- Component Pattern, Container/Presentational, Custom Hooks.

### 8.2. Backend
- Repository Pattern, Service Layer, Factory Pattern.

**Justificativa**: Modularidade e testabilidade.

---

## 9. Regras de Negócio
1. Criação de Link [REQ-001]:
   - Validar URL longa.
   - Gerar `shortKey` único (base62, 6-8 caracteres).
   - Impedir duplicatas.

2. Deleção [REQ-002]:
   - Deletar via `shortKey`.

3. Redirecionamento [REQ-003, REQ-005]:
   - Buscar `shortKey`, incrementar acessos, redirecionar (301).

4. Listagem [REQ-004]:
   - Retornar URLs com acessos e data.

5. Exportação CSV [REQ-006]:
   - Gerar CSV único, hospedar em Cloudflare R2.
   - Campos: URL original, encurtada, acessos, criação.

**Justificativa**: Atendem requisitos.

---

## 10. Passo a Passo: Inicialização
1. **Repositório**:
   - Criar `url-shortener` público no GitHub.
   - Adicionar `README.md`, `LICENSE`, `.gitignore`:
     ```
     node_modules/
     .env
     dist/
     build/
     ```

2. **Raiz**:
   - Criar `package.json`:
     ```json
     {
       "name": "url-shortener",
       "private": true,
       "scripts": {
         "dev:web": "cd web && npm run dev",
         "dev:server": "cd server && npm run dev",
         "lint": "npm run lint --workspaces",
         "test": "npm run test --workspaces"
       },
       "workspaces": ["web", "server"]
     }
     ```

3. **Frontend (`web`)**:
   - `cd web && npm create vite@latest . -- --template react-ts`.
   - Instalar: `npm i tailwindcss postcss autoprefixer react-router-dom @tanstack/react-query react-hook-form zod zustand`.
   - Configurar Tailwind: `npx tailwindcss init -p`.
   - Estruturar:
     ```
     web/
     ├── src/
     │   ├── components/
     │   ├── pages/
     │   ├── lib/
     │   ├── App.tsx
     │   └── main.tsx
     ├── public/
     ├── vite.config.ts
     ├── tailwind.config.js
     ├── package.json
     ├── tsconfig.json
     └── README.md
     ```

4. **Backend (`server`)**:
   - `cd server && npm init -y`.
   - Instalar: `npm i fastify drizzle-orm pg zod pino fastify-rate-limit typescript @types/node ts-node-dev`.
   - Configurar TypeScript: `npx tsc --init`.
   - Estruturar:
     ```
     server/
     ├── src/
     │   ├── routes/
     │   ├── services/
     │   ├── schemas/
     │   └── server.ts
     ├── package.json
     ├── tsconfig.json
     └── README.md
     ```

5. **Documentação (`docs`)**:
   - Criar:
     ```
     docs/
     ├── project.md
     ├── api.md
     ├── setup.md
     ├── decisions.md
     ├── changelog.md
     ```
   - Inicializar `project.md` com este conteúdo.

6. **Commit**:
   - `git add . && git commit -m "Inicializa monorepo com web, server e docs"`.
   - `git push origin main`.

**Justificativa**: Setup simples atende requisitos e prepara para desenvolvimento.

---

## 11. Conclusão
O projeto inicia com um monorepo público, usando NPM Workspaces para gerenciar `web`, `server` e `docs`. A escolha de não usar Turborepo simplifica o setup, mas mantém a opção para o futuro. A documentação em Markdown orienta equipes e IA, com estrutura clara e metadados.

**Próximos Passos**:
- Configurar PostgreSQL (Neon).
- Implementar endpoint `/shorten`.
- Criar página `/` com formulário.

**Contato**: GitHub Issues.