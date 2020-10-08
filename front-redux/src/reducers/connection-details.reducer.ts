import { BaseAction, actionIds } from "../common";

export type ConnectionDetailsState = {
    room: string;
    trainerToken: string;
}

const defaultConnectionDetails = (): ConnectionDetailsState => ({
    room: "",
    trainerToken: "",
  });

export const connectionDetailsReducer = (
  state: ConnectionDetailsState,
  action: BaseAction
) => {
  switch (action.type) {
    /*case actionIds.GET_:
      return [...state, action.payload];*/
  }
  
  return state;
};