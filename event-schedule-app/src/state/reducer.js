import { combineReducers } from "redux";

import {
  reducer as timeBounds,
  InitialState as TimeBoundsInitialState
} from "../components/TimeBounds/TimeBoundsReducer";

import {
  reducer as config,
  InitialState as ConfigInitialState
} from "../components/Config/ConfigReducer";

import {
  reducer as constrainedEvents,
  InitialState as ConstrainedEventsInitialState
} from "../components/ConstrainedEvents/ConstrainedEventsReducer";

import {
  reducer as drag,
  InitialState as DragInitialState
} from "../components/Drag/DragReducer";

export const INITIAL_STATE = {
  config: ConfigInitialState,
  timeBounds: TimeBoundsInitialState,
  constrainedEvents: ConstrainedEventsInitialState,
  drag: DragInitialState
};

export const reducer = combineReducers({
  config,
  timeBounds,
  constrainedEvents,
  drag
});
