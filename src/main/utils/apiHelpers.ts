import { ipcMain } from 'electron';
import { EndpointDefinitions } from '../endpoints/endpointDefinitions';

// https://github.com/Microsoft/TypeScript/issues/17915#issuecomment-413347828
export type FindByChannel<Union, Channel> = Union extends {
  channel: Channel;
}
  ? Union
  : never;

export type FindEndpointByChannel<
  Channel extends EndpointDefinitions['channel']
> = FindByChannel<EndpointDefinitions, Channel>;

type InvokeChannelHandler<T extends EndpointDefinitions['channel']> = (
  payload: FindEndpointByChannel<T>['payload']
) => Promise<FindEndpointByChannel<T>['response']>;

function createHandler<T extends EndpointDefinitions['channel']>(
  channel: T,
  cb: InvokeChannelHandler<T>
) {
  return ipcMain.handle(channel, async (_, payload) => {
    return cb(payload as FindEndpointByChannel<T>['payload']);
  });
}

export function createController<T extends string>(name: T, endpoints: void[]) {
  return endpoints;
}

export const api = {
  createController,
  handle: createHandler,
};
