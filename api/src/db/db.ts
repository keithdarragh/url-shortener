import mongoose from "mongoose";
import config from '../config/default';

// const mongoConfig = config.mongo;

let database: mongoose.Connection;
export const connect = (): mongoose.Connection => {
  // add your own uri below
  // const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.url}:${mongoConfig.port}/test?retryWrites=true&w=majority`;
  const mongoConfig = config().mongo;
  
  const uri = `mongodb://${mongoConfig.url}:${mongoConfig.port}/${mongoConfig.dbName}`;
  if (database) {
    return database;
  }

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  });

  return mongoose.connection;
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
