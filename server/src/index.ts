import express from 'express';
import { PORT } from './system/env';
import logging from './utils/logging';

const app = express();
const NAMESPACE = 'server';

app.get('/', (req, res, next) => {
  res.send('hello2');
});

app.listen(PORT, () => {
  logging.info(NAMESPACE, `server listening on ${PORT}`);
});