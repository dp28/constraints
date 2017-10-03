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
      start: { range: { min: 10, max: 30 } },
      end: { range: { min: 100, max: 300 } }
    };

    it("should set the specified part of the event", () => {
      expect(
        reducer(event, setEventVariable("a", "start", "min", 20))
      ).toEqual({
        id: "a",
        start: { range: { min: 20, max: 30 } },
        end: { range: { min: 100, max: 300 } }
      });
    });

    describe("if the rangePart is 'min'", () => {
      it("cannot be set to be larger than the 'max'", () => {
        expect(reducer(event, setEventVariable("a", "start", "min", 31))).toBe(
          event
        );
      });

      it("can be set to be the 'max'", () => {
        expect(
          reducer(event, setEventVariable("a", "start", "min", 30))
        ).toEqual({
          id: "a",
          start: { range: { min: 30, max: 30 } },
          end: { range: { min: 100, max: 300 } }
        });
      });

      it("can be set to be less than the 'max'", () => {
        expect(
          reducer(event, setEventVariable("a", "start", "min", 0))
        ).toEqual({
          id: "a",
          start: { range: { min: 0, max: 30 } },
          end: { range: { min: 100, max: 300 } }
        });
      });
    });

    describe("if the rangePart is 'max'", () => {
      it("cannot be set to be less than the 'min'", () => {
        expect(reducer(event, setEventVariable("a", "start", "max", 1))).toBe(
          event
        );
      });

      it("can be set to be the 'min'", () => {
        expect(
          reducer(event, setEventVariable("a", "start", "max", 10))
        ).toEqual({
          id: "a",
          start: { range: { min: 10, max: 10 } },
          end: { range: { min: 100, max: 300 } }
        });
      });

      it("can be set to be more than the 'min'", () => {
        expect(
          reducer(event, setEventVariable("a", "start", "max", 110))
        ).toEqual({
          id: "a",
          start: { range: { min: 10, max: 110 } },
          end: { range: { min: 100, max: 300 } }
        });
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
        expect(
          reducer(event, setEventVariable("a", "start", "max", 1000))
        ).toBe(event);
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
