import { useMutation, useQueryClient } from '@tanstack/react-query';

const addTodo = (value: string) => window.api.request('add-todo', value);

const useAddTodoMutation = () => {
  const client = useQueryClient();

  return useMutation(['todos', 'add'], addTodo, {
    onSuccess: () => {
      client.invalidateQueries(['todos']);
    },
  });
};

export default useAddTodoMutation;
