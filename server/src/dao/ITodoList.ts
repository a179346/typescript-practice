export type TInputTodoItem = {
  title: string;
  message: string;
  checked: boolean;
}

export type TTodoItem = TInputTodoItem & {
  id: number
};


export interface ITodoList {
  get: (id: number) => Promise<TTodoItem | null>;
  list: () => Promise<TTodoItem[]>;
  insert: (inputTodoItem: TInputTodoItem) => Promise<TTodoItem>;
  remove: (id: number) => Promise<void>;
  update: (id: number, inputTodoItem: TInputTodoItem) => Promise<TTodoItem | null>;
}