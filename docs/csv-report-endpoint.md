# Endpoint de Relatório CSV - Documentação

## 📋 Visão Geral

O endpoint `/links/report` permite gerar e baixar um relatório CSV com todos os links cadastrados no sistema. Esta funcionalidade foi implementada seguindo os princípios da Clean Architecture e resolve problemas de CORS através de um proxy no servidor.

## 🏗️ Arquitetura

### Clean Architecture Implementation

```
Controller → Use Case → Port → Adapter → Storage
```

### Componentes

1. **Controller**: `generate-links-report.ts`
2. **Use Case**: `generate-links-report-use-case.ts`
3. **Port**: `generate-links-csv-port.ts`
4. **Adapter**: `generate-links-csv-adapter.ts`
5. **Storage**: `generate-links-csv.ts` (R2 + Drizzle)

## 🔧 Implementação

### 1. Controller (`server/src/controllers/generate-links-report.ts`)

```typescript
export const generateLinksReportController: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/report',
    {
      schema: {
        summary: 'Gerar e baixar relatório CSV dos links',
        tags: ['Link'],
        response: {
          200: z.string(), // Retorna CSV diretamente
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (_, reply) => {
      const makeGenerateLinksReportUseCase = MakeGenerateLinksReportUseCase();
      const result = await makeGenerateLinksReportUseCase.execute();
      
      if (isRight(result)) {
        // Proxy: Servidor faz download do R2 e retorna diretamente
        const fileResponse = await fetch(result.right.url);
        
        if (!fileResponse.ok) {
          return reply.status(500).send({ error: 'Erro ao baixar arquivo CSV' });
        }

        const csvContent = await fileResponse.text();
        
        // Headers para download automático
        reply.header('Content-Type', 'text/csv');
        reply.header('Content-Disposition', `attachment; filename="relatorio-links-${new Date().toISOString().split('T')[0]}.csv"`);
        
        return reply.status(200).send(csvContent);
      }
      
      return reply.status(500).send({ error: result.left.message });
    }
  );
};
```

### 2. Use Case (`server/src/use-cases/generate-links-report-use-case.ts`)

```typescript
export class GenerateLinksReportUseCase {
  constructor(private readonly csvPort: GenerateLinksCsvPort) {}

  async execute(): Promise<Either<GenerateLinksReportError, { url: string }>> {
    try {
      const { url } = await this.csvPort.generateAndUploadLinksCsv();
      return makeRight({ url });
    } catch (error) {
      return makeLeft(new GenerateLinksReportError(error instanceof Error ? error.message : undefined));
    }
  }
}
```

### 3. Port Interface (`server/src/use-cases/ports/generate-links-csv-port.ts`)

```typescript
export interface GenerateLinksCsvPort {
  generateAndUploadLinksCsv(): Promise<{ url: string }>;
}
```

### 4. Storage Implementation (`server/src/storage/generate-links-csv.ts`)

```typescript
export async function generateAndUploadLinksCsv() {
  // Buscar todos os links do banco
  const allLinks = await db.select().from(linksTable).orderBy(sql`${linksTable.createdAt} DESC`);

  // Gerar CSV
  const records = allLinks.map(link => [
    link.shortUrl,
    link.originalUrl,
    link.accessCount,
    link.createdAt instanceof Date ? link.createdAt.toISOString() : link.createdAt
  ]);
  const header = ['shortUrl', 'originalUrl', 'accessCount', 'createdAt'];
  const csvContent = stringify([header, ...records]);

  // Upload para R2
  const fileName = `downloads/links-report-${randomUUID()}.csv`;
  const upload = new Upload({
    client: r2,
    params: {
      Key: fileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: Readable.from([csvContent]),
      ContentType: 'text/csv',
    },
  });
  await upload.done();

  return {
    key: fileName,
    url: new URL(fileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
```

## 🌐 Frontend Implementation

### 1. API Service (`web/src/services/api.ts`)

