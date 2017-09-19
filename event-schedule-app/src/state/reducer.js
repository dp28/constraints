import { combineReducers } from "redux";

import { reducer as newEvent } from "../components/NewEvent";

export const reducer = combineReducers({ config, newEvent });

function config(state = { minutesPerUnit: 15, pixelsPerUnit: 5 }) {
  return state;
}
