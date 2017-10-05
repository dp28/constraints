import { buildEvent } from "json-constraints";

import { reducer } from "./EventsReducer";
import { createEvent, updateSolution } from "./EventsActions";
import { reducer as eventReducer } from "../Event/EventReducer";
import { deselectEvent } from "../Event/EventActions";

describe("reducer", () => {
  it("should return an empty event map if called with undefined state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual({
      events: {}
    });
  });

  it("should return the passed-in state if it does not respond to the action", () => {
    expect(reducer({}, { type: "a" })).toEqual({});
  });

  describe("in response to a CREATE_EVENT", () => {
    const action = createEvent(10, 20);
    const result = reducer({}, action);
    const newEvent = Object.values(result.events)[0];

    it("should add a new event", () => {
      expect(Object.values(result.events).length).toEqual(1);
    });

    it("should map to the new event by its id", () => {
      expect(result.events[newEvent.id]).toEqual(newEvent);
    });

    it("should focus on the new event", () => {
      expect(newEvent.isFocused).toEqual(true);
    });

    describe("the created event", () => {
      it("should return an event created using the json-constraint buildEvent function", () => {
        const expected = buildEvent({});
        expect(newEvent).toMatchObject({
          start: { range: { min: 10, max: 20 } },
          duration: { range: { min: 10, max: 100 } },
          end: { range: { min: 30, max: 40 } }
        });
      });
    });
  });

  describe("in response to an UPDATE_SOLUTION action", () => {
    it("should set the 'solution' properties of all event variables to the value in the solution", () => {
      const state = {
        events: {
          a: {
            id: "a",
            start: {
              range: { min: 1, max: 10 }
            },
            end: {
              range: { min: 1, max: 10 }
            },
            duration: {
              range: { min: 1, max: 10 }
            }
          }
        }
      };

      const solution = {
        events: {
          a: {
            start: 1,
            end: 10,
            duration: 9
          }
        }
      };

      expect(reducer(state, updateSolution(solution))).toEqual({
        events: {
          a: {
            id: "a",
            start: {
              range: { min: 1, max: 10 },
              solution: 1
            },
            end: {
              range: { min: 1, max: 10 },
              solution: 10
            },
            duration: {
              range: { min: 1, max: 10 },
              solution: 9
            }
          }
        }
      });
    });
  });

  describe("in response to actions with an eventId property", () => {
    it("should delegate to the EventReducer to update the specified event", () => {
      const state = {
        events: {
          a: {
            id: "a"
          },
          b: {
            id: "b"
          }
        }
      };

      const action = deselectEvent("a");

      expect(reducer(state, action)).toEqual({
        events: {
          a: eventReducer({ id: "a" }, action),
          b: {
            id: "b"
          }
        }
      });
    });

    it("should return exactly the same state object if the action doesn't update the event", () => {
      const state = {
        events: {
          a: {
            id: "a"
          },
          b: {
            id: "b"
          }
        }
      };

      expect(reducer(state, { eventId: "a" })).toBe(state);
    });
  });
});
