# DevOps e CI/CD - Brev.ly

## Visão Geral

Este documento descreve a configuração de DevOps e CI/CD para o projeto Brev.ly, incluindo pipelines de automação, análise de qualidade de código e estratégias de deploy.

## Arquitetura de CI/CD

### Workflows GitHub Actions

#### 1. CI/CD Pipeline Principal (`ci.yml`)
- **Trigger**: Push e Pull Requests para `master`, `main`, `develop`
- **Jobs**:
  - `test-server`: Testes unitários e E2E do servidor
  - `test-frontend`: Type check, lint e build do frontend
  - `security`: Auditoria de segurança
  - `deploy`: Build e deploy (apenas em master/main)

#### 2. Deploy (`deploy.yml`)
- **Trigger**: Após conclusão bem-sucedida do CI/CD Pipeline
- **Jobs**:
  - `deploy-staging`: Deploy para ambiente de staging
  - `deploy-production`: Deploy para produção (apenas master)

#### 3. Análise de Qualidade (`code-quality.yml`)
- **Trigger**: Push e Pull Requests
- **Funcionalidades**:
  - Verificação de TypeScript
  - Análise de código com Biome
  - Detecção de console.log, TODO, FIXME
  - Verificação de imports não utilizados
  - Relatório de cobertura

#### 4. Dependabot (`dependabot.yml`)
- **Trigger**: Pull Requests do Dependabot e schedule diário
- **Funcionalidades**:
  - Auditoria de segurança
  - Verificação de dependências desatualizadas
  - Auto-merge de PRs de segurança

#### 5. SonarCloud (`sonarcloud.yml`)
- **Trigger**: Push e Pull Requests
- **Funcionalidades**:
  - Análise estática de código
  - Métricas de qualidade
  - Detecção de vulnerabilidades

## Configuração de Ambientes

### Variáveis de Ambiente

#### Desenvolvimento
```bash
# .env
NODE_ENV=development
DATABASE_URL=postgres://user:pass@localhost:5432/brevly_dev
PORT=3000
```

#### Teste
```bash
# .env.test
NODE_ENV=test
DATABASE_URL=postgres://test_user:test_pass@localhost:5432/brevly_test
PORT=3001
```

#### Staging
```bash
# .env.staging
NODE_ENV=staging
DATABASE_URL=postgres://staging_user:staging_pass@staging-db:5432/brevly_staging
PORT=3000
```

#### Produção
```bash
# .env.production
NODE_ENV=production
DATABASE_URL=postgres://prod_user:prod_pass@prod-db:5432/brevly_prod
PORT=3000
```

## Estratégias de Deploy

### 1. Deploy em Staging
- **Trigger**: Qualquer push para `develop`
- **Ambiente**: Servidor de staging
- **Rollback**: Automático em caso de falha

### 2. Deploy em Produção
- **Trigger**: Push para `master` ou `main`
- **Ambiente**: Servidor de produção
- **Rollback**: Manual via GitHub Actions
- **Blue-Green**: Implementação futura

## Monitoramento e Observabilidade

### 1. Logs Estruturados
- **Ferramenta**: Pino
- **Formato**: JSON
- **Níveis**: error, warn, info, debug
- **Rotação**: Diária

### 2. Métricas
- **Health Checks**: `/health`
- **Métricas de Performance**: Response time, throughput
- **Métricas de Negócio**: Links criados, acessos

### 3. Alertas
- **Falhas de Deploy**: Notificação via Slack/Discord
- **Erros 5xx**: Alertas imediatos
- **Performance**: Alertas para latência > 2s

## Segurança

### 1. Auditoria de Dependências
- **Frequência**: Semanal
- **Ferramenta**: `pnpm audit`
- **Nível**: Moderate ou superior

### 2. Análise de Código
- **Ferramenta**: SonarCloud
- **Cobertura**: Mínima 80%
- **Qualidade**: A ou B

### 3. Secrets Management
- **GitHub Secrets**: Para tokens e credenciais
- **Rotação**: Mensal
- **Acesso**: Apenas maintainers

## Infraestrutura

### 1. Banco de Dados
- **Desenvolvimento**: PostgreSQL local
- **Teste**: PostgreSQL em container
- **Staging**: PostgreSQL gerenciado
- **Produção**: PostgreSQL gerenciado com backup

### 2. Servidores
- **Desenvolvimento**: Local
- **Staging**: VPS ou cloud
- **Produção**: Cloud com auto-scaling

### 3. CDN
- **Frontend**: Cloudflare ou similar
- **Cache**: 1 hora para assets estáticos

## Comandos Úteis

### Desenvolvimento Local
```bash
# Iniciar ambiente completo
docker-compose up -d
pnpm dev

# Executar testes
pnpm test:unit
pnpm test:e2e
pnpm test:full

# Verificar qualidade
pnpm lint
pnpm type-check
```

### Deploy Manual
```bash
# Staging
gh workflow run deploy.yml -f environment=staging

# Produção
gh workflow run deploy.yml -f environment=production
```

### Rollback
```bash
# Rollback para versão anterior
gh workflow run rollback.yml -f version=previous
```

## Troubleshooting

### Problemas Comuns

#### 1. Falha nos Testes
```bash
# Verificar logs
pnpm test:unit --reporter=verbose

# Verificar banco de teste
docker-compose exec postgres psql -U test_user -d brevly_test
```

#### 2. Falha no Deploy
```bash
# Verificar logs do workflow
gh run list --workflow=deploy.yml

# Verificar status do servidor
curl -f https://staging.brev.ly/health
```

#### 3. Problemas de Performance
```bash
# Verificar métricas
curl https://api.brev.ly/metrics

# Verificar logs
docker-compose logs -f server
```

## Próximos Passos

### Melhorias Planejadas

1. **Blue-Green Deploy**
   - Implementar deploy sem downtime
   - Rollback automático em caso de falha

2. **Auto-Scaling**
   - Configurar auto-scaling baseado em métricas
   - Implementar health checks avançados

3. **Observabilidade Avançada**
   - Integração com APM (Application Performance Monitoring)
   - Dashboards de métricas em tempo real

4. **Segurança Avançada**
   - Implementar SAST (Static Application Security Testing)
   - Configurar WAF (Web Application Firewall)

5. **Backup e Disaster Recovery**
   - Backup automático do banco de dados
   - Plano de disaster recovery

## Contatos

- **DevOps Lead**: [Seu Nome]
- **Infraestrutura**: [Contato da Infraestrutura]
- **Segurança**: [Contato de Segurança]

## Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Pino Documentation](https://getpino.io/) 