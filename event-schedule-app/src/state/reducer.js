import { combineReducers } from "redux";

import { reducer as newEvent } from "../components/NewEvent/NewEventReducer";
import {
  reducer as config,
  InitialState as ConfigInitialState
} from "../components/Config/ConfigReducer";

export const INITIAL_STATE = {
  config: ConfigInitialState,
  newEvent: {}
};

export const reducer = combineReducers({ config, newEvent });
