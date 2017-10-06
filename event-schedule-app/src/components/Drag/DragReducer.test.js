import { reducer } from "./DragReducer";
import { startDragging, stopDragging } from "./DragActions";

describe("reducer", () => {
  it("should return null for startPixels if no state is given", () => {
    expect(reducer(undefined, { type: "a" })).toEqual({
      startPixels: null,
      startUnits: null
    });
  });

  it("should return the passed-in state for unknown actions", () => {
    expect(reducer({ a: 1 }, { type: "anything" })).toEqual({ a: 1 });
  });

  it("should set startPixels to the passed startPixels for START_DRAGGING actions", () => {
    expect(
      reducer({ startPixels: null, startUnits: null }, startDragging(10, 3))
    ).toEqual({
      startPixels: 10,
      startUnits: 3
    });
  });

  it("should set startPixels & startUnits to null for STOP_DRAGGING actions", () => {
    expect(
      reducer({ startPixels: 10, startUnits: 3 }, stopDragging(10))
    ).toEqual({
      startPixels: null,
      startUnits: null
    });
  });
});
