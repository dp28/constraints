import { buildEvent } from "json-constraints";

import { SET_EVENT_VARIABLE, CREATE_EVENT } from "./ConstrainedEventsActions";

export const InitialState = { events: {}, focused: null };

export function reducer(state = InitialState, action) {
  switch (action.type) {
    case SET_EVENT_VARIABLE:
      return updateEvent(state, action);
    case CREATE_EVENT:
      return addNewEvent(state, action);
    default:
      return state;
  }
}

function updateEvent(state, action) {
  const { events } = state;
  const { eventId, eventPart, rangePart, timeInUnits } = action;
  const event = events[eventId];
  if (isValidUpdate(event, action)) {
    const eventVariable = event[eventPart];
    const updatedRange = { ...eventVariable.range, [rangePart]: timeInUnits };
    const updatedEventVariable = { ...eventVariable, range: updatedRange };
    const updatedEvent = { ...event, [eventPart]: updatedEventVariable };
    return { ...state, events: { ...events, [eventId]: updatedEvent } };
  }
  return state;
}

function addNewEvent(state, action) {
  const event = buildEvent(action);
  return {
    ...state,
    focused: event.id,
    events: {
      ...state.events,
      [event.id]: event
    }
  };
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
