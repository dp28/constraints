export const SET_EVENT_VARIABLE = "SET_EVENT_VARIABLE";
export const CREATE_EVENT = "CREATE_EVENT";

export function setEventVariable(eventId, eventPart, rangePart, timeInUnits) {
  return {
    type: SET_EVENT_VARIABLE,
    eventId,
    eventPart,
    rangePart,
    timeInUnits
  };
}

export function createEvent(minStart, maxEnd) {
  return { type: CREATE_EVENT, minStart, maxEnd };
}
