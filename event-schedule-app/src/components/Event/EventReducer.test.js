import { reducer } from "./EventReducer";
import {
  setEventVariable,
  incrementEventVariable,
  selectEvent,
  deselectEvent,
  translateEvent,
  setEventName
} from "./EventActions";

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

    const fullState = { config: { bounds: { min: 0, max: 325 } } };

    it("should set the specified part of the event", () => {
      const action = setEventVariable("a", "start", "min", 20);
      expect(reducer(event, action, fullState).start.range.min).toEqual(20);
    });

    it("should null off all of the 'solution' properties", () => {
      const action = setEventVariable("a", "start", "min", 20);
      expect(reducer(event, action, fullState)).toEqual({
        id: "a",
        start: { range: { min: 20, max: 30 }, solution: null },
        duration: { range: { min: 5, max: 500 }, solution: null },
        end: { range: { min: 100, max: 300 }, solution: null }
      });
    });

    describe("if the rangePart is 'min'", () => {
      const action = setEventVariable("a", "start", "min", 31);
      it("cannot be set to be larger than the 'max'", () => {
        expect(reducer(event, action, fullState)).toBe(event);
      });

      it("can be set to be the 'max'", () => {
        const action = setEventVariable("a", "start", "min", 30);
        expect(reducer(event, action, fullState).start.range.min).toEqual(30);
      });

      it("can be set to be less than the 'max'", () => {
        const action = setEventVariable("a", "start", "min", 0);
        expect(reducer(event, action, fullState).start.range.min).toEqual(0);
      });
    });

    describe("if the rangePart is 'max'", () => {
      it("cannot be set to be less than the 'min'", () => {
        const action = setEventVariable("a", "start", "max", 1);
        expect(reducer(event, action, fullState)).toBe(event);
      });

      it("can be set to be the 'min'", () => {
        const action = setEventVariable("a", "start", "max", 10);
        expect(reducer(event, action, fullState).start.range.min).toEqual(10);
      });

      it("can be set to be more than the 'min'", () => {
        const action = setEventVariable("a", "start", "max", 80);
        expect(reducer(event, action, fullState).start.range.max).toEqual(80);
      });
    });

    describe("if the eventPart is 'end'", () => {
      describe("if the rangePart is 'min'", () => {
        it("cannot be set to be less than the min start", () => {
          const action = setEventVariable("a", "end", "min", 1);
          expect(reducer(event, action, fullState)).toBe(event);
        });

        it("cannot be set to less than the max start plus the min duration", () => {
          const action = setEventVariable("a", "end", "min", 23);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });

      describe("if the rangePart is 'max'", () => {
        it("cannot be set to more than the min start plus the max duration", () => {
          const action = setEventVariable("a", "end", "max", 1000);
          expect(reducer(event, action, fullState)).toBe(event);
        });

        it("cannot be set to more than the max in the bounds in the config", () => {
          const action = setEventVariable("a", "end", "max", 350);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });
    });

    describe("if the eventPart is 'start'", () => {
      describe("if the rangePart is 'max'", () => {
        it("cannot be set to be more than the max end", () => {
          const action = setEventVariable("a", "start", "max", 1000);
          expect(reducer(event, action, fullState)).toBe(event);
        });

        it("cannot be set to more than the min end minus the min duration", () => {
          const action = setEventVariable("a", "start", "max", 98);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });

      describe("if the rangePart is 'min'", () => {
        it("cannot be set to be less than the min in the bounds in the config", () => {
          const action = setEventVariable("a", "start", "min", -1);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });
    });
  });

  describe("in response to a SELECT_EVENT action", () => {
    it("should set the 'isSelected' property in the event to true", () => {
      expect(reducer({}, selectEvent("a")).isSelected).toEqual(true);
    });
  });

  describe("in response to a DESELECT_EVENT action", () => {
    it("should set the 'isSelected' property in the event to false", () => {
      expect(
        reducer({ isSelected: true }, deselectEvent("a")).isSelected
      ).toEqual(false);
    });
  });

  describe("in response to a SET_EVENT_NAME action", () => {
    it("should set the 'name' property in the event to the name in the action", () => {
      expect(reducer({ name: "x" }, setEventName("a", "bla")).name).toEqual(
        "bla"
      );
    });
  });

  describe("responses to a INCREMENT_EVENT_VARIABLE", () => {
    const event = {
      id: "a",
      start: { range: { min: 10, max: 30 }, solution: 1 },
      duration: { range: { min: 5, max: 500 }, solution: 1 },
      end: { range: { min: 100, max: 300 }, solution: 1 }
    };

    const fullState = { config: { bounds: { min: 0, max: 325 } } };

    it("should add the value to the specified part of the event", () => {
      const action = incrementEventVariable("a", "start", "min", 20);
      expect(reducer(event, action, fullState).start.range.min).toEqual(30);
    });

    it("should null off all of the 'solution' properties", () => {
      const action = incrementEventVariable("a", "start", "min", 20);
      expect(reducer(event, action, fullState)).toEqual({
        id: "a",
        start: { range: { min: 30, max: 30 }, solution: null },
        duration: { range: { min: 5, max: 500 }, solution: null },
        end: { range: { min: 100, max: 300 }, solution: null }
      });
    });

    describe("if the rangePart is 'min'", () => {
      const action = incrementEventVariable("a", "start", "min", 21);
      it("cannot be changed to be larger than the 'max'", () => {
        expect(reducer(event, action, fullState)).toBe(event);
      });

      it("can be changed to be the 'max'", () => {
        const action = incrementEventVariable("a", "start", "min", 20);
        expect(reducer(event, action, fullState).start.range.min).toEqual(30);
      });

      it("can be changed to be less than the 'max'", () => {
        const action = incrementEventVariable("a", "start", "min", -10);
        expect(reducer(event, action, fullState).start.range.min).toEqual(0);
      });
    });

    describe("if the rangePart is 'max'", () => {
      it("cannot be changed to be less than the 'min'", () => {
        const action = incrementEventVariable("a", "start", "max", -29);
        expect(reducer(event, action, fullState)).toBe(event);
      });

      it("can be changed to be the 'min'", () => {
        const action = incrementEventVariable("a", "start", "max", -20);
        expect(reducer(event, action, fullState).start.range.min).toEqual(10);
      });

      it("can be changed to be more than the 'min'", () => {
        const action = incrementEventVariable("a", "start", "max", 50);
        expect(reducer(event, action, fullState).start.range.max).toEqual(80);
      });
    });

    describe("if the eventPart is 'end'", () => {
      describe("if the rangePart is 'min'", () => {
        it("cannot be changed to be less than the min start", () => {
          const action = incrementEventVariable("a", "end", "min", -299);
          expect(reducer(event, action, fullState)).toBe(event);
        });

        it("cannot be changed to less than the max start plus the min duration", () => {
          const action = incrementEventVariable("a", "end", "min", -277);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });

      describe("if the rangePart is 'max'", () => {
        it("cannot be changed to more than the min start plus the max duration", () => {
          const action = incrementEventVariable("a", "end", "max", 1000);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });
    });

    describe("if the eventPart is 'start'", () => {
      describe("if the rangePart is 'max'", () => {
        it("cannot be changed to be more than the max end", () => {
          const action = incrementEventVariable("a", "start", "max", 1000);
          expect(reducer(event, action, fullState)).toBe(event);
        });

        it("cannot be changed to more than the min end minus the min duration", () => {
          const action = incrementEventVariable("a", "start", "max", 68);
          expect(reducer(event, action, fullState)).toBe(event);
        });
      });
    });
  });

  describe("in response to a TRANSLATE_EVENT action", () => {
    const event = {
      id: "a",
      start: { range: { min: 10, max: 20 } },
      duration: { range: { min: 0, max: 20 } },
      end: { range: { min: 10, max: 20 } }
    };
    const fullState = { config: { bounds: { min: 0, max: 100 } } };
    const action = translateEvent("a", 10);

    it("should add the distanceInUnits to all of the event's start range parts", () => {
      expect(reducer(event, action, fullState).start).toEqual({
        range: { min: 20, max: 30 }
      });
    });

    it("should add the distanceInUnits to all of the event's end range parts", () => {
      expect(reducer(event, action, fullState).end).toEqual({
        range: { min: 20, max: 30 }
      });
    });

    it("should not change the event's duration", () => {
      expect(reducer(event, action, fullState).duration).toBe(event.duration);
    });

    it("should not be possible to move the event to before the start of the bounds", () => {
      const invalidAction = translateEvent("a", -100);
      expect(reducer(event, invalidAction, fullState)).toBe(event);
    });

    it("should not be possible to move the event to after the end of the bounds", () => {
      const invalidAction = translateEvent("a", 1000);
      expect(reducer(event, invalidAction, fullState)).toBe(event);
    });
  });
});
