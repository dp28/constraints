import { reducer } from "./EventReducer";
import { setEventVariable, focusEvent, blurEvent } from "./EventActions";

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
      duration: { range: { min: 5, max: 500 }, solution: 1 },
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
        duration: { range: { min: 5, max: 500 }, solution: null },
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
        const action = setEventVariable("a", "start", "max", 80);
        expect(reducer(event, action).start.range.max).toEqual(80);
      });
    });

    describe("if the eventPart is 'end'", () => {
      describe("if the rangePart is 'min'", () => {
        it("cannot be set to be less than the min start", () => {
          expect(reducer(event, setEventVariable("a", "end", "min", 1))).toBe(
            event
          );
        });

        it("cannot be set to less than the max start plus the min duration", () => {
          expect(reducer(event, setEventVariable("a", "end", "min", 23))).toBe(
            event
          );
        });
      });

      describe("if the rangePart is 'max'", () => {
        it("cannot be set to less than the min start plus the max duration", () => {
          const action = setEventVariable("a", "end", "max", 1000);
          expect(reducer(event, action)).toBe(event);
        });
      });
    });

    describe("if the eventPart is 'start'", () => {
      describe("if the rangePart is 'max'", () => {
        it("cannot be set to be less than the max end", () => {
          const action = setEventVariable("a", "start", "max", 1000);
          expect(reducer(event, action)).toBe(event);
        });

        it("cannot be set to more than the min end minus the min duration", () => {
          const action = setEventVariable("a", "start", "max", 98);
          expect(reducer(event, action)).toBe(event);
        });
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