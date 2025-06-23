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

describe('E2E - List All Links', () => {
  it('deve listar todos os links', async () => {
    const res = await supertest(app.server).get('/links');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.links)).toBe(true);
  });
}); 