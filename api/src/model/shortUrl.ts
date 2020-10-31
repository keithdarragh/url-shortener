import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import config from '../config/default';

interface IShortUrl {
  fullUrl: string;
}

interface ShortUrlModelInterface extends mongoose.Model<ShortUrlDoc> {
  build(attr: IShortUrl): ShortUrlDoc
}

interface ShortUrlDoc extends mongoose.Document {
  shortUrl: string;
  fullUrl: string;
}

const todoSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: false,
    unique: true,
    default: () => `${config().urlPrefix}/${nanoid(8).toLowerCase()}`,
  },
  fullUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

todoSchema.statics.build = (attr: IShortUrl) => new ShortUrl(attr);

const ShortUrl = mongoose.model<ShortUrlDoc, ShortUrlModelInterface>('ShortUrl', todoSchema);

export {
  ShortUrl,
  ShortUrlDoc,
};
