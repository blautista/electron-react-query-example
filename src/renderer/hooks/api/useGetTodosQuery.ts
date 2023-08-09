import { useQuery } from 'react-query';

const getTodos = () => window.api.request('get-todos');

const useGetTodosQuery = () => useQuery(['todos'], getTodos);

export default useGetTodosQuery;
