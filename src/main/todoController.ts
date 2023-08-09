import { api } from './utils/apiHelpers';
import { delay } from './utils/asyncUtils';
import { v4 as uuid } from 'uuid';
import { Todo } from '../shared/api';

const getInitialTodos = (): Todo[] => [
  { description: 'hacer la cama', id: uuid(), done: true },
  { description: 'limpiar el baño', id: uuid(), done: false },
];

const todos = getInitialTodos();

api.handle('get-todos', async () => {
  await delay();

  return { todos };
});

api.handle('check-todo', async ({ id, done }) => {
  await delay();

  const todo = todos.find((e) => e.id === id);

  if (!todo) {
    throw new Error('no todo with that id');
  }

  todo.done = done;
});

api.handle('add-todo', async (description) => {
  await delay();

  if (todos.find((todo) => todo.description === description)) {
    throw new Error('Che amigo ese todo ya lo tenes');
  }

  todos.push({ id: uuid(), done: false, description });
});

api.handle('delete-todo', async ({ todoId }) => {
  await delay();

  todos.filter((todo) => todo.id !== todoId);
});

export const aa =
  'thisisastringsothemodulegetsimportedandthehandlersinitialized';
