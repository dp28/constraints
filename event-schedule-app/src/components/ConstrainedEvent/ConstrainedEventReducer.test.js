import { reducer } from "./ConstrainedEventReducer";
import {
  setEventVariable,
  focusEvent,
  blurEvent
} from "./ConstrainedEventActions";

describe("reducer", () => {
  it("should return undefined if called with undefined state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual(undefined);
  });

  it("should return the passed-in state if it does not respond to the action", () => {
    expect(reducer({}, { type: "a" })).toEqual({});
  });

  describe("responses to a SET_EVENT_VARIABLE", () => {
    const event = {
      id: "a",
      start: { range: { min: 10, max: 30 }, solution: 1 },
      duration: { range: { min: 0, max: 100 }, solution: 1 },
      end: { range: { min: 100, max: 300 }, solution: 1 }
    };

    it("should set the specified part of the event", () => {
      const action = setEventVariable("a", "start", "min", 20);
      expect(reducer(event, action).start.range.min).toEqual(20);
    });

    it("should null off all of the 'solution' properties", () => {
      const action = setEventVariable("a", "start", "min", 20);
      expect(reducer(event, action)).toEqual({
        id: "a",
        start: { range: { min: 20, max: 30 }, solution: null },
        duration: { range: { min: 0, max: 100 }, solution: null },
        end: { range: { min: 100, max: 300 }, solution: null }
      });
    });

    describe("if the rangePart is 'min'", () => {
      const action = setEventVariable("a", "start", "min", 31);
      it("cannot be set to be larger than the 'max'", () => {
        expect(reducer(event, action)).toBe(event);
      });

      it("can be set to be the 'max'", () => {
        const action = setEventVariable("a", "start", "min", 30);
        expect(reducer(event, action).start.range.min).toEqual(30);
      });

      it("can be set to be less than the 'max'", () => {
        const action = setEventVariable("a", "start", "min", 0);
        expect(reducer(event, action).start.range.min).toEqual(0);
      });
    });

    describe("if the rangePart is 'max'", () => {
      it("cannot be set to be less than the 'min'", () => {
        const action = setEventVariable("a", "start", "max", 1);
        expect(reducer(event, action)).toBe(event);
      });

      it("can be set to be the 'min'", () => {
        const action = setEventVariable("a", "start", "max", 10);
        expect(reducer(event, action).start.range.min).toEqual(10);
      });

      it("can be set to be more than the 'min'", () => {
        const action = setEventVariable("a", "start", "max", 110);
        expect(reducer(event, action).start.range.max).toEqual(110);
      });
    });

    describe("if the rangePart is 'min' and the eventPart is 'end'", () => {
      it("cannot be set to be less than the min start", () => {
        expect(reducer(event, setEventVariable("a", "end", "min", 1))).toBe(
          event
        );
      });
    });

    describe("if the rangePart is 'max' and the eventPart is 'start'", () => {
      it("cannot be set to be less than the max end", () => {
        const action = setEventVariable("a", "start", "max", 1000);
        expect(reducer(event, action)).toBe(event);
      });
    });
  });

  describe("in response to a FOCUS_EVENT action", () => {
    it("should set the 'isFocused' property in the event to true", () => {
      expect(reducer({}, focusEvent("a")).isFocused).toEqual(true);
    });
  });

  describe("in response to a BLUR_EVENT action", () => {
    it("should set the 'isFocused' property in the event to false", () => {
      expect(reducer({ isFocused: true }, blurEvent("a")).isFocused).toEqual(
        false
      );
    });
  });
});
