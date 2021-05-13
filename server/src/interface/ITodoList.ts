import { ApiError } from '../lib/ApiError';
import { eHTTP_CODE } from '../lib/enum';
import { BaseInterfaceService } from './BaseInterface';

export interface IInputTodoItem {
  title: string;
  message: string;
  checked?: boolean;
}

export function assertInputTodoItem (v: any, needChecked: boolean): asserts v is IInputTodoItem {
  if (!v || typeof (v) !== 'object')
    throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid request');
  if (typeof (v.title) !== 'string')
    throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid title');
  if (typeof (v.message) !== 'string')
    throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid message');
  if (needChecked && typeof (v.checked) !== 'boolean')
    throw new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid checked');
}

export interface ITodoItem extends IInputTodoItem {
  id: number
}

export type ITodoListService = BaseInterfaceService<ITodoItem, IInputTodoItem>