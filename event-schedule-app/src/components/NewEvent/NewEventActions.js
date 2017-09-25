export const START_EVENT = "START_EVENT";
export const SET_EVENT_END = "SET_EVENT_END";
export const TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";

export function startEvent(timeInUnits) {
  return { type: START_EVENT, timeInUnits };
}

export function setEventEnd(timeInUnits) {
  return { type: SET_EVENT_END, timeInUnits };
}

export function toggleEditingEvent() {
  return { type: TOGGLE_EDITING_EVENT };
}
