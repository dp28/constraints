import { combineReducers } from "redux";

import { reducer as config } from "../components/Config/ConfigReducer";

import { reducer as constrainedEvents } from "../components/Events/EventsReducer";

import { reducer as drag } from "../components/Drag/DragReducer";

export const reducer = combineReducers({
  config,
  constrainedEvents,
  drag
});
