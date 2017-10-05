export const SELECT_EVENT = "SELECT_EVENT";
export const DESELECT_EVENT = "DESELECT_EVENT";
export const SET_EVENT_VARIABLE = "SET_EVENT_VARIABLE";

export function selectEvent(eventId) {
  return { type: SELECT_EVENT, eventId };
}

export function deselectEvent(eventId) {
  return { type: DESELECT_EVENT, eventId };
}

export function setEventVariable(eventId, eventPart, rangePart, timeInUnits) {
  return {
    type: SET_EVENT_VARIABLE,
    eventId,
    eventPart,
    rangePart,
    timeInUnits
  };
}
