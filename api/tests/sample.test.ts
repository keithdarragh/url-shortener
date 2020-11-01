import mockingoose from 'mockingoose';
import { ShortUrl } from '../src/model/shortUrl';
import createShortenedUrl from '../src/service/shortUrls';

describe('test mongoose User model', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });
  it('should return the doc with findById', () => {
    const document = {
      _id: '507f191e810c19729de860ea',
      fullUrl: 'http://google.com',
      shortUrl: 'http://pbid.com/asb',
    };

    mockingoose(ShortUrl).toReturn(document, 'findOne');

    return ShortUrl.findById({ _id: '507f191e810c19729de860ea' }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(document);
    });
  });

  it('should return the doc with findById', async() => {
    const document = {
      _id: '507f191e810c19729de860ea',
      fullUrl: 'http://google.com',
      shortUrl: 'http://pbid.com/asb',
    };

    mockingoose(ShortUrl).toReturn(document, 'save');

    const shortUrlObj = await createShortenedUrl('http://google.com');

    expect(JSON.parse(JSON.stringify(shortUrlObj))).toMatchObject([document, 201]);
  });
});
