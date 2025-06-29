# Correção do Erro 404 na Vercel

## 🚨 Problema

Erro 404 na página de redirecionamento quando clica no link:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: gru1::lj95v-1751204339015-0503230d0509
```

## 🔍 Causa

A Vercel não está configurada para lidar com rotas dinâmicas do React Router (`/:shortKey`). Por padrão, a Vercel tenta encontrar arquivos estáticos para cada rota, mas como é uma SPA (Single Page Application), todas as rotas devem ser direcionadas para `index.html`.

## ✅ Solução Aplicada

### 1. Arquivo `vercel.json`

Criado em `web/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. Arquivo `_redirects`

Criado em `web/public/_redirects`:

```
/*    /index.html   200
```

### 3. Configuração do Vite

Atualizado `web/vite.config.ts` para otimização de produção:

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
})
```

## 🚀 Como Aplicar a Correção

### 1. Fazer Deploy

```bash
# Na pasta web
cd web

# Build do projeto
pnpm build

# Deploy na Vercel
vercel --prod
```

### 2. Verificar Configuração

Na Vercel Dashboard:
1. Vá para o projeto
2. Settings → General
3. Verifique se "Framework Preset" está como "Vite"
4. Verifique se "Build Command" está como `pnpm build`
5. Verifique se "Output Directory" está como `dist`

### 3. Testar

Após o deploy:
1. Acesse a URL principal
2. Crie um link encurtado
3. Teste o redirecionamento

## 📋 Rotas Configuradas

```typescript
// web/src/routes/constants.ts
export const ROUTES = {
  HOME: { path: '/' },
  REDIRECT_LINK: { path: '/:shortKey' },  // ← Esta rota estava causando 404
  NOT_FOUND: { path: '*' }
}
```

## 🔧 Troubleshooting

### Se ainda der 404:

1. **Verificar Build:**
   ```bash
   cd web
   pnpm build
   ls -la dist/
   ```

2. **Verificar Vercel Logs:**
   - Dashboard da Vercel → Functions → Logs

3. **Testar Localmente:**
   ```bash
   cd web
   pnpm preview
   ```

4. **Verificar Cache:**
   - Vercel Dashboard → Settings → General → Clear Cache

### Comandos Úteis:

```bash
# Build local
cd web && pnpm build

# Preview local
cd web && pnpm preview

# Deploy na Vercel
vercel --prod

# Ver logs da Vercel
vercel logs
```

## 🎯 Resultado Esperado

Após a correção:
- ✅ Links encurtados funcionam corretamente
- ✅ Redirecionamento acontece sem 404
- ✅ SPA funciona em todas as rotas
- ✅ Performance otimizada

## 📚 Documentação Adicional

- [Vercel SPA Configuration](https://vercel.com/docs/projects/project-configuration#rewrites)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deployment)
- [Vite Build Configuration](https://vitejs.dev/config/) 