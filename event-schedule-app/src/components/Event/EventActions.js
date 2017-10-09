export const SELECT_EVENT = "SELECT_EVENT";
export const DESELECT_EVENT = "DESELECT_EVENT";
export const TRANSLATE_EVENT = "TRANSLATE_EVENT";
export const SET_EVENT_VARIABLE = "SET_EVENT_VARIABLE";
export const INCREMENT_EVENT_VARIABLE = "INCREMENT_EVENT_VARIABLE";
export const SET_EVENT_NAME = "SET_EVENT_NAME";

export function selectEvent(eventId) {
  return { type: SELECT_EVENT, eventId };
}

export function deselectEvent(eventId) {
  return { type: DESELECT_EVENT, eventId };
}

export function translateEvent(eventId, distanceInUnits) {
  return { type: TRANSLATE_EVENT, eventId, distanceInUnits };
}

export function setEventName(eventId, name) {
  return { type: SET_EVENT_NAME, eventId, name };
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

export function incrementEventVariable(
  eventId,
  eventPart,
  rangePart,
  timeInUnits
) {
  return {
    type: INCREMENT_EVENT_VARIABLE,
    eventId,
    eventPart,
    rangePart,
    timeInUnits
  };
}
