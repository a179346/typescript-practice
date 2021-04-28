import { BaseInterfaceService } from './BaseInterface';

export interface IInputTodoItem {
  title: string;
  message: string;
  checked: boolean;
}

export interface ITodoItem extends IInputTodoItem {
  id: number
}

export type ITodoListService = BaseInterfaceService<ITodoItem, IInputTodoItem>