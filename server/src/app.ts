import express, { Request, Response, NextFunction } from 'express';
import { ApiError } from './lib/ApiError';
import { todoListRouter } from './routes/todoList';

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/todolist', todoListRouter);

app.use((req, res, next) => {
  if (res.httpCode !== undefined) {
    return res.status(res.httpCode).json({
      status: res.httpCode,
      data: res.model,
    });
  }
  const error = new ApiError(404, 'Not Found');
  next(error);
});

app.use((err: any, req:Request, res:Response, next:NextFunction) => {
  let message = 'unknown error';
  let status = 400;
  if (typeof (err?.message) === 'string') {
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