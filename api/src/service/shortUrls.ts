import { ShortUrl, ShortUrlDoc } from '../model/shortUrl';

const KEYALREADYEXISTS = 11000;

const getExisitingFullUrl = async (fullUrl: string) => {
  const shortUrl = await ShortUrl.findOne({ fullUrl });
  return shortUrl;
};

const handleError = async (errorMsg: any, shortUrl: ShortUrlDoc) => {
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
        return shortUrlObj;
      }
      error = shortUrlObj;
    }
  }

  if (error.code === KEYALREADYEXISTS && 'fullUrl' in error.keyPattern) {
    return getExisitingFullUrl(shortUrl.fullUrl);
  }

  return null;
};

const createShortenedUrl = async (url: string) => {
  const shortUrl = ShortUrl.build({ fullUrl: url });

  // let error = await shortUrl.save().catch((err) => err);
  const savedShortUrlObj = await shortUrl.save()
    .then((urlObj) => urlObj)
    .catch((err) => handleError(err, shortUrl));

  return savedShortUrlObj;
};

export default createShortenedUrl;
