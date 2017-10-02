import { buildEvent } from "json-constraints";

import { reducer } from "./ConstrainedEventsReducer";
import { setEventVariable, createEvent } from "./ConstrainedEventsActions";
import {
  focusEvent,
  blurEvent
} from "../ConstrainedEvent/ConstrainedEventActions";

describe("reducer", () => {
  it("should return an empty event map if called with undefined state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual({
      events: {},
      focused: null
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
      expect(result.focused).toEqual(newEvent.id);
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

  describe("responses to a SET_EVENT_VARIABLE", () => {
    const state = {
      events: {
        b: {},
        a: {
          id: "a",
          start: { range: { min: 10, max: 30 } },
          end: { range: { min: 100, max: 300 } }
        }
      }
    };

    it("should set the specified part of an event", () => {
      expect(
        reducer(state, setEventVariable("a", "start", "min", 20))
      ).toEqual({
        events: {
          b: {},
          a: {
            id: "a",
            start: { range: { min: 20, max: 30 } },
            end: { range: { min: 100, max: 300 } }
          }
        }
      });
    });

    describe("if the rangePart is 'min'", () => {
      it("cannot be set to be larger than the 'max'", () => {
        expect(reducer(state, setEventVariable("a", "start", "min", 31))).toBe(
          state
        );
      });

      it("can be set to be the 'max'", () => {
        expect(
          reducer(state, setEventVariable("a", "start", "min", 30))
        ).toEqual({
          events: {
            b: {},
            a: {
              id: "a",
              start: { range: { min: 30, max: 30 } },
              end: { range: { min: 100, max: 300 } }
            }
          }
        });
      });

      it("can be set to be less than the 'max'", () => {
        expect(
          reducer(state, setEventVariable("a", "start", "min", 0))
        ).toEqual({
          events: {
            b: {},
            a: {
              id: "a",
              start: { range: { min: 0, max: 30 } },
              end: { range: { min: 100, max: 300 } }
            }
          }
        });
      });
    });

    describe("if the rangePart is 'max'", () => {
      it("cannot be set to be less than the 'min'", () => {
        expect(reducer(state, setEventVariable("a", "start", "max", 1))).toBe(
          state
        );
      });

      it("can be set to be the 'min'", () => {
        expect(
          reducer(state, setEventVariable("a", "start", "max", 10))
        ).toEqual({
          events: {
            b: {},
            a: {
              id: "a",
              start: { range: { min: 10, max: 10 } },
              end: { range: { min: 100, max: 300 } }
            }
          }
        });
      });

      it("can be set to be more than the 'min'", () => {
        expect(
          reducer(state, setEventVariable("a", "start", "max", 110))
        ).toEqual({
          events: {
            b: {},
            a: {
              id: "a",
              start: { range: { min: 10, max: 110 } },
              end: { range: { min: 100, max: 300 } }
            }
          }
        });
      });
    });

    describe("if the rangePart is 'min' and the eventPart is 'end'", () => {
      it("cannot be set to be less than the min start", () => {
        expect(reducer(state, setEventVariable("a", "end", "min", 1))).toBe(
          state
        );
      });
    });

    describe("if the rangePart is 'max' and the eventPart is 'start'", () => {
      it("cannot be set to be less than the max end", () => {
        expect(
          reducer(state, setEventVariable("a", "start", "max", 1000))
        ).toBe(state);
      });
    });
  });

  describe("in response to a FOCUS_EVENT action", () => {
    it("should set the 'focused' property in the state to the id in the action", () => {
      expect(reducer({ focused: null }, focusEvent("a")).focused).toEqual("a");
    });
  });

  describe("in response to a BLUR_EVENT action", () => {
    it("should set the 'focused' property in the state to null", () => {
      expect(reducer({ focused: "a" }, blurEvent("a")).focused).toEqual(null);
    });
  });
});
