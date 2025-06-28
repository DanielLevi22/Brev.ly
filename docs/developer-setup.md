# 🛠️ Setup para Desenvolvedores - Brev.ly

## 🚀 Configuração Inicial

### 1. Clone e Instalação
```bash
git clone https://github.com/DanielLevi22/Brev.ly.git
cd Brev.ly
pnpm install
```

### 2. Configurar Hooks
```bash
# Os hooks são instalados automaticamente
pnpm run prepare
```

### 3. Configurar Ambiente
```bash
# Copiar arquivos de exemplo
cp server/.env.example server/.env
cp web/.env.example web/.env
```

## 📝 Convenções de Commit

### Comando Principal
```bash
pnpm commit
```

### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `perf`: Performance
- `test`: Testes
- `build`: Build
- `ci`: CI/CD
- `chore`: Manutenção

### Exemplos
```bash
feat: add user authentication
fix: resolve database timeout
docs: update API documentation
ci: add GitHub Actions workflow
```

## 🏃‍♂️ Comandos de Desenvolvimento

### Servidor
```bash
cd server
pnpm dev          # Desenvolvimento
pnpm build        # Build
pnpm test:unit    # Testes unitários
pnpm test:e2e     # Testes E2E
pnpm test:full    # Todos os testes
```

### Frontend
```bash
cd web
pnpm dev          # Desenvolvimento
pnpm build        # Build
pnpm test         # Testes
pnpm lint         # Lint
```

### Projeto Completo
```bash
# Raiz do projeto
pnpm dev          # Desenvolvimento paralelo
pnpm build        # Build de tudo
pnpm test         # Testes de tudo
pnpm lint         # Lint de tudo
```

## 🔧 Workflow de Desenvolvimento

### 1. Nova Feature
```bash
# Criar branch
git checkout -b feature/nova-funcionalidade

# Desenvolver
# ...

# Commit
git add .
pnpm commit

# Push
git push origin feature/nova-funcionalidade

# Criar Pull Request
```

### 2. Correção de Bug
```bash
# Criar branch
git checkout -b fix/correcao-bug

# Corrigir
# ...

# Commit
git add .
pnpm commit

# Push e PR
```

### 3. Documentação
```bash
# Criar branch
git checkout -b docs/atualizar-docs

# Atualizar docs
# ...

# Commit
git add .
pnpm commit
```

## 🧪 Testes

### Executar Testes
```bash
# Todos os testes
pnpm test

# Apenas servidor
cd server && pnpm test:full

# Apenas frontend
cd web && pnpm test
```

### Cobertura
```bash
# Servidor
cd server && pnpm test:unit --coverage

# Frontend
cd web && pnpm test --coverage
```

## 🔍 Lint e Formatação

### Verificar
```bash
# Tudo
pnpm lint

# Servidor
cd server && pnpm lint

# Frontend
cd web && pnpm lint
```

### Formatar
```bash
# Tudo
pnpm format

# Servidor
cd server && pnpm format

# Frontend
cd web && pnpm format
```

## 🐳 Docker

### Desenvolvimento
```bash
# Subir serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Produção
```bash
# Build e deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Documentação

### Arquivos Importantes
- `docs/commit-guide.md` - Guia completo de commits
- `docs/commit-cheatsheet.md` - Referência rápida
- `docs/ci-cd.md` - Pipeline de CI/CD
- `docs/devops.md` - Configurações de DevOps

### Comandos Úteis
```bash
# Ver documentação
cat docs/commit-cheatsheet.md

# Abrir documentação
code docs/
```

## 🚨 Troubleshooting

### Commit Rejeitado
```bash
# Usar Commitizen
pnpm commit

# Ou verificar formato
git commit -m "tipo: descrição"
```

### Hooks Não Funcionando
```bash
# Reinstalar hooks
pnpm run prepare

# Verificar instalação
ls -la .husky/
```

### Testes Falhando
```bash
# Verificar banco
docker-compose up -d

# Executar migrações
cd server && pnpm migrate:test
```

### Build Falhando
```bash
# Limpar cache
rm -rf node_modules
pnpm install

# Verificar TypeScript
cd server && npx tsc --noEmit
cd web && npx tsc --noEmit
```

## 📋 Checklist de Setup

- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] Hooks configurados
- [ ] Ambiente configurado
- [ ] Testes passando
- [ ] Lint configurado
- [ ] Documentação lida

## 🎯 Dicas Importantes

1. **Sempre use `pnpm commit`** para commits
2. **Execute testes** antes de fazer push
3. **Verifique lint** antes de commitar
4. **Documente mudanças** importantes
5. **Use branches** para features
6. **Crie PRs** para revisão

## 📞 Suporte

- **Issues**: GitHub Issues
- **Documentação**: Pasta `docs/`
- **Configuração**: Arquivos de exemplo
- **CI/CD**: GitHub Actions 