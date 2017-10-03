export const FOCUS_EVENT = "FOCUS_EVENT";
export const BLUR_EVENT = "BLUR_EVENT";
export const SET_EVENT_VARIABLE = "SET_EVENT_VARIABLE";

export function focusEvent(eventId) {
  return { type: FOCUS_EVENT, eventId };
}

export function blurEvent(eventId) {
  return { type: BLUR_EVENT, eventId };
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
