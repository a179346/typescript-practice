import { ITodoListService, ITodoItem, IInputTodoItem } from '../interface/ITodoList';

class TodolistService implements ITodoListService {
  private data: ITodoItem[];
  private increment: number;
  constructor () {
    this.data = [ {
      id: 0,
      title: 'Write test case',
      message: 'Write the test case according to the spec.',
      checked: false,
    }, {
      id: 1,
      title: 'Complete code',
      message: 'Complete the code.',
      checked: false,
    }, {
      id: 2,
      title: 'Run test',
      message: 'Run test to check the code.',
      checked: false,
    } ];
    this.increment = 2;
  }

  public async get (id:number) {
    return this.data.find((item) => item.id === id) || null;
  }

  public async list () {
    return this.data;
  }

  public async insert (inputTodoItem: IInputTodoItem) {
    const item = { id: ++this.increment, ...inputTodoItem };
    this.data.push(item);
    return item;
  }

  public async remove (id: number) {
    this.data = this.data.filter((item) => item.id !== id);
  }

  public async update (id: number, inputTodoItem: IInputTodoItem) {
    const item = this.data.find((item) => item.id === id);
    if (!item) return null;

    item.title = inputTodoItem.title;
    item.message = inputTodoItem.message;
    item.checked = inputTodoItem.checked;
    return item;
  }
}

export const TodoListService = new TodolistService();