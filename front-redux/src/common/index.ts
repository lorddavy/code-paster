export const actionIds = {
    //GET_NUMBER_REQUEST_START: '[X] Request a new number to the NumberGenerator async service.',
    //GET_NUMBER_REQUEST_COMPLETED: '[X] NumberGenerator async service returned a new number.',
    START_SOCKET_CONNECTION: '[0] Starts the socket connection',
    STOP_SOCKET_CONNECTION: '[1] Stops the socket connection',
    MESSAGE_LOG_UPDATE: '[2] Update of the messages log',
  }
  
  export interface BaseAction {
    type : string;
    payload?;
  }