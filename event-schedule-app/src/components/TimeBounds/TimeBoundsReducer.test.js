import { reducer } from "./TimeBoundsReducer";
import { setTimeBoundsParam, selectTimeBoundsParam } from "./TimeBoundsActions";

describe("reducer", () => {
  it("should return an empty object if called with undefined state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual(null);
  });

  it("should return the passed-in state if it does not respond to the action", () => {
    expect(reducer({ a: 1 }, { type: "a" })).toEqual({ a: 1 });
  });

  describe("in response to a SET_TIME_BOUNDS_PARAM action", () => {
    it("should set the currently selected param to the 'timeInUnits' of the action", () => {
      expect(
        reducer({ selectedParam: "min" }, setTimeBoundsParam(2)).min
      ).toEqual(2);
    });

    describe("if max is selected and min is set", () => {
      it("should not set the max if it would be less than the min", () => {
        expect(
          reducer({ min: 10, selectedParam: "max" }, setTimeBoundsParam(2)).max
        ).toEqual(undefined);
      });

      it("should change the max if it would be less than the min", () => {
        expect(
          reducer(
            { min: 10, max: 11, selectedParam: "max" },
            setTimeBoundsParam(2)
          ).max
        ).toEqual(11);
      });
    });

    describe("if min is selected and max is set", () => {
      it("should not set the min if it would be more than the min", () => {
        expect(
          reducer({ max: 10, selectedParam: "min" }, setTimeBoundsParam(20)).min
        ).toEqual(undefined);
      });

      it("should change the max if it would be less than the min", () => {
        expect(
          reducer(
            { min: 10, max: 11, selectedParam: "min" },
            setTimeBoundsParam(20)
          ).min
        ).toEqual(10);
      });
    });
  });

  describe("in response to a SELECT_TIME_BOUNDS_PARAM action", () => {
    it("should set 'selectedParam' to the param if it was not defined", () => {
      expect(reducer({}, selectTimeBoundsParam("min")).selectedParam).toEqual(
        "min"
      );
    });

    describe("if the timeBounds state is null", () => {
      it("should return an object with 'selectedParam' set to the param if it was not defined", () => {
        expect(
          reducer(null, selectTimeBoundsParam("min")).selectedParam
        ).toEqual("min");
      });
    });
  });
});
