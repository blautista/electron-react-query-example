import { useQuery } from '@tanstack/react-query';

const getTodos = () => window.api.request('get-todos');

const useGetTodosQuery = () => useQuery(['todos'], getTodos);

export default useGetTodosQuery;
