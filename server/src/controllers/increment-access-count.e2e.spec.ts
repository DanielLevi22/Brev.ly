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

describe('E2E - Increment Access Count', () => {
  it('should increment the access count', async () => {
    const shortUrl = 'e2e' + Math.random().toString(36).substring(2, 18);
    await supertest(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    const res = await supertest(app.server).patch(`/link/${shortUrl}/access`);
    expect(res.status).toBe(200);
    expect(res.body.link.shortUrl).toBe(shortUrl);
    expect(typeof res.body.link.accessCount).toBe('number');
  });
}); 