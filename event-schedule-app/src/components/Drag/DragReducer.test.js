import { reducer } from "./DragReducer";
import { startDragging, stopDragging } from "./DragActions";

describe("reducer", () => {
  it("should return null for startY if no state is given", () => {
    expect(reducer(undefined, { type: "a" })).toEqual({
      startY: null,
      startUnits: null
    });
  });

  it("should return the passed-in state for unknown actions", () => {
    expect(reducer({ a: 1 }, { type: "anything" })).toEqual({ a: 1 });
  });

  it("should set startY to the passed startY for START_DRAGGING actions", () => {
    expect(
      reducer({ startY: null, startUnits: null }, startDragging(10, 3))
    ).toEqual({
      startY: 10,
      startUnits: 3
    });
  });

  it("should set startY & startUnits to null for STOP_DRAGGING actions", () => {
    expect(reducer({ startY: 10, startUnits: 3 }, stopDragging(10))).toEqual({
      startY: null,
      startUnits: null
    });
  });
});
