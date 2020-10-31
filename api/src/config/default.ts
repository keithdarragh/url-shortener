export type Mongo = {
  username: string;
  password: string;
  url: string;
  port: string;
  dbName: string;
};

export type Config = {
  mongo: Mongo;
  urlPrefix: string;
};

const config = ():Config => {
  const conf = {
    mongo: {
      username: process.env.MONGO_USERNAME || '',
      password: process.env.MONGO_PASSWORD || '',
      url: process.env.MONGO_URL || '',
      port: process.env.MONGO_PORT || '',
      dbName: process.env.DB_NAME || '',
    },
    urlPrefix: process.env.URL_PREFIX || 'http://example.com',
  };
  return conf;
};

export default config;
