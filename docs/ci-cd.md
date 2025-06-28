# CI/CD Pipeline - Brev.ly

## Visão Geral

Este documento descreve o pipeline de CI/CD unificado do projeto Brev.ly, que garante que releases só aconteçam após todos os processos serem bem-sucedidos.

## Workflow Principal

### CI Pipeline (`ci.yml`)

**Trigger**: Push e Pull Requests para `master`, `main`, `develop`

**Estrutura**:
1. **Test** - Executa testes
2. **Build** - Build e push da imagem Docker (apenas em master/main)
3. **Release** - Criação de release (apenas em master/main)

### Jobs

#### 1. Test Job
- ✅ Executa migrações do banco de teste
- ✅ Roda testes do servidor
- ✅ Roda testes do frontend (opcional)
- ✅ Usa PostgreSQL em container para testes isolados

#### 2. Build Job
- ✅ Depende do sucesso dos testes (`needs: test`)
- ✅ Executa apenas em `master`, `main` ou tags
- ✅ Build da imagem Docker
- ✅ Push para Docker Hub
- ✅ Versionamento automático

#### 3. Release Job
- ✅ Depende do sucesso dos testes E build (`needs: [test, build]`)
- ✅ Executa apenas em `master` ou `main`
- ✅ Ignora commits de CI e chore
- ✅ Versionamento automático baseado em conventional commits
- ✅ Criação de releases no GitHub

## Fluxo de Execução

```mermaid
graph TD
    A[Push/PR] --> B[Test Job]
    B --> C{Tests Pass?}
    C -->|Yes| D[Build Job]
    C -->|No| E[Pipeline Failed]
    D --> F{Build Pass?}
    F -->|Yes| G[Release Job]
    F -->|No| E
    G --> H{Release Created?}
    H -->|Yes| I[Success]
    H -->|No| E
```

## Versionamento

### Conventional Commits

O projeto usa [Conventional Commits](https://www.conventionalcommits.org/) para versionamento automático interno:

- `feat:` - Nova funcionalidade (minor version)
- `fix:` - Correção de bug (patch version)
- `docs:` - Documentação (patch version)
- `style:` - Formatação (patch version)
- `refactor:` - Refatoração (patch version)
- `perf:` - Melhoria de performance (patch version)
- `test:` - Testes (patch version)
- `build:` - Build (patch version)
- `ci:` - CI/CD (sem release)
- `chore:` - Manutenção (sem release)

### Exemplos de Commits

```bash
# Nova funcionalidade
git commit -m "feat: add user authentication"

# Correção de bug
git commit -m "fix: resolve database connection issue"

# Documentação
git commit -m "docs: update API documentation"

# CI/CD
git commit -m "ci: update test workflow"
```

## Docker Images

### Tags Automáticas

O workflow de Docker cria automaticamente as seguintes tags:

- `latest` - Última versão da branch principal
- `v1.0.0` - Versão específica
- `1.0` - Major.Minor
- `1` - Major

### Exemplo de Uso

```bash
# Pull da última versão
docker pull brevly/server:latest

# Pull de versão específica
docker pull brevly/server:v1.0.0

# Run do container
docker run -p 3000:3000 brevly/server:latest
```

## Configuração

### Secrets Necessários

Configure os seguintes secrets no GitHub:

- `DOCKER_USERNAME` - Usuário do Docker Hub
- `DOCKER_PASSWORD` - Senha/token do Docker Hub
- `GITHUB_TOKEN` - Token do GitHub (automático)

### Variáveis de Ambiente

O workflow usa as seguintes variáveis de ambiente:

```yaml
DATABASE_URL: postgres://test_user:test_pass@localhost:5432/brevly_test
NODE_VERSION: '20'
PNPM_VERSION: '8'
```

## Deploy Manual

### Build Manual

Para fazer build manual de uma versão específica:

1. Vá para Actions > CI Pipeline
2. Clique em "Run workflow"
3. Digite a versão desejada
4. Clique em "Run workflow"

### Release Manual

Para criar uma release manual:

```bash
# Criar tag
git tag v1.0.0

# Push da tag
git push origin v1.0.0
```

## Monitoramento

### Status dos Workflows

- Acesse: https://github.com/DanielLevi22/Brev.ly/actions
- Verifique o status do pipeline unificado
- Analise logs em caso de falha

### Notificações

Configure notificações no GitHub:
1. Settings > Notifications
2. Configure notificações para Actions

## Troubleshooting

### Problemas Comuns

#### 1. Falha nos Testes
```bash
# Verificar logs localmente
cd server
pnpm test:unit --reporter=verbose
```

#### 2. Falha no Build Docker
- Verificar se o Dockerfile está correto
- Verificar se as dependências estão instaladas
- Verificar logs do workflow

#### 3. Falha no Push Docker
- Verificar se as credenciais do Docker Hub estão corretas
- Verificar se a imagem já existe
- Verificar permissões do repositório

### Logs Úteis

```bash
# Ver logs do container
docker logs brevly-server

# Ver status do container
docker ps -a

# Ver logs do workflow
# Acesse: Actions > CI Pipeline > [Job] > [Step]
```

## Notas Importantes

### Garantias do Pipeline

- ✅ **Testes obrigatórios**: Release só acontece se todos os testes passarem
- ✅ **Build obrigatório**: Release só acontece se o build for bem-sucedido
- ✅ **Versionamento interno**: Controle de versões sem publicação no npm
- ✅ **Releases no GitHub**: Changelog e releases organizados
- ✅ **Tags no Docker**: Imagens versionadas no Docker Hub

### Workflow de Testes

- Testes do frontend são opcionais por enquanto
- Foco principal nos testes do servidor
- Banco de dados PostgreSQL em container para testes isolados

### Segurança

- Usuário não-root no container Docker
- Secrets seguros no GitHub
- Health checks automáticos

## Contatos

- **DevOps Lead**: Daniel Levi
- **GitHub**: https://github.com/DanielLevi22
- **Docker Hub**: https://hub.docker.com/r/brevly/server

## Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Docker Documentation](https://docs.docker.com/) 