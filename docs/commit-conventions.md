# Convenções de Commit - Brev.ly

## Visão Geral

Este projeto usa ferramentas automatizadas para garantir que todos os commits sigam o padrão [Conventional Commits](https://www.conventionalcommits.org/). Isso garante:

- Histórico de commits consistente
- Versionamento automático
- Geração automática de changelog
- Facilita a colaboração em equipe

## Ferramentas Utilizadas

### 1. **Commitizen**
- Interface interativa para criar commits
- Garante formato correto automaticamente
- Disponível via `pnpm commit`

### 2. **Commitlint**
- Valida commits automaticamente
- Rejeita commits que não seguem o padrão
- Executa via Git hooks

### 3. **Husky**
- Gerencia Git hooks
- Executa validações antes do commit
- Configurado automaticamente

### 4. **Lint-staged**
- Executa lint apenas em arquivos modificados
- Formata código automaticamente
- Executa antes do commit

## Como Fazer Commits

### Método 1: Commitizen (Recomendado)

```bash
# Adicionar arquivos
git add .

# Fazer commit interativo
pnpm commit
```

O Commitizen vai guiar você através de perguntas:
1. **Type**: Tipo do commit (feat, fix, docs, etc.)
2. **Scope**: Escopo da mudança (opcional)
3. **Subject**: Descrição curta
4. **Body**: Descrição detalhada (opcional)
5. **Breaking Changes**: Mudanças que quebram compatibilidade (opcional)
6. **Issues**: Issues relacionadas (opcional)

### Método 2: Commit Manual

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve database connection issue"
git commit -m "docs: update API documentation"
```

## Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: add user registration` |
| `fix` | Correção de bug | `fix: resolve login validation` |
| `docs` | Documentação | `docs: update README` |
| `style` | Formatação | `style: format code with prettier` |
| `refactor` | Refatoração | `refactor: simplify authentication logic` |
| `perf` | Performance | `perf: optimize database queries` |
| `test` | Testes | `test: add unit tests for auth` |
| `build` | Build | `build: update dependencies` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |
| `chore` | Manutenção | `chore: update package.json` |
| `revert` | Reverter | `revert: remove broken feature` |

## Regras de Validação

### Formato Obrigatório
```
type(scope?): subject

body?

footer?
```

### Regras
- **Type**: Deve ser um dos tipos listados acima
- **Scope**: Opcional, em parênteses
- **Subject**: Descrição curta, sem ponto final
- **Body**: Opcional, descrição detalhada
- **Footer**: Opcional, para breaking changes ou issues

### Exemplos Válidos
```bash
feat: add user authentication
feat(auth): add JWT token validation
fix: resolve database connection timeout
docs: update API documentation
style: format code with prettier
refactor: simplify error handling
perf: optimize database queries
test: add unit tests for user service
build: update dependencies
ci: add GitHub Actions workflow
chore: update package.json
```

### Exemplos Inválidos
```bash
# ❌ Sem tipo
add new feature

# ❌ Tipo inválido
new: add feature

# ❌ Com ponto final
feat: add new feature.

# ❌ Muito longo
feat: add a very long description that exceeds the maximum length allowed

# ❌ Maiúscula
Feat: add new feature
```

## Breaking Changes

Para mudanças que quebram compatibilidade:

```bash
feat!: remove deprecated API endpoint

BREAKING CHANGE: The /api/v1/users endpoint has been removed.
Use /api/v2/users instead.
```

## Issues e Referências

Para referenciar issues:

```bash
feat: add user authentication

Closes #123
Fixes #456
```

## Workflow Completo

### 1. Desenvolvimento
```bash
# Fazer alterações
# ...

# Adicionar arquivos
git add .

# Fazer commit (será validado automaticamente)
pnpm commit
```

### 2. Push
```bash
# Push para branch
git push origin feature-branch

# Criar Pull Request
# O CI vai executar testes automaticamente
```

### 3. Merge
```bash
# Merge para master
# O semantic-release vai:
# - Analisar commits
# - Determinar nova versão
# - Criar tag
# - Gerar changelog
# - Criar release
```

## Troubleshooting

### Commit Rejeitado
Se o commit for rejeitado:

```bash
# Verificar o erro
git commit -m "invalid message"

# Usar Commitizen para formato correto
pnpm commit
```

### Hook Não Executando
Se os hooks não estiverem funcionando:

```bash
# Reinstalar hooks
pnpm run prepare

# Verificar se Husky está instalado
ls -la .husky/
```

### Lint-staged Falhando
Se o lint-staged falhar:

```bash
# Executar lint manualmente
pnpm lint

# Executar format manualmente
pnpm format

# Tentar commit novamente
pnpm commit
```

## Configuração IDE

### VS Code
Adicione ao `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Extensões Recomendadas
- Prettier - Code formatter
- ESLint
- GitLens
- Conventional Commits

## Próximos Passos

### Melhorias Planejadas

1. **Commit Templates**
   - Templates personalizados para diferentes tipos
   - Integração com issues do GitHub

2. **Validação Avançada**
   - Validação de escopo
   - Validação de tamanho de commit
   - Validação de linguagem

3. **Automação**
   - Auto-assign de issues
   - Auto-label de PRs
   - Notificações automáticas

## Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://commitlint.js.org/)
- [Husky](https://typicode.github.io/husky/)
- [Lint-staged](https://github.com/okonet/lint-staged) 