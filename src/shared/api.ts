export const Handlers = {
  ADD_TODO: 'ADD_TODO',
  DECREASE_COUNTER: 'REMOVE_TODO',
  GET_TODOS: 'GET_TODOS',
} as const;

export type Todo = {
  id: string;
  description: string;
  done: boolean;
};
