Documentação do Projeto: Encurtador de URL
1. Introdução
Este documento descreve o desenvolvimento de um Encurtador de URL, conforme o desafio da Rocketseat. A aplicação permite criar, gerenciar e rastrear URLs encurtadas, usando React + Vite (frontend), Fastify + Node.js (backend com Clean Architecture), PostgreSQL com Drizzle, e TypeScript. Esta iteração define a inicialização do repositório e a arquitetura do backend. A documentação detalha a arquitetura, tecnologias, organização, boas práticas, design patterns, regras de negócio, infraestrutura e estratégia de documentação, servindo como guia para equipes e IA.
1.1. Objetivo

Criar URLs encurtadas únicas.
Redirecionar para URLs originais.
Listar URLs, deletar links e exportar em CSV via CDN.
Garantir responsividade, acessibilidade e performance.

1.2. Público-Alvo

Usuários finais, empresas, desenvolvedores e IA.

1.3. Requisitos do Repositório

Público no GitHub.
Pastas web (Frontend), server (Backend/DevOps).
Funcionalidades obrigatórias na branch main.
Extras (ex.: SSR) em branches separadas (ex.: feat/ssr).
Usar shortKey como identificador.

Justificativa: Estrutura atende requisitos, facilitando colaboração.

2. Requisitos Funcionais e Não Funcionais
2.1. Backend

Funcionalidades:
POST /shorten: Criar link, validar URL, impedir duplicatas [REQ-001].
DELETE /:shortKey: Deletar link [REQ-002].
GET /:shortKey: Redirecionar, incrementar acessos [REQ-003, REQ-005].
GET /links: Listar URLs [REQ-004].
GET /export: Exportar CSV via Cloudflare R2 [REQ-006].


Não Funcionais:
Performance [REQ-007].
Escalabilidade [REQ-008].
Segurança [REQ-009].
Logs [REQ-010].



2.2. Frontend

Funcionalidades:
Criar, deletar, listar links, redirecionar, baixar CSV [REQ-011 a REQ-016].


Páginas:
/: Formulário e listagem.
/:shortKey: Redirecionamento.
*: 404.


Não Funcionais:
SPA com Vite [REQ-017].
Layout do Figma [REQ-018].
UX (loading, empty state) [REQ-019].
Responsividade [REQ-020].
Acessibilidade [REQ-021].



2.3. DevOps

CI/CD com GitHub Actions [REQ-022].
Vercel, Render, Neon [REQ-023].
Cloudflare R2 [REQ-024].
Sentry [REQ-025].

Justificativa: Requisitos garantem funcionalidade e qualidade.

3. Arquitetura Geral
Arquitetura RESTful com SPA e backend em Clean Architecture:

Frontend: React + Vite.
Backend: Fastify + Node, com Clean Architecture (Entidades, Casos de Uso, Controladores, Repositórios, Adaptadores).
Banco: PostgreSQL.
Infra: Vercel, Render, Neon, Cloudflare R2.

Diagrama:
graph TD
    A[Usuário] --> B[Frontend: React + Vite]
    B --> C[Backend: Fastify + Node]
    C --> D[Roteamento]
    D --> E[Controladores]
    E --> F[Casos de Uso]
    F --> G[Entidades]
    F --> H[Repositórios]
    H --> I[Adaptadores: Drizzle]
    I --> J[Banco: PostgreSQL]
    F --> K[Adaptadores: Cloudflare R2]

Justificativa: Clean Architecture promove desacoplamento e testabilidade.
3.1. Arquitetura do Backend: Clean Architecture

Entidades: Regras do domínio (ex.: Link).
Casos de Uso: Lógica de negócios (ex.: criar link).
Controladores: Adaptam requisições HTTP.
Repositórios: Interfaces para dados.
Adaptadores: Implementam repositórios (Drizzle) e frameworks (Fastify).

Estrutura:
server/src/
├── entities/         # Ex.: Link
├── use-cases/        # Ex.: CreateLinkUseCase
├── controllers/      # Adaptadores HTTP
├── repositories/     # Interfaces e adaptadores
├── routes/           # Endpoints Fastify
├── schemas/          # Schemas Drizzle
├── lib/              # Utilitários
└── server.ts         # Entrada

