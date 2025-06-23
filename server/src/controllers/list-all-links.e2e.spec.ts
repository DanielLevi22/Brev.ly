import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('E2E - List All Links', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list all links', async () => {
    // Cria alguns links antes de listar
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl: 'google' });
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.github.com', shortUrl: 'github' });

    const res = await request(app.server).get('/links');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.links)).toBe(true);
    expect(res.body.links.length).toBeGreaterThanOrEqual(2);
  });
}); 