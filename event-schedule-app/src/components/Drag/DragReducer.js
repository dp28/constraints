import { START_DRAGGING, STOP_DRAGGING } from "./DragActions";

export const InitialState = {
  startPixels: null,
  startUnits: null
};

export function reducer(state = InitialState, action) {
  switch (action.type) {
    case START_DRAGGING:
      return { startPixels: action.startPixels, startUnits: action.startUnits };
    case STOP_DRAGGING:
      return InitialState;
    default:
      return state;
  }
}
