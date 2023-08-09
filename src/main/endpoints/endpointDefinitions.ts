import { Todo } from '../../shared/api';

type EndpointDefinition<Channel extends string, Payload, Response> = {
  channel: Channel;
  payload: Payload;
  response: Response;
};

type AddTodoEndpoint = EndpointDefinition<'add-todo', string, void>;

type CheckTodoEndpoint = EndpointDefinition<
  'check-todo',
  { id: string; done: boolean },
  void
>;

type GetTodosEndpoint = EndpointDefinition<
  'get-todos',
  void,
  { todos: Todo[] }
>;

type DeleteTodoEndpoint = EndpointDefinition<
  'delete-todo',
  { todoId: string },
  void
>;

export type EndpointDefinitions =
  | AddTodoEndpoint
  | GetTodosEndpoint
  | DeleteTodoEndpoint
  | CheckTodoEndpoint;
