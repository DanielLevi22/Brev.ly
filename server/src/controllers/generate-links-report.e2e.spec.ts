import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('E2E - Generate Links Report', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

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
    
    // Verificar se o conteúdo é um CSV válido
    expect(typeof res.text).toBe('string');
    expect(res.text).toContain('shortUrl,originalUrl,accessCount,createdAt');
    expect(res.text).toContain('google,https://www.google.com');
    expect(res.text).toContain('github,https://www.github.com');
  });
}); 