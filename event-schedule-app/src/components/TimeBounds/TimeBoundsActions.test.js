import {
  setTimeBoundsParam,
  selectTimeBoundsParam,
  SET_TIME_BOUNDS_PARAM,
  SELECT_TIME_BOUNDS_PARAM
} from "./TimeBoundsActions";

describe("setTimeBoundsParam", () => {
  it("should return a SET_TIME_BOUNDS_PARAM action", () => {
    expect(setTimeBoundsParam().type).toEqual(SET_TIME_BOUNDS_PARAM);
  });

  it("should return an action with the passed in timeInUnits", () => {
    expect(setTimeBoundsParam(10).timeInUnits).toEqual(10);
  });
});

describe("selectTimeBoundsParam", () => {
  it("should return a SELECT_TIME_BOUNDS_PARAM action", () => {
    expect(selectTimeBoundsParam().type).toEqual(SELECT_TIME_BOUNDS_PARAM);
  });

  it("should return an action with a param name", () => {
    expect(selectTimeBoundsParam("min").param).toEqual("min");
  });
});
