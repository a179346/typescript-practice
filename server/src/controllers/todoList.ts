import { Request, Response, NextFunction } from 'express';

import { ApiResponse } from '../lib/ApiResponse';
import { ITodoList, TInputTodoItem } from '../dao/ITodoList';
import { TodoList } from '../dao/TodoList_Mock';
import { ApiError } from '../lib/ApiError';
import { Lib } from '../lib/common';

const todoList: ITodoList = TodoList;

async function get (req: Request, res: Response, next: NextFunction) {
  const id = req.params && req.params.id;
  if (typeof (id) !== 'string')
    return next(new ApiError(400, 'id is required'));
  if (!Lib.isInteger(id))
    return next(new ApiError(400, 'invalid id'));

  const item = await todoList.get(parseInt(id, 10));
  if (!item)
    return next(new ApiError(404, 'id not found'));

  (res as ApiResponse).model = item;
  (res as ApiResponse).handled = true;
  next();
}

async function list (req: Request, res: Response, next: NextFunction) {
  (res as ApiResponse).model = await todoList.list();
  (res as ApiResponse).handled = true;
  next();
}

async function insert (req: Request, res: Response, next: NextFunction) {
  if (!req.body)
    return next(new ApiError(400, 'invalid request'));
  if (typeof (req.body.title) !== 'string')
    return next(new ApiError(400, 'invalid title'));
  if (typeof (req.body.message) !== 'string')
    return next(new ApiError(400, 'invalid message'));
  const inputTodoItem: TInputTodoItem = {
    title: req.body.title,
    message: req.body.message,
    checked: typeof (req.body.checked) === 'boolean' ? req.body.checked : false,
  };
  (res as ApiResponse).model = await todoList.insert(inputTodoItem);
  (res as ApiResponse).handled = true;
  next();
}

async function remove (req: Request, res: Response, next: NextFunction) {
  //
}

async function update (req: Request, res: Response, next: NextFunction) {
  const id = req.params && req.params.id;
  if (typeof (id) !== 'string')
    return next(new ApiError(400, 'id is required'));
  if (!Lib.isInteger(id))
    return next(new ApiError(400, 'invalid id'));

  if (!req.body)
    return next(new ApiError(400, 'invalid request'));
  if (typeof (req.body.title) !== 'string')
    return next(new ApiError(400, 'invalid title'));
  if (typeof (req.body.message) !== 'string')
    return next(new ApiError(400, 'invalid message'));
  if (typeof (req.body.checked) !== 'boolean')
    return next(new ApiError(400, 'invalid checked'));
  const inputTodoItem: TInputTodoItem = {
    title: req.body.title,
    message: req.body.message,
    checked: req.body.checked,
  };

  const item = await todoList.update(parseInt(id, 10), inputTodoItem);
  if (!item)
    return next(new ApiError(404, 'id not found'));

  (res as ApiResponse).model = item;
  (res as ApiResponse).handled = true;
  next();
}

export const todoListController = {
  get,
  list,
  insert,
  remove,
  update
};