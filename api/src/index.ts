import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './db/db';
import router from './routes/shortUrls';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

const connection = connect();
connection.once('open', async () => {
  console.log("Connected to database");
});
// define a route handler for the default home page
app.use('/shortUrl', router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
