import { selectOffset } from "./DragSelectors";

describe("selectOffset", () => {
  it("should return the difference in pixels betwen the drag.startPixels and the drag.startUnits", () => {
    const state = {
      config: { pixelsPerUnit: 5 },
      drag: { startUnits: 3, startPixels: 20 }
    };

    expect(selectOffset(state)).toEqual(20 - 3 * 5);
  });
});
