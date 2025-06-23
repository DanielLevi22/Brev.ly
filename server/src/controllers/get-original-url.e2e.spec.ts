import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import supertest from 'supertest';
import { server } from '../server';
import type { FastifyInstance } from 'fastify';

let app: FastifyInstance;

beforeAll(async () => {
  await server.ready();
  app = server;
});

afterAll(async () => {
  await app.close();
});

describe('E2E - Get Original URL', () => {
  it('should get the original URL of an existing link', async () => {
    const shortUrl = 'e2e' + Math.random().toString(36).substring(2, 18);
    await supertest(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    const res = await supertest(app.server).get(`/link/${shortUrl}`);
    expect(res.status).toBe(200);
    expect(res.body.originalUrl).toBe('https://www.google.com');
    expect(res.body.shortUrl).toBe(shortUrl);
  });

  it('should return 404 when getting a non-existent link', async () => {
    const res = await supertest(app.server).get('/link/inexistente-e2e');
    expect(res.status).toBe(404);
  });
}); 