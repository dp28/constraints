import { load } from "./localStorageRepository";

import * as config from "../components/Config/ConfigReducer";
import * as constrainedEvents from "../components/Events/EventsReducer";
import * as drag from "../components/Drag/DragReducer";

export function buildInitialState() {
  return load() || buildInitialStateFromReducers();
}

export function buildInitialStateFromReducers() {
  return {
    config: config.InitialState,
    constrainedEvents: constrainedEvents.InitialState,
    drag: drag.InitialState
  };
}
