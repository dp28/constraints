import { buildEvent } from "json-constraints";

import { CREATE_EVENT, UPDATE_SOLUTION } from "./EventsActions";
import { reducer as eventReducer } from "../Event/EventReducer";

export const InitialState = { events: {} };

export function reducer(state = InitialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return addNewEvent(state, action);
    case UPDATE_SOLUTION:
      return updateSolution(state, action.solution);
    default:
      if (action.eventId) {
        return updateEvent(state, action);
      }
      return state;
  }
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
  const event = createEvent();
  return {
    ...state,
    events: { ...state.events, [event.id]: event }
  };
}

function createEvent() {
  const event = buildEvent({ minStart: 10, maxEnd: 40 });
  event.duration.range = { min: 10, max: 100 };
  event.start.range.max = 20;
  event.end.range.min = 30;
  event.isSelected = true;
  event.name = "New event";
  return event;
}

function updateSolution(state, solution) {
  const updatedEvents = addSolutionsToEvents(state.events, solution.events);
  return { ...state, events: updatedEvents };
}

function addSolutionsToEvents(events, solutions) {
  const updatedEvents = {};
  Object.values(events).forEach(event => {
    updatedEvents[event.id] = addSolutionsToVariables(
      event,
      solutions[event.id]
    );
  });
  return updatedEvents;
}

function addSolutionsToVariables(event, solutions) {
  return {
    ...event,
    start: { ...event.start, solution: solutions.start },
    duration: { ...event.duration, solution: solutions.duration },
    end: { ...event.end, solution: solutions.end }
  };
}
