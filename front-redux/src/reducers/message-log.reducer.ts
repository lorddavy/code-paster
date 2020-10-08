import { BaseAction, actionIds } from "../common";

export type MessageLogState = string;

export const MessageLogReducer = (
    state: MessageLogState = "",
    action: BaseAction
  ) => {
    switch (action.type) {
      case actionIds.MESSAGE_LOG_UPDATE:
        return `${state}\n${action.payload}`
    }
    
    return state;
  };