import express, { Request, Response, NextFunction } from 'express';
import { config } from './system/config';
import { logging } from './utils/logging';
import { ApiError } from './lib/ApiError';
import { todoListRouter } from './routes/todoList';
import { eHTTP_CODE } from './lib/enum';

const app = express();
const NAMESPACE = 'Server';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/todolist', todoListRouter);

app.use((req, res, next) => {
  if (res.handled) {
    return res.status(eHTTP_CODE.OK).json({
      status: eHTTP_CODE.OK,
      data: res.model,
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