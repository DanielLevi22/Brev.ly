import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('E2E - Delete Link', () => {
  it('should delete an existing link', async () => {
    const shortUrl = 'e2e' + Math.random().toString(36).substring(2, 18);
    await request(app.server)
      .post('/link')
      .send({ originalUrl: 'https://www.google.com', shortUrl });
    const res = await request(app.server).delete(`/link/${shortUrl}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/sucesso/i);
  });

  it('should return 404 when deleting a non-existent link', async () => {
    const res = await request(app.server).delete('/link/inexistente-e2e');
    expect(res.status).toBe(404);
  });
}); 