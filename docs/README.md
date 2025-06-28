# Documentação do Projeto Brev.ly

Este diretório contém a documentação completa do projeto Brev.ly, incluindo arquitetura, implementações e guias de uso.

## 📚 Documentação Disponível

### [Endpoint de Relatório CSV](./csv-report-endpoint.md)
Documentação completa sobre o endpoint `/links/report` que permite gerar e baixar relatórios CSV dos links cadastrados.

**Tópicos cobertos:**
- Arquitetura Clean Architecture
- Implementação backend e frontend
- Resolução de problemas de CORS
- Testes E2E e unitários
- Estrutura do arquivo CSV gerado

### [Segurança e Logging](./security-and-logging.md)
Documentação sobre as melhorias de segurança e sistema de logging implementadas.

**Tópicos cobertos:**
- Sanitização dupla de inputs (XSS + HTML)
- Validação rigorosa com Zod
- Logging estruturado com Pino
- Headers de segurança
- Rate limiting e CORS
- Monitoramento e observabilidade

### [Melhores Práticas de Ambiente](./environment-best-practices.md)
Documentação sobre a configuração de ambientes e melhores práticas implementadas.

**Tópicos cobertos:**
- Separação de ambientes (dev, test, prod)
- Configuração de bancos de dados isolados
- Scripts de migração por ambiente
- Limpeza automática do banco de teste
- Configuração Docker por ambiente
- Segurança e monitoramento por ambiente

### [Classes de Erro Personalizadas](./README.md#classes-de-erro-personalizadas)
Documentação sobre as classes de erro customizadas do domínio.

### [Hooks do Frontend](./hooks.md)
Documentação sobre os hooks React Query utilizados no frontend.

### [Rotas da API](./Routes.md)
Documentação sobre todos os endpoints da API.

### [Documentação Geral do Projeto](./url_shortener_project_documentation.markdown)
Documentação completa do projeto incluindo setup, arquitetura e funcionalidades.

---

# Classes de Erro Personalizadas

Este arquivo contém as classes de erro personalizadas para o domínio de links.

## Classes Disponíveis

### `InvalidUrlError`
- **Uso**: Quando a URL original fornecida é inválida
- **Status HTTP**: 400 Bad Request
- **Mensagem padrão**: "URL inválida"

### `InvalidShortUrlError`
- **Uso**: Quando o shortUrl fornecido não está no formato correto
- **Status HTTP**: 400 Bad Request
- **Mensagem padrão**: "URL encurtada mal formatada"

### `ShortUrlAlreadyExistsError`
- **Uso**: Quando o shortUrl já existe no sistema
- **Status HTTP**: 409 Conflict
- **Mensagem padrão**: "URL encurtada já existe"

### `CreateLinkError`
- **Uso**: Quando ocorre um erro interno ao criar o link
- **Status HTTP**: 500 Internal Server Error
- **Mensagem padrão**: "Erro ao criar link"

## Exemplo de Uso

```typescript
import { InvalidUrlError, ShortUrlAlreadyExistsError } from '@/shared/errors'

// No caso de uso
if (!isValidUrl(originalUrl)) {
  return makeLeft(new InvalidUrlError())
}

if (await linkExists(shortUrl)) {
  return makeLeft(new ShortUrlAlreadyExistsError())
}

// No controller
if (error instanceof InvalidUrlError) {
  return reply.status(400).send({ 
    error: error.message, 
    type: error.name 
  })
}
```

## Benefícios

1. **Tipagem forte**: Cada erro tem seu próprio tipo
2. **Códigos HTTP apropriados**: Cada erro mapeia para um status HTTP específico
3. **Mensagens consistentes**: Mensagens padronizadas em português
4. **Facilita testes**: Permite testar tipos específicos de erro
5. **Melhor debugging**: Nome da classe ajuda na identificação do problema 