Justificativa:

Desacoplamento: Lógica independente de Fastify/Drizzle.
Testabilidade: Casos de uso puros.
Flexibilidade: Suporta trocas (ex.: banco).
Escalabilidade: Permite extras (ex.: autenticação).
Alinhamento: Integra Fastify, Drizzle, PostgreSQL.

Comparação com Alternativas:

Arquitetura em Camadas:
Prós: Simples, rápida.
Contras: Menos desacoplada, mais difícil de testar.


Hexagonal: Similar, mas Clean é mais documentada.
Microsserviços: Overhead desnecessário.
Event-Driven: Inadequado para operações síncronas.

Decisão: Clean Architecture é ideal por desacoplamento, testabilidade e adequação.

4. Tecnologias
4.1. Frontend

React, Vite, TypeScript, Tailwind CSS, React Query, React Hook Form, Zod, React Router.

Justificativa: Obrigatórias, garantem SPA e UX.
4.2. Backend

Fastify, Node.js, TypeScript, Drizzle, PostgreSQL, Pino, Zod.

Justificativa: Obrigatórias, performance e integração.
4.3. Infra

Vercel, Render, Neon, Cloudflare R2, Sentry, GitHub Actions.

Justificativa: Simplicidade e escalabilidade.

5. Organização do Repositório
Monorepo com NPM Workspaces:
url-shortener/
├── web/                    # Frontend
│   ├── src/               # Código React
│   ├── public/            # Estáticos
│   ├── vite.config.ts     # Vite
│   ├── package.json       # Dependências
│   └── README.md          # Instruções
├── server/                # Backend/DevOps
│   ├── src/              # Código Fastify
│   │   ├── entities/
│   │   ├── use-cases/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── lib/
│   │   └── server.ts
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

Branches:

main: Funcionalidades obrigatórias.
feat/ssr: SSR.
feat/turborepo: Turborepo (futuro).

Justificativa:

Monorepo atende requisitos.
NPM Workspaces gerencia dependências.
docs centraliza documentação.
Sem Turborepo por simplicidade.


6. Estratégia de Documentação
6.1. Formato

Markdown em docs/.
Arquivos: project.md, api.md, setup.md, decisions.md, changelog.md.

6.2. Ferramentas

Swagger (API).
Mermaid (diagramas).
GitHub Wiki (complementar).

6.3. Conteúdo

Visão geral, requisitos, setup, API, decisões, manutenção.
Metadados (ex.: REQ-001) para IA.

6.4. Versionamento

Versionada com Git.
Tags (ex.: v1.0.0).
Changelog.

Justificativa: Markdown é universal. Estrutura facilita colaboração e parsing.

7. Boas Práticas
7.1. Frontend

Componentização, React Query, React Hook Form, Zod, Jest, ESLint, Prettier, ARIA.

7.2. Backend

Modularização, Drizzle, Zod, Pino, Jest, fastify-rate-limit.

Justificativa: Garantem qualidade e manutenção.

8. Design Patterns
8.1. Frontend

Component Pattern, Container/Presentational, Custom Hooks.

8.2. Backend

Repository Pattern: Abstrai banco.
Use Case Pattern: Lógica de negócios.
Adapter Pattern: Integra frameworks.

Justificativa: Alinhados com Clean Architecture.

9. Regras de Negócio

Criação de Link [REQ-001]:

Validar URL longa.
Gerar shortKey único (base62, 6-8 caracteres).
Impedir duplicatas.


Deleção [REQ-002]:

Deletar via shortKey.


Redirecionamento [REQ-003, REQ-005]:

Buscar shortKey, incrementar acessos, redirecionar (301).


Listagem [REQ-004]:

Retornar URLs com acessos e data.


Exportação CSV [REQ-006]:

Gerar CSV único, hospedar em Cloudflare R2.
Campos: URL original, encurtada, acessos, criação.



Justificativa: Atendem requisitos.

10. Passo a Passo: Inicialização

Repositório:

Criar url-shortener público no GitHub.
Adicionar README.md, LICENSE, .gitignore:node_modules/
.env
dist/
build/




Raiz:

