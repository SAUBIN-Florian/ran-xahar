import request from 'supertest';

import app from '../../app';

describe('GET /api/v1/items', () => {
  it('responds with an array of items', (done) => {
    request(app)
      .get('/api/v1/items')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(1);
        done();
      });
  });
});