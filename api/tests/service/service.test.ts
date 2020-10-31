import mockingoose from 'mockingoose';
import { ShortUrl } from '../../src/model/shortUrl';
import createShortenedUrl from '../../src/service/shortUrls';

describe('createShortenedUrl', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should successfully return a shortedned Url object', async () => {
    const document = {
      _id: '507f191e810c19729de860ea',
      fullUrl: 'http://google.com',
      shortUrl: 'http://pbid.com/asb',
    };

    mockingoose(ShortUrl).toReturn(document, 'save');

    const shortUrlObj = await createShortenedUrl('http://google.com');

    expect(JSON.parse(JSON.stringify(shortUrlObj))).toMatchObject(document);
  });
});
