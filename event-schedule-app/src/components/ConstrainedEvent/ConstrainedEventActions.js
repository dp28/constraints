export const FOCUS_EVENT = "FOCUS_EVENT";
export const BLUR_EVENT = "BLUR_EVENT";

export function focusEvent(eventId) {
  return { type: FOCUS_EVENT, eventId };
}

export function blurEvent(eventId) {
  return { type: BLUR_EVENT, eventId };
}
