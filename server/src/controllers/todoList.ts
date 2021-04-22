import { Request, Response, NextFunction } from 'express';

import ApiResponse from '../lib/ApiResponse';
import { ITodoList } from '../dao/ITodoList';
import TodoList from '../dao/TodoList_Mock';
import ApiError from '../lib/ApiError';
import Lib from '../lib/common';

const todoLsit: ITodoList = TodoList;

async function get (req: Request, res: Response, next: NextFunction) {
  const id = req.params && req.params.id;
  if (typeof (id) !== 'string')
    return next(new ApiError(400, 'id is required'));
  if (!Lib.isInteger(id))
    return next(new ApiError(400, 'invalid id'));

  const item = await todoLsit.get(parseInt(id, 10));
  if (!item)
    return next(new ApiError(404, 'id not found'));

  (res as ApiResponse).model = item;
  (res as ApiResponse).handled = true;
  next();
}

async function list (req: Request, res: Response, next: NextFunction) {
  (res as ApiResponse).model = await todoLsit.list();
  (res as ApiResponse).handled = true;
  next();
}

async function insert (req: Request, res: Response, next: NextFunction) {
  //
}

async function remove (req: Request, res: Response, next: NextFunction) {
  //
}

async function update (req: Request, res: Response, next: NextFunction) {
  //
}

export default {
  get,
  list,
  insert,
  remove,
  update,
};