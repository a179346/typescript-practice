import { Request, Response, NextFunction } from 'express';

import { ITodoListService, IInputTodoItem } from '../interface/ITodoList';
// import { TodoListService } from '../dao/TodoList_Mock';
import { TodoListService } from '../dao/TodoList';
import { ApiError } from '../lib/ApiError';
import { Lib } from '../lib/common';
import { eHTTP_CODE } from '../lib/enum';
import { Decorator } from '../decorator';
import { Validax } from 'validax';

const todoList: ITodoListService = TodoListService;

class TodoListController {

  @Decorator.Method.CatchError()
  async get (req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    if (typeof (id) !== 'string')
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required');
    if (!Lib.isInteger(id))
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id');

    const item = await todoList.get(parseInt(id, 10));
    if (!item)
      throw new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found');

    res.model = item;
    res.httpCode = eHTTP_CODE.OK;
    next();
  }

  @Decorator.Method.CatchError()
  async list (req: Request, res: Response, next: NextFunction) {
    res.model = await todoList.list();
    res.httpCode = eHTTP_CODE.OK;
    next();
  }

  @Decorator.Method.CatchError()
  async insert (req: Request, res: Response, next: NextFunction) {
    if (!req.body || typeof (req.body) !== 'object')
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid request');
    Validax.assert(req.body, IInputTodoItem);

    const inputTodoItem: IInputTodoItem = {
      title: req.body.title,
      message: req.body.message,
      checked: req.body.checked || false,
    };
    res.model = await todoList.insert(inputTodoItem);
    res.httpCode = eHTTP_CODE.CREATED;
    next();
  }

  @Decorator.Method.CatchError()
  async remove (req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    if (typeof (id) !== 'string')
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required');
    if (!Lib.isInteger(id))
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id');

    const item = await todoList.remove(parseInt(id, 10));
    if (!item)
      throw new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found');

    res.model = item;
    res.httpCode = eHTTP_CODE.OK;
    next();
  }

  @Decorator.Method.CatchError()
  async update (req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    if (typeof (id) !== 'string')
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required');
    if (!Lib.isInteger(id))
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id');

    if (!req.body || typeof (req.body) !== 'object')
      throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid request');
    Validax.assert(req.body, IInputTodoItem);

    const inputTodoItem: IInputTodoItem = {
      title: req.body.title,
      message: req.body.message,
    };
    if (typeof req.body.checked === 'boolean')
      inputTodoItem.checked = req.body.checked;

    const item = await todoList.update(parseInt(id, 10), inputTodoItem);
    if (!item)
      throw new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found');

    res.model = item;
    res.httpCode = eHTTP_CODE.OK;
    next();
  }
}

export const todoListController = new TodoListController();