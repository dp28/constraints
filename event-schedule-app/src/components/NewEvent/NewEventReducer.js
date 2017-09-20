import { TIMELINE_ITEM_CLICKED } from "../Timeline/TimelineActions";

export function reducer(newEvent = {}, action) {
  switch (action.type) {
    case TIMELINE_ITEM_CLICKED:
      return updateEvent(newEvent, action);
    default:
      return newEvent;
  }
}

function updateEvent(newEvent, { timeInUnits }) {
  if (newEvent.minStart === undefined) {
    return { ...newEvent, minStart: timeInUnits };
  }
  if (newEvent.maxEnd !== timeInUnits && newEvent.minStart <= timeInUnits) {
    return { ...newEvent, maxEnd: timeInUnits };
  }
  return newEvent;
}