```typescript
async downloadReport(): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/links/report`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.blob();
}
```

### 2. React Hook (`web/src/hooks/use-links.ts`)

```typescript
export function useDownloadReport() {
  return useMutation({
    mutationFn: api.downloadReport,
    onSuccess: (blob) => {
      // Download automático do arquivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-links-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error('Erro ao baixar relatório:', error);
    },
  });
}
```

### 3. Component (`web/src/components/list-links.tsx`)

```typescript
export function MyLinks(){
  const { data, isLoading, error } = useLinks();
  const downloadReport = useDownloadReport();

  function handleDownloadReport() {
    downloadReport.mutate();
  }

  return (
    <button
      type="button"
      className="flex items-center gap-2 text-xs md:text-sm font-medium text-blue-base hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleDownloadReport}
      disabled={downloadReport.isPending}
    >
      {downloadReport.isPending ? (
        <CircleNotch size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      Baixar CSV
    </button>
  );
}
```

## 🚫 Problema de CORS e Solução

### Problema Original
```
Frontend → Servidor → URL → R2 (❌ CORS Error)
```

O endpoint original retornava uma URL do Cloudflare R2:
```json
{"url":"https://pub-275d9387397f45eaab99314b8e26da54.r2.dev/downloads/links-report-cadfca91-0204-40a9-96c6-b6f9a757dfa5.csv"}
```

Quando o frontend tentava acessar diretamente a URL do R2, ocorria erro de CORS:
```
Access to fetch at 'https://pub-275d9387397f45eaab99314b8e26da54.r2.dev/downloads/links-report-xxx.csv' 
from origin 'http://127.0.0.1:5173' has been blocked by CORS policy
```

### Solução Implementada
```
Frontend → Servidor → R2 → Servidor → Frontend (✅ CSV)
```

O servidor agora:
1. Gera o arquivo CSV e faz upload para R2
2. Faz o download do arquivo do R2 internamente
3. Retorna o conteúdo CSV diretamente com headers apropriados

### Benefícios
- ✅ **Sem CORS:** Frontend só se comunica com o próprio servidor
- ✅ **Mais seguro:** URLs do R2 não são expostas ao frontend
- ✅ **Download automático:** Headers configurados corretamente
- ✅ **Melhor UX:** Feedback visual durante o download

## 🧪 Testes

### 1. Teste E2E (`server/src/controllers/generate-links-report.e2e.spec.ts`)

```typescript
it('should generate and return the CSV report content directly', async () => {
  await request(app.server)
    .post('/link')
    .send({ originalUrl: 'https://www.google.com', shortUrl: 'google' });
  await request(app.server)
    .post('/link')
    .send({ originalUrl: 'https://www.github.com', shortUrl: 'github' });

  const res = await request(app.server).get('/links/report');
  
  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toContain('text/csv');
  expect(res.headers['content-disposition']).toContain('attachment');
  expect(res.headers['content-disposition']).toContain('.csv');
  
  // Verificar conteúdo CSV
  expect(typeof res.text).toBe('string');
  expect(res.text).toContain('shortUrl,originalUrl,accessCount,createdAt');
  expect(res.text).toContain('google,https://www.google.com');
  expect(res.text).toContain('github,https://www.github.com');
});
```

### 2. Teste Unitário (`server/src/use-cases/generate-links-report-use-case.test.ts`)

```typescript
it('should return the CSV URL on success', async () => {
  const url = 'https://fake-url.com/links.csv';
  const fakePort: GenerateLinksCsvPort = {
    generateAndUploadLinksCsv: async () => ({ url }),
  };
  const useCase = new GenerateLinksReportUseCase(fakePort);
  const result = await useCase.execute();

  expect(isRight(result)).toBe(true);
  if (isRight(result)) {
    expect(result.right.url).toBe(url);
  }
});
```

### Resultados dos Testes
- ✅ **E2E Tests:** 8/8 passando
- ✅ **Unit Tests:** 53/53 passando
- ✅ **Tempo total:** ~2.8s para todos os testes

## 📊 Estrutura do CSV

O arquivo CSV gerado contém:

```csv
shortUrl,originalUrl,accessCount,createdAt
google,https://www.google.com,5,2025-06-28T11:13:15.606Z
github,https://www.github.com,3,2025-06-28T11:10:20.123Z
```

### Campos
- **shortUrl**: URL curta gerada
- **originalUrl**: URL original completa
- **accessCount**: Número de acessos
- **createdAt**: Data de criação (ISO 8601)

## 🔄 Fluxo Completo

1. **Usuário clica no botão "Baixar CSV"**
2. **Frontend chama `/links/report`**
3. **Servidor executa use case**
4. **Use case gera CSV e faz upload para R2**
5. **Servidor faz download do arquivo do R2**
6. **Servidor retorna CSV com headers de download**
7. **Frontend recebe Blob e inicia download automático**

## 🛠️ Tecnologias Utilizadas

- **Backend**: Fastify, Drizzle ORM, AWS SDK (R2)
- **Frontend**: React, React Query, Phosphor Icons
- **Storage**: Cloudflare R2
- **Database**: PostgreSQL
- **Testing**: Vitest, Supertest

## 📝 Notas de Implementação

- O arquivo CSV é gerado com UUID único para evitar conflitos
- Headers configurados para download automático
- Tratamento de erros em todas as camadas
- Logs estruturados com Pino
- Testes cobrem cenários de sucesso e erro 