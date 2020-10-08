import { combineReducers } from "redux";
import { userProfileReducer, UserProfileState } from "./user-profile.reducer";

import {
  numberCollectionReducer,
  NumberCollectionState,
} from './number-collection.reducer';

export interface State {
  userProfileReducer: UserProfileState;
  numberCollection: NumberCollectionState;
}

export const reducers = combineReducers<State>({
  userProfileReducer,
  numberCollection: numberCollectionReducer,
});

