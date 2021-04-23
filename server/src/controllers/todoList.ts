import { Request, Response, NextFunction } from 'express';

import { ITodoList, TInputTodoItem } from '../dao/ITodoList';
import { TodoList } from '../dao/TodoList_Mock';
import { ApiError } from '../lib/ApiError';
import { Lib } from '../lib/common';
import { eHTTP_CODE } from '../lib/enum';

const todoList: ITodoList = TodoList;

async function get (req: Request, res: Response, next: NextFunction) {
  const id = req.params && req.params.id;
  if (typeof (id) !== 'string')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required'));
  if (!Lib.isInteger(id))
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id'));

  const item = await todoList.get(parseInt(id, 10));
  if (!item)
    return next(new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found'));

  res.model = item;
  res.handled = true;
  next();
}

async function list (req: Request, res: Response, next: NextFunction) {
  res.model = await todoList.list();
  res.handled = true;
  next();
}

async function insert (req: Request, res: Response, next: NextFunction) {
  if (!req.body)
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid request'));
  if (typeof (req.body.title) !== 'string')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid title'));
  if (typeof (req.body.message) !== 'string')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid message'));
  const inputTodoItem: TInputTodoItem = {
    title: req.body.title,
    message: req.body.message,
    checked: typeof (req.body.checked) === 'boolean' ? req.body.checked : false,
  };
  res.model = await todoList.insert(inputTodoItem);
  res.handled = true;
  next();
}

async function remove (req: Request, res: Response, next: NextFunction) {
  //
}

async function update (req: Request, res: Response, next: NextFunction) {
  const id = req.params && req.params.id;
  if (typeof (id) !== 'string')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required'));
  if (!Lib.isInteger(id))
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id'));

  if (!req.body)
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid request'));
  if (typeof (req.body.title) !== 'string')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid title'));
  if (typeof (req.body.message) !== 'string')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid message'));
  if (typeof (req.body.checked) !== 'boolean')
    return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid checked'));
  const inputTodoItem: TInputTodoItem = {
    title: req.body.title,
    message: req.body.message,
    checked: req.body.checked,
  };

  const item = await todoList.update(parseInt(id, 10), inputTodoItem);
  if (!item)
    return next(new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found'));

  res.model = item;
  res.handled = true;
  next();
}

export const todoListController = {
  get,
  list,
  insert,
  remove,
  update
};