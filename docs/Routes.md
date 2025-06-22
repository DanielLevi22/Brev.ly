# Sistema de Rotas

Este diretório contém a configuração de rotas da aplicação Brev.ly usando React Router v6.

## Estrutura

```
routes/
├── index.tsx          # Configuração principal das rotas
├── constants.ts       # Constantes das rotas
├── types.ts          # Tipos TypeScript
└── README.md         # Esta documentação
```

## Como Adicionar Novas Rotas

### 1. Adicione a rota nas constantes (`constants.ts`)

```typescript
export const ROUTES: Record<string, AppRoute> = {
  HOME: {
    path: '/',
    name: 'Home',
    description: 'Página inicial do Brev.ly'
  },
  NOVA_ROTA: {
    path: '/nova-rota',
    name: 'Nova Rota',
    description: 'Descrição da nova rota'
  },
} as const;
```

### 2. Crie o componente da página

Crie um novo arquivo em `src/pages/`:

```typescript
// src/pages/nova-rota.tsx
export function NovaRotaPage() {
  return (
    <div>
      <h1>Nova Rota</h1>
    </div>
  );
}
```

### 3. Adicione a rota no router (`index.tsx`)

```typescript
import { NovaRotaPage } from '@/pages/nova-rota';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.NOVA_ROTA.path,
        element: <NovaRotaPage />,
      },
    ],
  },
]);
```

## Boas Práticas

1. **Sempre use as constantes**: Use `ROUTES.ROTA_NAME.path` em vez de strings hardcoded
2. **Organize por funcionalidade**: Agrupe rotas relacionadas
3. **Use layouts aninhados**: Aproveite o `AppLayout` para elementos comuns
4. **Documente rotas complexas**: Adicione descrições nas constantes
5. **Mantenha tipos atualizados**: Atualize `types.ts` quando necessário

## Layouts

- **AppLayout**: Layout base com header e wrapper
- **Outlet**: Renderiza o conteúdo das rotas filhas

## Navegação

Para navegar programaticamente, use o hook `useNavigate`:

```typescript
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '@/routes/constants';

const navigate = useNavigate();
navigate(getRoutePath('HOME'));
``` 