import { reducer } from "./ConfigReducer";

describe("reducer", () => {
  it("should return the defaults for minutesPerUnit and pixelsPerUnit if no state is given", () => {
    expect(reducer(undefined, { type: "a" })).toEqual({
      minutesPerUnit: 15,
      pixelsPerUnit: 5,
      bounds: { min: 0, max: 24 * (60 / 15) }
    });
  });

  it("should always return the passed-in state", () => {
    expect(reducer({ a: 1 }, { type: "anything" })).toEqual({ a: 1 });
  });
});
