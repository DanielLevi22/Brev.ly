# Hooks do TanStack Query - Brev.ly

Este arquivo documenta todos os hooks disponíveis para interagir com a API do Brev.ly usando TanStack Query.

## Hooks Disponíveis

### 1. `useLinks()`
Lista todos os links cadastrados.

```typescript
const { data, isLoading, error } = useLinks();

if (isLoading) return <div>Carregando...</div>;
if (error) return <div>Erro ao carregar links</div>;

// data.links contém o array de links
```

### 2. `useCreateLink()`
Cria um novo link encurtado.

```typescript
const createLinkMutation = useCreateLink();

const handleCreate = async () => {
  try {
    await createLinkMutation.mutateAsync({
      originalUrl: 'https://www.google.com',
      shortUrl: 'google'
    });
  } catch (error) {
    console.error('Erro ao criar link:', error);
  }
};
```

### 3. `useIncrementAccess()`
Incrementa o contador de acessos de um link.

```typescript
const incrementAccessMutation = useIncrementAccess();

const handleAccess = async (shortUrl: string) => {
  try {
    await incrementAccessMutation.mutateAsync(shortUrl);
    // Redirecionar para a URL original
    window.open(originalUrl, '_blank');
  } catch (error) {
    console.error('Erro ao acessar link:', error);
  }
};
```

### 4. `useGetOriginalUrl(shortUrl, enabled)`
Obtém a URL original de um link encurtado.

```typescript
const { data, isLoading, error } = useGetOriginalUrl('google', true);

if (isLoading) return <div>Carregando...</div>;
if (error) return <div>Link não encontrado</div>;

// data.originalUrl contém a URL original
```

### 5. `useDeleteLink()`
Deleta um link específico.

```typescript
const deleteLinkMutation = useDeleteLink();

const handleDelete = async (shortUrl: string) => {
  if (confirm('Tem certeza que deseja deletar este link?')) {
    try {
      await deleteLinkMutation.mutateAsync(shortUrl);
    } catch (error) {
      console.error('Erro ao deletar link:', error);
    }
  }
};
```

## Query Keys

As query keys são organizadas da seguinte forma:

- `linkKeys.all` - Chave base para todas as queries de links
- `linkKeys.lists()` - Para listagem de links
- `linkKeys.originalUrl(shortUrl)` - Para obter URL original de um link específico

## Configurações

- **Stale Time**: 5 minutos para listagem, 30 minutos para URL original
- **GC Time**: 10 minutos para listagem, 1 hora para URL original
- **Retry**: 1 tentativa para queries e mutations
- **Refetch on Window Focus**: Desabilitado

## Tratamento de Erros

Todos os hooks incluem tratamento de erro básico que:
- Loga erros no console
- Invalida queries relacionadas quando necessário
- Permite tratamento customizado de erro nos componentes 