import express, { Request, Response } from 'express';
import { ShortUrl } from '../model/shortUrl';
import createShortenedUrl from '../service/shortUrls';

const router = express.Router();

// get all shortened urls
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const shortUrl = await ShortUrl.findOne({ id });

  if (shortUrl) {
    return res.status(200).send(shortUrl);
  }

  return res.status(404).send({
    error: 'result not found',
  });
});

// get specific url
router.get('/', async (req: Request, res: Response) => {
  const allUrls = await ShortUrl.find();
  res.send(allUrls);
});

// create url
router.post('/', async (req: Request, res: Response) => {
  const { fullUrl } = req.body;

  const shortUrl = await createShortenedUrl(fullUrl);
  return res.status(201).send(shortUrl);
});

export default router;
