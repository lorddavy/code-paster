import { combineReducers } from "redux";
//import { userProfileReducer, UserProfileState } from "./user-profile.reducer";
import { MessageLogReducer, MessageLogState } from "./message-log.reducer";

/*import {
  numberCollectionReducer,
  NumberCollectionState,
} from './number-collection.reducer';*/

export interface State {
  //userProfileReducer: UserProfileState;
  //numberCollection: NumberCollectionState;
  MessageLogs: MessageLogState;
}

export const reducers = combineReducers<State>({
  //userProfileReducer,
  //numberCollection: numberCollectionReducer,
  MessageLogs: MessageLogReducer,
});

