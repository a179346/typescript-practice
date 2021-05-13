import { Request, Response, NextFunction } from 'express';

import { ITodoListService, IInputTodoItem, assertInputTodoItem } from '../interface/ITodoList';
// import { TodoListService } from '../dao/TodoList_Mock';
import { TodoListService } from '../dao/TodoList';
import { ApiError } from '../lib/ApiError';
import { Lib } from '../lib/common';
import { eHTTP_CODE } from '../lib/enum';
import { Decorator } from '../decorator';

const todoList: ITodoListService = TodoListService;

class TodoListController {

  @Decorator.Method.CatchError
  async get (req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    if (typeof (id) !== 'string')
      return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required'));
    if (!Lib.isInteger(id))
      return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id'));

    const item = await todoList.get(parseInt(id, 10));
    if (!item)
      return next(new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found'));

    res.model = item;
    res.httpCode = eHTTP_CODE.OK;
    next();
  }

  @Decorator.Method.CatchError
  async list (req: Request, res: Response, next: NextFunction) {
    res.model = await todoList.list();
    res.httpCode = eHTTP_CODE.OK;
    next();
  }

  @Decorator.Method.CatchError
  async insert (req: Request, res: Response, next: NextFunction) {
    assertInputTodoItem(req.body, false);

    const inputTodoItem: IInputTodoItem = {
      title: req.body.title,
      message: req.body.message,
      checked: typeof (req.body.checked) === 'boolean' ? req.body.checked : false,
    };
    res.model = await todoList.insert(inputTodoItem);
    res.httpCode = eHTTP_CODE.CREATED;
    next();
  }

  @Decorator.Method.CatchError
  async remove (req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    if (typeof (id) !== 'string')
      return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required'));
    if (!Lib.isInteger(id))
      return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id'));

    const item = await todoList.remove(parseInt(id, 10));
    if (!item)
      return next(new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found'));

    res.model = item;
    res.httpCode = eHTTP_CODE.OK;
    next();
  }

  @Decorator.Method.CatchError
  async update (req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;
    if (typeof (id) !== 'string')
      return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'id is required'));
    if (!Lib.isInteger(id))
      return next(new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid id'));

    assertInputTodoItem(req.body, true);

    const inputTodoItem: IInputTodoItem = {
      title: req.body.title,
      message: req.body.message,
      checked: req.body.checked,
    };

    const item = await todoList.update(parseInt(id, 10), inputTodoItem);
    if (!item)
      return next(new ApiError(eHTTP_CODE.NOT_FOUND, 'id not found'));

    res.model = item;
    res.httpCode = eHTTP_CODE.OK;
    next();
  }
}

export const todoListController = new TodoListController();