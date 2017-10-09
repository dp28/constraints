import {
  SET_EVENT_VARIABLE,
  INCREMENT_EVENT_VARIABLE,
  SELECT_EVENT,
  DESELECT_EVENT,
  TRANSLATE_EVENT,
  SET_EVENT_NAME
} from "./EventActions";

export function reducer(event, action) {
  switch (action.type) {
    case SET_EVENT_VARIABLE:
      return updateEvent(event, action);
    case INCREMENT_EVENT_VARIABLE:
      return updateEvent(event, transformIncrementToSet(action, event));
    case SELECT_EVENT:
      return { ...event, isFocused: true };
    case DESELECT_EVENT:
      return { ...event, isFocused: false };
    case TRANSLATE_EVENT:
      return translateEvent(action.distanceInUnits, event);
    case SET_EVENT_NAME:
      return { ...event, name: action.name };
    default:
      return event;
  }
}

function transformIncrementToSet(action, event) {
  const { eventPart, rangePart, timeInUnits } = action;
  return {
    ...action,
    type: SET_EVENT_VARIABLE,
    timeInUnits: event[eventPart].range[rangePart] + timeInUnits
  };
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

function translateEvent(distanceInUnits, event) {
  return {
    ...event,
    start: translateVariable(distanceInUnits, event.start),
    end: translateVariable(distanceInUnits, event.end)
  };
}

function translateVariable(distanceInUnits, variable) {
  return {
    ...variable,
    range: {
      min: variable.range.min + distanceInUnits,
      max: variable.range.max + distanceInUnits
    }
  };
}
