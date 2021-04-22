import express, { Request, Response, NextFunction } from 'express';
import ApiResponse from './lib/ApiResponse';
import config from './system/config';
import logging from './utils/logging';
import ApiError from './lib/ApiError';
import todoRoute from './routes/todoList';

express.urlencoded({ extended: false });
express.json();

const app = express();
const NAMESPACE = 'Server';

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/todolist', todoRoute);

app.use((req, res, next) => {
  if ((res as ApiResponse).handled) {
    return res.json({
      status: 200,
      data: (res as ApiResponse).model,
    });
  }
  const error = new ApiError(404, 'Not Found');
  next(error);
});

app.use((err: any, req:Request, res:Response, next:NextFunction) => {
  let message = 'unknown error';
  let status = 400;
  if (err && typeof (err.message) === 'string') {
    message = err.message;
  }
  if (err instanceof ApiError) {
    status = err.status;
  }
  res.status(status).json({
    status,
    message
  });
});

app.listen(config.server.PORT, () => {
  logging.info(NAMESPACE, `server listening on ${config.server.PORT}`);
});