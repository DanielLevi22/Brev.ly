import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('E2E - Get Original URL', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get the original URL of an existing link', async () => {
    const shortUrl = 'e2e' + Math.random().toString(36).substring(2, 18);
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    const res = await request(app.server).get(`/link/${shortUrl}`);
    expect(res.status).toBe(200);
    expect(res.body.originalUrl).toBe('https://www.google.com');
    expect(res.body.shortUrl).toBe(shortUrl);
  });

  it('should return 404 when getting a non-existent link', async () => {
    const res = await request(app.server).get('/link/inexistente-e2e');
    expect(res.status).toBe(404);
  });
}); 