import { buildEvent } from "json-constraints";

import { CREATE_EVENT } from "./ConstrainedEventsActions";
import { reducer as eventReducer } from "../ConstrainedEvent/ConstrainedEventReducer";

export const InitialState = { events: {} };

export function reducer(state = InitialState, action) {
  if (action.type === CREATE_EVENT) {
    return addNewEvent(state, action);
  }
  if (action.eventId) {
    return updateEvent(state, action);
  }
  return state;
}

function updateEvent(state, action) {
  const { events } = state;
  const { eventId } = action;
  const updatedEvent = eventReducer(events[eventId], action);
  if (updatedEvent === events[eventId]) {
    return state;
  }

  const updatedEvents = { ...events, [eventId]: updatedEvent };
  return { ...state, events: updatedEvents };
}

function addNewEvent(state, action) {
  const event = buildEvent(action);
  event.isFocused = true;
  return {
    ...state,
    events: { ...state.events, [event.id]: event }
  };
}
