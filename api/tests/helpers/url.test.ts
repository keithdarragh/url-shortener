import { isValidUrl } from '../../src/helpers/url';

describe('isValidUrl', () => {
  it('url should be a valid url', async () => {
    const url = 'http://google.com';

    const result = isValidUrl(url);

    expect(result).toBe(true);
  });

  it('url should be a valid with https', async () => {
    const url = 'https://google.com';

    const result = isValidUrl(url);

    expect(result).toBe(true);
  });

  it('url should be a valid url with www', async () => {
    const url = 'http://www.google.com';

    const result = isValidUrl(url);

    expect(result).toBe(true);
  });

  it('url should be a valid url with extra path params', async () => {
    const url = 'http://google.com/search/1234';

    const result = isValidUrl(url);

    expect(result).toBe(true);
  });

  it('url should not be valid with no http', async () => {
    const url = '://google.com';

    const result = isValidUrl(url);

    expect(result).toBe(false);
  });

  it('url should not be valid with no //', async () => {
    const url = 'http:google.com';

    const result = isValidUrl(url);

    expect(result).toBe(false);
  });
});
