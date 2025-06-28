# 🚀 Cheatsheet de Commits - Brev.ly

## ⚡ Comandos Rápidos

```bash
# Commit interativo (RECOMENDADO)
pnpm commit

# Commit manual
git commit -m "tipo: descrição"
```

## 📝 Tipos de Commit

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `feat` | Nova funcionalidade | `feat: add user login` |
| `fix` | Correção de bug | `fix: resolve auth error` |
| `docs` | Documentação | `docs: update README` |
| `style` | Formatação | `style: format code` |
| `refactor` | Refatoração | `refactor: simplify logic` |
| `perf` | Performance | `perf: optimize queries` |
| `test` | Testes | `test: add unit tests` |
| `build` | Build | `build: update deps` |
| `ci` | CI/CD | `ci: add workflow` |
| `chore` | Manutenção | `chore: update pkg` |

## ✅ Exemplos Práticos

### Funcionalidades
```bash
feat: add user authentication
feat(auth): add JWT validation
feat(api): implement user registration
```

### Correções
```bash
fix: resolve database timeout
fix(server): handle undefined input
fix(web): fix button click
```

### Documentação
```bash
docs: update API documentation
docs(readme): add installation guide
docs(api): document new endpoints
```

### Refatoração
```bash
refactor: simplify error handling
refactor(auth): extract validation logic
refactor(server): improve queries
```

### Testes
```bash
test: add auth unit tests
test(e2e): add login flow
test(api): test registration
```

### CI/CD
```bash
ci: add GitHub Actions
ci: update Docker build
ci: configure testing
```

### Manutenção
```bash
chore: update dependencies
chore: fix typo in README
chore: update scripts
```

## 🚨 Breaking Changes

```bash
feat!: remove old API

BREAKING CHANGE: Old endpoint removed
```

## 🔗 Issues

```bash
feat: add auth

Closes #123
Fixes #456
```

## ❌ O que NÃO fazer

```bash
# ❌ Sem tipo
add new feature

# ❌ Tipo inválido
new: add feature

# ❌ Com ponto final
feat: add feature.

# ❌ Maiúscula
Feat: add feature

# ❌ Muito longo
feat: add a very long description that exceeds the limit
```

## 📋 Checklist Rápido

- [ ] Tipo correto escolhido
- [ ] Descrição clara e concisa
- [ ] Sem ponto final
- [ ] Máximo 72 caracteres
- [ ] Escopo apropriado (se necessário)

## 🎯 Dica Principal

**Use sempre `pnpm commit`** - ele vai guiar você e garantir o formato correto automaticamente! 