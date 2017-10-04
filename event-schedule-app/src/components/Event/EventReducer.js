import { SET_EVENT_VARIABLE, FOCUS_EVENT, BLUR_EVENT } from "./EventActions";

export function reducer(event, action) {
  switch (action.type) {
    case SET_EVENT_VARIABLE:
      return updateEvent(event, action);
    case FOCUS_EVENT:
      return { ...event, isFocused: true };
    case BLUR_EVENT:
      return { ...event, isFocused: false };
    default:
      return event;
  }
}

function updateEvent(event, action) {
  const { eventPart, rangePart, timeInUnits } = action;
  if (isValidVariableUpdate(event[eventPart], rangePart, timeInUnits)) {
    const updatedEvent = performUpdate(event, action);
    if (isValidEvent(updatedEvent)) {
      return removeSolutions(updatedEvent);
    }
  }
  return event;
}

function performUpdate(event, action) {
  const { eventPart, rangePart, timeInUnits } = action;
  const eventVariable = event[eventPart];
  const updatedRange = { ...eventVariable.range, [rangePart]: timeInUnits };
  const updatedEventVariable = { ...eventVariable, range: updatedRange };
  return { ...event, [eventPart]: updatedEventVariable };
}

function isValidEvent(event) {
  return !(
    startsTooLate(event) ||
    endsTooEarly(event) ||
    durationTooShort(event)
  );
}

function startsTooLate({ start, end, duration }) {
  return end.range.max < start.range.max;
}

function endsTooEarly({ start, end, duration }) {
  return start.range.max + duration.range.min > end.range.min;
}

function durationTooShort({ start, end, duration }) {
  return start.range.min + duration.range.max < end.range.max;
}

function isValidVariableUpdate(variable, param, value) {
  return (
    (param === "min" && variable.range.max >= value) ||
    (param === "max" && variable.range.min <= value)
  );
}

function removeSolutions(event) {
  return {
    ...event,
    start: { ...event.start, solution: null },
    duration: { ...event.duration, solution: null },
    end: { ...event.end, solution: null }
  };
}
