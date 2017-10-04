import { combineReducers } from "redux";

import {
  reducer as config,
  InitialState as ConfigInitialState
} from "../components/Config/ConfigReducer";

import {
  reducer as constrainedEvents,
  InitialState as EventsInitialState
} from "../components/Events/EventsReducer";

import {
  reducer as drag,
  InitialState as DragInitialState
} from "../components/Drag/DragReducer";

export const INITIAL_STATE = {
  config: ConfigInitialState,
  constrainedEvents: EventsInitialState,
  drag: DragInitialState
};

export const reducer = combineReducers({
  config,
  constrainedEvents,
  drag
});
