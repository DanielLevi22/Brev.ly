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

describe('E2E - Create Link', () => {
  it('should create a new link', async () => {
    // Ensure max 20 chars
    const shortUrl = 'e2e' + Date.now().toString().slice(-17);
    const res = await supertest(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    console.log('Response:', res.status, res.body);
    expect(res.status).toBe(200);
    expect(res.body.shortUrl).toBe(shortUrl);
  });
}); 