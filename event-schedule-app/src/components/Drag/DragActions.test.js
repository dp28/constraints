import {
  startDragging,
  stopDragging,
  START_DRAGGING,
  STOP_DRAGGING
} from "./DragActions";

describe("startDragging", () => {
  it("should return a START_DRAGGING action", () => {
    expect(startDragging(10).type).toEqual(START_DRAGGING);
  });

  it("should return the passed-in start pixels as startY", () => {
    expect(startDragging(10).startY).toEqual(10);
  });

  it("should return the passed-in start units as startUnits", () => {
    expect(startDragging(10, 3).startUnits).toEqual(3);
  });
});

describe("stopDragging", () => {
  it("should return a START_DRAGGING action", () => {
    expect(stopDragging(10).type).toEqual(STOP_DRAGGING);
  });

  it("should return the passed-in number as endY", () => {
    expect(stopDragging(10).endY).toEqual(10);
  });
});
