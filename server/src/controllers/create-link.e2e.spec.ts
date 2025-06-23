import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('E2E - Create Link', () => {
  it('should create a new link', async () => {
    // Ensure max 20 chars
    const shortUrl = 'e2e' + Date.now().toString().slice(-17);
    const res = await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    console.log('Response:', res.status, res.body);
    expect(res.status).toBe(200);
    expect(res.body.shortUrl).toBe(shortUrl);
  });
}); 