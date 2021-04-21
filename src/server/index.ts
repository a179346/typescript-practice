import express from 'express';
import { PORT } from './system/env';

const app = express();

app.get('/', (req, res, next) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});