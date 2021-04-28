import { ITodoListService, IInputTodoItem } from '../interface/ITodoList';
import { TodoList } from '../entity/TodoList';
import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';

class TodolistService implements ITodoListService {
  get repository (): Repository<TodoList> {
    return TypeOrmConnection.connection.getRepository(TodoList);
  }

  public async get (id:number) {
    return (await this.repository.findOne(id) || null);
  }

  public async list () {
    return await this.repository.find();
  }

  public async insert (inputTodoItem: IInputTodoItem) {
    const todoItem = new TodoList();
    return await this.repository.save({
      ...todoItem,
      ...inputTodoItem
    });
  }

  public async remove (id: number) {
    const todoItem = await this.repository.findOne(id);
    if (todoItem) {
      await this.repository.remove(todoItem);
    }
    return todoItem ? { ...todoItem, id } : null;
  }

  public async update (id: number, inputTodoItem: IInputTodoItem) {
    const todoItem = await this.repository.findOne(id);
    let saveVal = null;
    if (todoItem) {
      saveVal = {
        ...todoItem,
        ...inputTodoItem
      };
      await this.repository.save(saveVal);
    }
    return saveVal;
  }
}

export const TodoListService = new TodolistService();