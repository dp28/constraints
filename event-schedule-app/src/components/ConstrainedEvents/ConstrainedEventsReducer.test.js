import { buildEvent } from "json-constraints";

import { reducer } from "./ConstrainedEventsReducer";
import { createEvent } from "./ConstrainedEventsActions";
import { reducer as eventReducer } from "../ConstrainedEvent/ConstrainedEventReducer";
import { blurEvent } from "../ConstrainedEvent/ConstrainedEventActions";

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
        const expected = buildEvent({ minStart: 10, maxEnd: 20 });
        expect(newEvent).toMatchObject({
          start: { range: { min: 10, max: 20 } },
          duration: { range: { min: 0, max: 10 } },
          end: { range: { min: 10, max: 20 } }
        });
      });
    });
  });

  describe("in response to actions with an eventId property", () => {
    it("should delegate to the ConstrainedEventReducer to update the specified event", () => {
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

      const action = blurEvent("a");

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
