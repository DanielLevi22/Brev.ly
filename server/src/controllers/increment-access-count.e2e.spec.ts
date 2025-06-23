import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('E2E - Increment Access Count', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should increment the access count', async () => {
    const shortUrl = 'e2e' + Math.random().toString(36).substring(2, 18);
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    const res = await request(app.server).patch(`/link/${shortUrl}/access`);
    expect(res.status).toBe(200);
    expect(res.body.link.shortUrl).toBe(shortUrl);
    expect(typeof res.body.link.accessCount).toBe('number');
  });
}); 