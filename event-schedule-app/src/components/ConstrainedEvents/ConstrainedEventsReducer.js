import generateId from "cuid";

import { SET_EVENT_VARIABLE } from "./ConstrainedEventsActions";

const DefaultEventId = generateId();

export const InitialState = {
  [DefaultEventId]: {
    id: DefaultEventId,
    start: { min: 10, max: 20 },
    duration: { min: 10, max: 20 },
    end: { min: 30, max: 40 }
  }
};

export function reducer(events = InitialState, action) {
  switch (action.type) {
    case SET_EVENT_VARIABLE:
      return updateEvent(events, action);
    default:
      return events;
  }
}

function updateEvent(events, action) {
  const { eventId, eventPart, rangePart, timeInUnits } = action;
  const event = events[eventId];
  if (isValidUpdate(event, action)) {
    const eventVariable = event[eventPart];
    const updatedEventVariable = { ...eventVariable, [rangePart]: timeInUnits };
    const updatedEvent = { ...event, [eventPart]: updatedEventVariable };
    return { ...events, [eventId]: updatedEvent };
  }
  return events;
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
    eventPart === "start" && rangePart === "max" && event.end.max < timeInUnits
  );
}

function willEndTooEarly(event, { eventPart, rangePart, timeInUnits }) {
  return (
    eventPart === "end" && rangePart === "min" && event.start.min > timeInUnits
  );
}

function isValidVariableUpdate(variable, param, value) {
  return (
    (param === "min" && variable.max >= value) ||
    (param === "max" && variable.min <= value)
  );
}
