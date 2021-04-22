import { ITodoList, TTodoItem, TInputTodoItem } from './ITodoList';

class TodoList implements ITodoList {
  private data: TTodoItem[];
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

  async get (id:number) {
    return this.data.find((item) => item.id === id) || null;
  }

  async list () {
    return this.data;
  }

  async insert (inputTodoItem: TInputTodoItem) {
    this.data.push({ ...inputTodoItem, id: ++this.increment });
  }

  async remove (id: number) {
    this.data = this.data.filter((item) => item.id !== id);
  }

  async update (id: number, inputTodoItem: TInputTodoItem) {
    const item = this.data.find((item) => item.id === id);
    if (item) {
      item.title = inputTodoItem.title;
      item.message = inputTodoItem.message;
      item.checked = inputTodoItem.checked;
    }
  }
}

export default (new TodoList());