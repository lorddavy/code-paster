import { BaseAction, actionIds } from './common';
import { SocketOuputMessageLiteral } from './core/const'

export const numberRequestStartAction = (): BaseAction => ({
  type: actionIds.GET_NUMBER_REQUEST_START,
  payload: null,
});

export const numberRequestCompletedAction = (
  numberGenerated: number
): BaseAction => ({
  type: actionIds.GET_NUMBER_REQUEST_COMPLETED,
  payload: numberGenerated,
});

export const startSocketConnection = (room: string): BaseAction => ({
    type: actionIds.START_SOCKET_CONNECTION,
    payload: room,
  });

  export const messageLogUpdateAction: (
    update: string
    ) => BaseAction = (update) => ({
    type: actionIds.MESSAGE_LOG_UPDATE,
    payload: update,
  });