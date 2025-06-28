# Configuração de Ambiente - Brev.ly

## 📋 Visão Geral

Este documento explica como configurar as variáveis de ambiente para o projeto Brev.ly, permitindo flexibilidade entre diferentes ambientes (desenvolvimento, staging, produção).

## 🔧 Variáveis de Ambiente

### **Variáveis Disponíveis**

| Variável | Descrição | Padrão | Exemplo |
|----------|-----------|--------|---------|
| `VITE_FRONTEND_URL` | URL base do frontend | `http://localhost:5173` | `https://app.brev.ly` |
| `VITE_REDIRECT_URL` | URL para redirecionamento | `http://localhost:5173` | `https://brev.ly` |
| `VITE_PUBLIC_URL` | Domínio público para exibição | `brev.ly` | `meudominio.com` |
| `VITE_API_URL` | URL da API backend | `http://localhost:3333` | `https://api.brev.ly` |

### **Configurações por Ambiente**

#### **Desenvolvimento Local**
```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_REDIRECT_URL=http://localhost:5173
VITE_PUBLIC_URL=brev.ly
VITE_API_URL=http://localhost:3333
```

#### **Staging**
```env
VITE_FRONTEND_URL=https://staging.brev.ly
VITE_REDIRECT_URL=https://staging.brev.ly
VITE_PUBLIC_URL=staging.brev.ly
VITE_API_URL=https://staging-api.brev.ly
```

#### **Produção**
```env
VITE_FRONTEND_URL=https://app.brev.ly
VITE_REDIRECT_URL=https://brev.ly
VITE_PUBLIC_URL=brev.ly
VITE_API_URL=https://api.brev.ly
```

## 🚀 Como Usar

### **1. Criar arquivo .env**

Copie o arquivo `env.example` para `.env`:

```bash
cp env.example .env
```

### **2. Configurar variáveis**

Edite o arquivo `.env` com suas configurações:

```env
# Desenvolvimento
VITE_FRONTEND_URL=http://localhost:5173
VITE_REDIRECT_URL=http://localhost:5173
VITE_PUBLIC_URL=brev.ly
VITE_API_URL=http://localhost:3333
```

### **3. Usar no código**

```typescript
import { config, getShortUrl, getRedirectUrl } from '@/config/environment';

// Usar configuração
console.log(config.FRONTEND_URL); // http://localhost:5173

// Gerar URLs
const shortUrl = getShortUrl('meu-link'); // brev.ly/meu-link
const redirectUrl = getRedirectUrl('meu-link'); // http://localhost:5173/meu-link
```

## 📁 Estrutura de Arquivos

```
web/
├── src/
│   ├── config/
│   │   └── environment.ts    # Configuração centralizada
│   ├── components/
│   │   └── links/
│   │       └── list-item.tsx # Usa getShortUrl()
│   └── services/
│       └── api.ts           # Usa config.API_URL
├── env.example              # Exemplo de variáveis
└── .env                     # Suas variáveis (não versionado)
```

## 🔄 Casos de Uso

### **1. Links Curtos**
```typescript
// Antes (hardcoded)
const shortUrl = `brev.ly/${link.shortUrl}`;

// Depois (configurável)
const shortUrl = getShortUrl(link.shortUrl);
```

### **2. Redirecionamentos**
```typescript
// Antes (hardcoded)
window.open(`/${link.shortUrl}`);

// Depois (configurável)
window.open(getRedirectUrl(link.shortUrl));
```

### **3. API Calls**
```typescript
// Antes (hardcoded)
const response = await fetch('http://localhost:3333/links');

// Depois (configurável)
const response = await fetch(`${config.API_URL}/links`);
```

## 🌐 Cenários de Deploy

### **Cenário 1: Domínio Único**
```
Frontend: https://brev.ly
API: https://brev.ly/api
Redirecionamento: https://brev.ly
```

```env
VITE_FRONTEND_URL=https://brev.ly
VITE_REDIRECT_URL=https://brev.ly
VITE_PUBLIC_URL=brev.ly
VITE_API_URL=https://brev.ly/api
```

### **Cenário 2: Domínios Separados**
```
Frontend: https://app.brev.ly
API: https://api.brev.ly
Redirecionamento: https://brev.ly
```

```env
VITE_FRONTEND_URL=https://app.brev.ly
VITE_REDIRECT_URL=https://brev.ly
VITE_PUBLIC_URL=brev.ly
VITE_API_URL=https://api.brev.ly
```

### **Cenário 3: Subdomínio**
```
Frontend: https://brev.ly
API: https://brev.ly/api
Redirecionamento: https://brev.ly
```

```env
VITE_FRONTEND_URL=https://brev.ly
VITE_REDIRECT_URL=https://brev.ly
VITE_PUBLIC_URL=brev.ly
VITE_API_URL=https://brev.ly/api
```

## 🔒 Segurança

### **Boas Práticas**

1. **Nunca commite o arquivo `.env`**
   ```bash
   # .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Use variáveis diferentes por ambiente**
   ```bash
   .env.development
   .env.staging
   .env.production
   ```

3. **Valide configurações obrigatórias**
   ```typescript
   if (!config.API_URL) {
     throw new Error('VITE_API_URL é obrigatória');
   }
   ```

## 🧪 Testes

### **Testar Configurações**

```typescript
import { config, getShortUrl } from '@/config/environment';

describe('Environment Configuration', () => {
  it('should generate correct short URL', () => {
    const result = getShortUrl('test-link');
    expect(result).toBe('brev.ly/test-link');
  });

  it('should use correct API URL', () => {
    expect(config.API_URL).toBe('http://localhost:3333');
  });
});
```

## 📝 Checklist de Deploy

- [ ] Criar arquivo `.env` baseado no `env.example`
- [ ] Configurar `VITE_FRONTEND_URL` para o domínio correto
- [ ] Configurar `VITE_REDIRECT_URL` para o domínio de redirecionamento
- [ ] Configurar `VITE_PUBLIC_URL` para o domínio público
- [ ] Configurar `VITE_API_URL` para a API
- [ ] Testar links curtos em desenvolvimento
- [ ] Testar redirecionamentos
- [ ] Verificar se a API está acessível
- [ ] Validar SEO com as novas URLs

## 🆘 Troubleshooting

### **Problema: Links não funcionam**
**Solução:** Verificar se `VITE_REDIRECT_URL` está correto

### **Problema: API não responde**
**Solução:** Verificar se `VITE_API_URL` está acessível

### **Problema: SEO com URLs erradas**
**Solução:** Verificar se `VITE_PUBLIC_URL` está configurado

### **Problema: CORS errors**
**Solução:** Verificar se `VITE_API_URL` está no mesmo domínio ou configurar CORS no backend

---

Esta configuração permite máxima flexibilidade para diferentes ambientes e cenários de deploy! 🚀 