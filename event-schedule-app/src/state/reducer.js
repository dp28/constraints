import { combineReducers } from "redux";

import {
  reducer as timeBounds,
  InitialState as TimeBoundsInitialState
} from "../components/TimeBounds/TimeBoundsReducer";
import {
  reducer as config,
  InitialState as ConfigInitialState
} from "../components/Config/ConfigReducer";

export const INITIAL_STATE = {
  config: ConfigInitialState,
  timeBounds: TimeBoundsInitialState
};

export const reducer = combineReducers({ config, timeBounds });
