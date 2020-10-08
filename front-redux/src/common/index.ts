export const actionIds = {
    GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
    GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
    START_SOCKET_CONNECTION: '[2] Starts the socket connection',
    STOP_SOCKET_CONNECTION: '[3] Stops the socket connection',
    MESSAGE_LOG_UPDATE: '[4] Update of the messages log',
  }
  
  export interface BaseAction {
    type : string;
    payload?;
  }