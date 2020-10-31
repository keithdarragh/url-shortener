import supertest from 'supertest';
import app from '../../src/index';
import { ShortUrl } from '../../src/model/shortUrl';

describe('short url', () => {
  let superapp: supertest.SuperTest<supertest.Test>;
  beforeEach(async () => {
    superapp = await supertest(app);
    ShortUrl.deleteMany({})
      .then(() => console.log('Data deleted'))
      .catch((error) => console.log(error));
  });
  describe('get', () => {
    it('should return an empty array when no data is present', async () => {
      const res = await superapp
        .get('/shortUrl');

      expect(res.status).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it('should return an array with one object', async () => {
      await superapp
        .post('/shortUrl')
        .send({
          fullUrl: 'http://google.com',
        });

      const res = await superapp
        .get('/shortUrl');

      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(1);
    });

    it('should return an array with multiple objects', async () => {
      const urls = [
        'http://example.com',
        'http://google.com',
        'http://primarybid.com',
      ];

      await Promise.all(
        await urls.map(async (url) => {
          await superapp
            .post('/shortUrl')
            .send({
              fullUrl: url,
            });
        }),
      );

      const res = await superapp
        .get('/shortUrl');

      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(3);
    });
  });

  describe('post', () => {
    it('should create a new short url', async () => {
      const res = await superapp
        .post('/shortUrl')
        .send({
          fullUrl: 'http://google.com',
        });

      expect(res.status).toEqual(201);
      expect(res.body.fullUrl).toEqual('http://google.com');
      expect(Object.keys(res.body).sort()).toEqual(['fullUrl', 'shortUrl', '_id', '__v'].sort());
    });

    it('should not create a new short url for an existing short url', async () => {
      const res1 = await superapp
        .post('/shortUrl')
        .send({
          fullUrl: 'http://google.com',
        });

      const res2 = await superapp
        .post('/shortUrl')
        .send({
          fullUrl: 'http://google.com',
        });

      expect(res2.status).toEqual(201);
      expect(res2.body.fullUrl).toEqual('http://google.com');
      expect(res1.body.shortUrl).toEqual(res2.body.shortUrl);
    });
  });
});
