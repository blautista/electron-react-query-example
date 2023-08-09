import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import useGetTodosQuery from './hooks/api/useGetTodosQuery';
import useAddTodoMutation from './hooks/api/useAddTodoMutation';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  Alert,
  Button,
  Checkbox,
  Container,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import useCheckTodoMutation from './hooks/api/useCheckTodoMutation';

function NewTodoInput({
  onSubmit,
  loading,
}: {
  loading: boolean;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <Stack
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}
    >
      <TextField
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={loading || !value} type="submit" variant="contained">
        Agregar
      </Button>
    </Stack>
  );
}

function TodosPage() {
  const { data, isLoading, isFetching } = useGetTodosQuery();
  const {
    mutate: mutateAddTodo,
    error: addTodoError,
    isLoading: isAddingTodo,
  } = useAddTodoMutation();
  const { mutate: mutateCheckTodo, isLoading: isCheckingTodo } =
    useCheckTodoMutation();

  if (!data) {
    return 'cargando todos..........';
  }

  const fetching = isFetching || isCheckingTodo || isAddingTodo;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Stack>
        <Typography variant="h6">Todos</Typography>
        {fetching && <LinearProgress />}
        <Stack>
          {data.todos.map((todo) => (
            <Stack direction="row" alignItems="center" key={todo.id}>
              <Typography variant="body1">{todo.description}</Typography>
              <Checkbox
                disabled={fetching}
                onClick={() => {
                  mutateCheckTodo({ id: todo.id, done: !todo.done });
                }}
                checked={todo.done}
              />{' '}
            </Stack>
          ))}
          {!!addTodoError && (
            <Typography color="error.main">{String(addTodoError)}</Typography>
          )}
          <NewTodoInput
            loading={fetching}
            onSubmit={(value) => {
              mutateAddTodo(value);
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <Router>
        <Routes>
          <Route path="/" element={<TodosPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
