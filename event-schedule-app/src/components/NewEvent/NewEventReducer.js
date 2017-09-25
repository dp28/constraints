import {
  START_EVENT,
  SET_EVENT_END,
  TOGGLE_EDITING_EVENT
} from "./NewEventActions";

export function reducer(newEvent = {}, action) {
  switch (action.type) {
    case START_EVENT:
      return { ...newEvent, minStart: action.timeInUnits };
    case SET_EVENT_END:
      return updateEventEnd(newEvent, action);
    case TOGGLE_EDITING_EVENT:
      return { ...newEvent, editing: !newEvent.editing };
    default:
      return newEvent;
  }
}

function updateEventEnd(newEvent, { timeInUnits }) {
  if (newEvent.maxEnd !== timeInUnits && newEvent.minStart <= timeInUnits) {
    return { ...newEvent, maxEnd: timeInUnits };
  }
  return newEvent;
}
