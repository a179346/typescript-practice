import { ITodoListService, ITodoItem, IInputTodoItem } from '../interface/ITodoList';
import { TodoList } from '../entity/TodoList';
import { BaseDao } from './BaseDao';

class TodolistService extends BaseDao<ITodoItem, IInputTodoItem> implements ITodoListService {
  constructor () {
    super(TodoList);
  }
}

export const TodoListService = new TodolistService();