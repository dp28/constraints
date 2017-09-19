import { combineReducers } from "redux";

import { reducer as newEvent } from "../components/NewEvent/NewEventReducer";

export const INITIAL_STATE = {
  config: {
    minutesPerUnit: 15,
    pixelsPerUnit: 10
  },
  newEvent: {}
};

export const reducer = combineReducers({ config, newEvent });

function config(state = INITIAL_STATE.config) {
  return state;
}
