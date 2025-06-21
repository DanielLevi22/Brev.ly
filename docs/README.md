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