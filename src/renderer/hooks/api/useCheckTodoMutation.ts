import { useMutation, useQueryClient } from 'react-query';

const checkTodo = ({ id, done }: { id: string; done: boolean }) =>
  window.api.request('check-todo', { id, done });

const useCheckTodoMutation = () => {
  const client = useQueryClient();

  return useMutation(['todos', 'check'], checkTodo, {
    onSuccess: () => {
      client.invalidateQueries(['todos']);
    },
  });
};

export default useCheckTodoMutation;
