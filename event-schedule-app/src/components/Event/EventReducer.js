import {
  SET_EVENT_VARIABLE,
  INCREMENT_EVENT_VARIABLE,
  SELECT_EVENT,
  DESELECT_EVENT,
  TRANSLATE_EVENT,
  SET_EVENT_NAME
} from "./EventActions";
import { selectBounds } from "../Config/ConfigSelectors";

export function reducer(event, action, fullState) {
  switch (action.type) {
    case SET_EVENT_VARIABLE:
      return updateEvent(event, action, fullState);
    case INCREMENT_EVENT_VARIABLE:
      const setEventVariableAction = transformIncrementToSet(action, event);
      return updateEvent(event, setEventVariableAction, fullState);
    case SELECT_EVENT:
      return { ...event, isSelected: true };
    case DESELECT_EVENT:
      return { ...event, isSelected: false };
    case TRANSLATE_EVENT:
      return translateEvent(action.distanceInUnits, event, fullState);
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

function updateEvent(event, action, fullState) {
  const { eventPart, rangePart, timeInUnits } = action;
  if (isValidVariableUpdate(event[eventPart], rangePart, timeInUnits)) {
    const updatedEvent = performUpdate(event, action);
    if (isValidEvent(updatedEvent, fullState)) {
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

function isValidEvent(event, fullState) {
  return !(
    startsTooLate(event) ||
    endsTooEarly(event) ||
    durationTooShort(event) ||
    isOutsideBounds(event, fullState)
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

function isOutsideBounds(event, fullState) {
  const bounds = selectBounds(fullState);
  return event.end.range.max > bounds.max || event.start.range.min < bounds.min;
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

function translateEvent(distanceInUnits, event, fullState) {
  const newEvent = {
    ...event,
    start: translateVariable(distanceInUnits, event.start),
    end: translateVariable(distanceInUnits, event.end)
  };

  return isOutsideBounds(newEvent, fullState) ? event : newEvent;
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
