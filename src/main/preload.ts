// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { EndpointDefinitions } from './endpoints/endpointDefinitions';
import { FindEndpointByChannel } from './utils/apiHelpers';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const apiHandler = {
  request<T extends EndpointDefinitions['channel']>(
    channel: T,
    ...args: [FindEndpointByChannel<T>['payload']] extends [void]
      ? []
      : [FindEndpointByChannel<T>['payload']]
  ): Promise<FindEndpointByChannel<T>['response']> {
    return ipcRenderer.invoke(channel, args[0]) as Promise<
      FindEndpointByChannel<T>['response']
    >;
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('api', apiHandler);

export type ElectronHandler = typeof electronHandler;
export type ApiHandler = typeof apiHandler;
