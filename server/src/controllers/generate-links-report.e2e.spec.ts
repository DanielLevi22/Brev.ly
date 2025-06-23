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

  it('should generate and return the CSV report URL', async () => {
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl: 'google' });
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.github.com', shortUrl: 'github' });

    const res = await request(app.server).get('/links/report');
    expect(res.status).toBe(200);
    expect(typeof res.body.url).toBe('string');
    expect(res.body.url.endsWith('.csv')).toBe(true);
  });
}); 