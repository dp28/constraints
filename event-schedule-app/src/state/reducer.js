import * as config from "../components/Config/ConfigReducer";

import * as constrainedEvents from "../components/Events/EventsReducer";

import * as drag from "../components/Drag/DragReducer";

export const reducer = combineReducers({
  config,
  constrainedEvents,
  drag
});

function combineReducers(reducerObject) {
  return (state = {}, action) => {
    return Object.entries(
      reducerObject
    ).reduce((stateSoFar, [property, { reducer }]) => {
      const currentState = stateSoFar[property];
      const newState = reducer(currentState, action, stateSoFar);
      if (newState === currentState) {
        return stateSoFar;
      }
      return { ...stateSoFar, [property]: newState };
    }, state);
  };
}
