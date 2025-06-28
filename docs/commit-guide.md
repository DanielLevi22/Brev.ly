# Guia de Commits - Brev.ly

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Ferramentas Configuradas](#ferramentas-configuradas)
- [Como Fazer Commits](#como-fazer-commits)
- [Tipos de Commit](#tipos-de-commit)
- [Exemplos Práticos](#exemplos-práticos)
- [Regras e Validações](#regras-e-validações)
- [Workflow Completo](#workflow-completo)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## 🎯 Visão Geral

Este projeto usa **Conventional Commits** para garantir:
- ✅ Histórico de commits consistente
- ✅ Versionamento automático
- ✅ Geração automática de changelog
- ✅ Facilita colaboração em equipe
- ✅ CI/CD automatizado

## 🛠️ Ferramentas Configuradas

### 1. **Commitizen** (`pnpm commit`)
- Interface interativa para criar commits
- Garante formato correto automaticamente
- Pergunta tipo, escopo, descrição, etc.

### 2. **Commitlint**
- Valida commits automaticamente
- Rejeita commits que não seguem o padrão
- Executa via Git hooks

### 3. **Husky**
- Gerencia Git hooks
- Executa validações antes do commit
- Configurado automaticamente

## 🎯 Como Fazer Commits

### Método Recomendado: Commitizen
```bash
git add .
pnpm commit
```

### Método Manual
```bash
git commit -m "tipo(escopo?): descrição"
```

## 📝 Tipos de Commit

| Tipo | Descrição | Exemplo | Gera Release |
|------|-----------|---------|--------------|
| `feat` | Nova funcionalidade | `feat: add user auth` | ✅ Minor |
| `fix` | Correção de bug | `fix: resolve login issue` | ✅ Patch |
| `docs` | Documentação | `docs: update README` | ✅ Patch |
| `style` | Formatação | `style: format code` | ✅ Patch |
| `refactor` | Refatoração | `refactor: simplify logic` | ✅ Patch |
| `perf` | Performance | `perf: optimize queries` | ✅ Patch |
| `test` | Testes | `test: add unit tests` | ✅ Patch |
| `build` | Build | `build: update deps` | ✅ Patch |
| `ci` | CI/CD | `ci: add workflow` | ❌ Não |
| `chore` | Manutenção | `chore: update pkg` | ❌ Não |

## 💡 Exemplos Práticos

### ✅ Exemplos Válidos

```bash
feat: add user authentication
feat(auth): add JWT validation
fix: resolve database timeout
fix(server): handle undefined input
docs: update API docs
refactor: simplify error handling
test: add auth unit tests
ci: add GitHub Actions
chore: update dependencies
```

### ❌ Exemplos Inválidos

```bash
add new feature          # Sem tipo
new: add feature         # Tipo inválido
feat: add feature.       # Com ponto final
Feat: add feature        # Maiúscula
```

## 📋 Regras e Validações

### Formato Obrigatório
```
type(scope?): subject

body?

footer?
```

### Regras Específicas

| Regra | Descrição | Exemplo |
|-------|-----------|---------|
| **Type** | Deve ser um dos tipos listados | `feat`, `fix`, `docs` |
| **Scope** | Opcional, em parênteses | `(auth)`, `(api)`, `(web)` |
| **Subject** | Descrição curta, sem ponto final | `add user authentication` |
| **Body** | Opcional, descrição detalhada | `Implements JWT-based auth` |
| **Footer** | Opcional, breaking changes/issues | `Closes #123` |

### Validações Automáticas

- ✅ Tipo deve ser válido
- ✅ Subject não pode estar vazio
- ✅ Subject não pode terminar com ponto
- ✅ Header máximo 72 caracteres
- ✅ Body e footer devem ter linha em branco antes

## 🔄 Workflow Completo

### 1. Desenvolvimento
```bash
# Fazer alterações no código
# ...

# Adicionar arquivos
git add .

# Fazer commit (será validado automaticamente)
pnpm commit
```

### 2. Push e Pull Request
```bash
# Push para branch
git push origin feature-branch

# Criar Pull Request
# O CI vai executar testes automaticamente
```

### 3. Merge e Release
```bash
# Merge para master
# O semantic-release vai:
# - Analisar commits
# - Determinar nova versão
# - Criar tag
# - Gerar changelog
# - Criar release
```

## �� Breaking Changes

```bash
feat!: remove old API

BREAKING CHANGE: Old endpoint removed
```

## 🔗 Issues e Referências

Para referenciar issues:

```bash
feat: add auth

Closes #123
Fixes #456
Relates to #789
```

## 🛠️ Troubleshooting

### Commit Rejeitado
```bash
# Erro: Invalid commit message
git commit -m "invalid message"

# Solução: Usar Commitizen
pnpm commit
```

### Hook Não Executando
```bash
# Verificar se Husky está instalado
ls -la .husky/

# Reinstalar hooks
pnpm run prepare
```

### Commitlint Falhando
```bash
# Verificar configuração
cat commitlint.config.js

# Testar commit manualmente
npx commitlint --from HEAD~1 --to HEAD --verbose
```

## ❓ FAQ

### Q: Posso usar commits sem tipo?
**A:** Não. Todos os commits devem ter um tipo válido.

### Q: O que acontece se eu fizer commit sem seguir o padrão?
**A:** O commit será rejeitado automaticamente.

### Q: Como faço para reverter um commit?
**A:** Use `git revert` ou commit com tipo `revert`.

### Q: Posso usar commits em português?
**A:** Sim, mas mantenha o tipo em inglês: `feat: adiciona autenticação`

### Q: Como faço commit de múltiplos arquivos com tipos diferentes?
**A:** Faça commits separados para cada tipo de mudança.

### Q: O que significa "breaking change"?
**A:** Mudança que quebra compatibilidade com versões anteriores.

## 📚 Recursos Adicionais

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://commitlint.js.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)

## 🎯 Checklist de Commit

Antes de fazer commit, verifique:

- [ ] Tipo de commit correto
- [ ] Descrição clara e concisa
- [ ] Sem ponto final na descrição
- [ ] Máximo 72 caracteres no header
- [ ] Escopo apropriado (se necessário)
- [ ] Breaking changes documentadas (se houver)
- [ ] Issues referenciadas (se aplicável)

---

**💡 Dica:** Use sempre `pnpm commit` para garantir que seu commit siga o padrão correto! 