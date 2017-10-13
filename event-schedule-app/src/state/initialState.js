import deepmerge from "deepmerge";

import { load } from "./localStorageRepository";
import * as config from "../components/Config/ConfigReducer";
import * as constrainedEvents from "../components/Events/EventsReducer";
import * as drag from "../components/Drag/DragReducer";

const InitialState = {
  config: config.InitialState,
  constrainedEvents: constrainedEvents.InitialState,
  drag: drag.InitialState
};

export function buildInitialState() {
  const savedState = load();
  const defaultState = buildInitialStateFromReducers();
  return savedState ? deepmerge(defaultState, savedState) : defaultState;
}

export function buildInitialStateFromReducers() {
  return InitialState;
}
