import {
  SET_EVENT_VARIABLE,
  FOCUS_EVENT,
  BLUR_EVENT
} from "./ConstrainedEventActions";

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
  if (isValidUpdate(event, action)) {
    const eventVariable = event[eventPart];
    const updatedRange = { ...eventVariable.range, [rangePart]: timeInUnits };
    const updatedEventVariable = { ...eventVariable, range: updatedRange };
    return { ...event, [eventPart]: updatedEventVariable };
  }
  return event;
}

function isValidUpdate(event, action) {
  const { eventPart, rangePart, timeInUnits } = action;
  return (
    isValidVariableUpdate(event[eventPart], rangePart, timeInUnits) &&
    !(willStartTooLate(event, action) || willEndTooEarly(event, action))
  );
}

function willStartTooLate(event, { eventPart, rangePart, timeInUnits }) {
  return (
    eventPart === "start" &&
    rangePart === "max" &&
    event.end.range.max < timeInUnits
  );
}

function willEndTooEarly(event, { eventPart, rangePart, timeInUnits }) {
  return (
    eventPart === "end" &&
    rangePart === "min" &&
    event.start.range.min > timeInUnits
  );
}

function isValidVariableUpdate(variable, param, value) {
  return (
    (param === "min" && variable.range.max >= value) ||
    (param === "max" && variable.range.min <= value)
  );
}
