# CI/CD Pipeline - Brev.ly

## Visão Geral

Este documento descreve o pipeline de CI/CD simplificado do projeto Brev.ly, focado em testes, versionamento automático e deploy de Docker.

## Workflows

### 1. Test Server (`test.yml`)

**Trigger**: Push e Pull Requests para `master`, `main`, `develop`

**Funcionalidades**:
- Executa testes unitários
- Executa testes E2E
- Executa suite completa de testes
- Usa PostgreSQL em container para testes

**Steps**:
1. Setup do ambiente (Node.js, pnpm)
2. Instalação de dependências
3. Migração do banco de teste
4. Execução de testes unitários
5. Execução de testes E2E
6. Execução da suite completa

### 2. Build and Push Docker Image (`docker-build.yml`)

**Trigger**: 
- Push para `master` ou `main`
- Tags com padrão `v*` (ex: v1.0.0)
- Manual via workflow_dispatch

**Funcionalidades**:
- Build da imagem Docker
- Push para Docker Hub
- Versionamento automático
- Criação de releases no GitHub

**Steps**:
1. Setup do Docker Buildx
2. Login no Docker Hub
3. Extração de metadados
4. Build e push da imagem
5. Geração de changelog
6. Criação de release (apenas para tags)

### 3. Version and Release (`version.yml`)

**Trigger**: Push para `master` ou `main`

**Funcionalidades**:
- Versionamento automático baseado em conventional commits
- Geração de changelog
- Criação de tags
- Publicação no npm (opcional)

## Versionamento

### Conventional Commits

O projeto usa [Conventional Commits](https://www.conventionalcommits.org/) para versionamento automático:

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
- `NPM_TOKEN` - Token do npm (opcional)

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

1. Vá para Actions > Build and Push Docker Image
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
- Verifique o status dos últimos workflows
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

# Ver imagens disponíveis
docker images brevly/server
```

## Próximos Passos

### Melhorias Planejadas

1. **Cache de Dependências**
   - Implementar cache do pnpm
   - Cache do Docker layers

2. **Testes de Performance**
   - Adicionar testes de performance
   - Benchmarks automáticos

3. **Deploy Automático**
   - Deploy automático em staging
   - Deploy automático em produção

4. **Notificações**
   - Integração com Slack/Discord
   - Notificações de falha

## Contatos

- **DevOps Lead**: Daniel Levi
- **GitHub**: https://github.com/DanielLevi22
- **Docker Hub**: https://hub.docker.com/r/brevly/server

## Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Docker Documentation](https://docs.docker.com/) 