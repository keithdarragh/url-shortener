import { ShortUrl, ShortUrlDoc } from '../model/shortUrl';
import { isValidUrl } from '../helpers/url';
import { unproccessableError, ErrorObj, cantCreateError } from '../helpers/errors';

const KEYALREADYEXISTS = 11000;

const getExisitingFullUrl = async (fullUrl: string): Promise<ShortUrlDoc | null> => {
  const shortUrl = await ShortUrl.findOne({ fullUrl });
  return shortUrl;
};

const handleError = async (errorMsg: any, shortUrl: ShortUrlDoc):
Promise<[ShortUrlDoc | ErrorObj, number]> => {
  let error = errorMsg;
  if (error.code === KEYALREADYEXISTS && 'shortUrl' in error.keyPattern) {
    let attempts = 0;
    while ('shortUrl' in error.keyPattern && attempts < 5) {
      // eslint-disable-next-line no-await-in-loop
      const shortUrlObj = await shortUrl.save()
        .then((urlObj) => urlObj)
        .catch((err) => err);
      attempts += 1;
      if (typeof shortUrlObj === typeof shortUrl) {
        return [shortUrlObj, 201];
      }
      error = shortUrlObj;
    }
  }

  if (error.code === KEYALREADYEXISTS && 'fullUrl' in error.keyPattern) {
    const existingUrl = await getExisitingFullUrl(shortUrl.fullUrl);
    return [existingUrl!, 200];
  }

  return cantCreateError('error invalid url');
};

const createShortenedUrl = async (url: string): Promise<[ShortUrlDoc | ErrorObj, number]> => {
  if (isValidUrl(url)) {
    const shortUrl = ShortUrl.build({ fullUrl: url });

    const savedShortUrlObj = await shortUrl.save()
      .then((urlObj) => urlObj)
      .catch((err) => err);

    if (savedShortUrlObj instanceof Error) {
      return handleError(savedShortUrlObj, shortUrl);
    }

    return [savedShortUrlObj, 201];
  }

  return unproccessableError('error invalid url');
};

export default createShortenedUrl;
