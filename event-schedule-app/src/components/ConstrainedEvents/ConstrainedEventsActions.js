export const SET_EVENT_VARIABLE = "SET_EVENT_VARIABLE";

export function setEventVariable(eventId, eventPart, rangePart, timeInUnits) {
  return {
    type: SET_EVENT_VARIABLE,
    eventId,
    eventPart,
    rangePart,
    timeInUnits
  };
}
