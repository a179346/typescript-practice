export interface BaseInterfaceService<T, inputT> {
  get: (id: number) => Promise<T | null>;
  list: () => Promise<T[]>;
  insert: (inputTodoItem: inputT) => Promise<T>;
  remove: (id: number) => Promise<T | null>;
  update: (id: number, inputTodoItem: inputT) => Promise<T | null>;
}