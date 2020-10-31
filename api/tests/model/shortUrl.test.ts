import mockingoose from 'mockingoose';
import { ShortUrl } from '../../src/model/shortUrl';

describe('ShortUrl model', () => {
  it('should successfully create a model', async () => {
    const shortUrl = ShortUrl.build({ fullUrl: 'http://google.com' });

    expect(shortUrl.fullUrl).toBe('http://google.com');
    expect(shortUrl.shortUrl).toContain('http://example.com');
    expect(shortUrl.shortUrl).toBe(shortUrl.shortUrl.toLowerCase());
  });
});
