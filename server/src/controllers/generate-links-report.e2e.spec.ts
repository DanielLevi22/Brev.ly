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

describe('E2E - Generate Links Report', () => {
  it('deve gerar e retornar a URL do relatório CSV', async () => {
    const res = await supertest(app.server).get('/links/report');
    expect(res.status).toBe(200);
    expect(typeof res.body.url).toBe('string');
    expect(res.body.url.endsWith('.csv')).toBe(true);
  });
}); 