Criar package.json:{
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




Frontend (web):

cd web && npm create vite@latest . -- --template react-ts.
Instalar: npm i tailwindcss postcss autoprefixer react-router-dom @tanstack/react-query react-hook-form zod zustand.
Configurar Tailwind: npx tailwindcss init -p.
Estruturar:web/src/
├── components/
├── pages/
├── lib/
├── App.tsx
└── main.tsx




Backend (server):

cd server && npm init -y.
Instalar: npm i fastify drizzle-orm pg zod pino fastify-rate-limit typescript @types/node ts-node-dev.
Configurar TypeScript: npx tsc --init.
Estruturar:server/src/
├── entities/
├── use-cases/
├── controllers/
├── repositories/
├── routes/
├── schemas/
├── lib/
└── server.ts




Documentação (docs):

Criar docs/project.md, api.md, setup.md, decisions.md, changelog.md.


Commit:

git add . && git commit -m "Inicializa monorepo com web, server e docs".
git push origin main.



Justificativa: Setup prepara para desenvolvimento com Clean Architecture.

11. Código de Exemplo
11.1. Backend (Clean Architecture)
// server/src/entities/link.ts
export interface Link {
  shortKey: string;
  originalUrl: string;
  accessCount: number;
  createdAt: Date;
}

// server/src/use-cases/link/create-link-use-case.ts
import { Link } from '../../entities/link';
import { LinkRepository } from '../../repositories/link/link-repository';

export class CreateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute(originalUrl: string): Promise<Link> {
    const shortKey = this.generateShortKey();
    const existing = await this.linkRepository.findByShortKey(shortKey);
    if (existing) throw new Error('Short key exists');
    const link: Link = { shortKey, originalUrl, accessCount: 0, createdAt: new Date() };
    return await this.linkRepository.create(link);
  }

  private generateShortKey(): string {
    return Math.random().toString(36).slice(2, 8);
  }
}

// server/src/repositories/link/link-repository.ts
import { Link } from '../../entities/link';

export interface LinkRepository {
  create(link: Link): Promise<Link>;
  findByShortKey(shortKey: string): Promise<Link | null>;
}

// server/src/repositories/link/drizzle-link-repository.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { links } from '../../schemas/link';
import { Link } from '../../entities/link';
import { LinkRepository } from './link-repository';

const db = drizzle(process.env.DATABASE_URL!);

export class DrizzleLinkRepository implements LinkRepository {
  async create(link: Link): Promise<Link> {
    const [newLink] = await db.insert(links).values(link).returning();
    return newLink;
  }

  async findByShortKey(shortKey: string): Promise<Link | null> {
    const [link] = await db.select().from(links).where(eq(links.shortKey, shortKey));
    return link || null;
  }
}

// server/src/controllers/link.ts
import { CreateLinkUseCase } from '../use-cases/link/create-link-use-case';

export async function shortenLinkController(url: string, useCase: CreateLinkUseCase) {
  const link = await useCase.execute(url);
  return `http://localhost:3000/${link.shortKey}`;
}

// server/src/routes/link.ts
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { shortenLinkController } from '../controllers/link';
import { CreateLinkUseCase } from '../use-cases/link/create-link-use-case';
import { DrizzleLinkRepository } from '../repositories/link/drizzle-link-repository';

const schema = z.object({ url: z.string().url() });

export async function linkRoutes(fastify: FastifyInstance) {
  fastify.post('/shorten', async (request, reply) => {
    const { url } = schema.parse(request.body);
    const repository = new DrizzleLinkRepository();
    const useCase = new CreateLinkUseCase(repository);
    const shortUrl = await shortenLinkController(url, useCase);
    return { shortUrl };
  });
}

// server/src/schemas/link.ts
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  shortKey: text('short_key').unique().notNull(),
  originalUrl: text('original_url').notNull(),
  accessCount: integer('access_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

Justificativa: Exemplo demonstra Clean Architecture.

12. Conclusão
O projeto inicia com um monorepo público, usando NPM Workspaces para web, server e docs. O backend adota Clean Architecture por seu desacoplamento, testabilidade e adequação aos requisitos. A documentação orienta equipes e IA, com metadados e estrutura clara.
Próximos Passos:

Configurar Neon (PostgreSQL).
Implementar endpoint /shorten completo.
Criar página / com formulário.

Contato: GitHub Issues.
