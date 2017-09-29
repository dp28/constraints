import { mapStateToProps } from "./TimelineItemContainer";

describe("mapStateToProps", () => {
  const state = { config: { pixelsPerUnit: 3 } };

  it("should convert the ownProps start property to pixels", () => {
    expect(mapStateToProps(state, { start: 10, end: 20 }).start).toEqual(
      "30px"
    );
  });

  it("should calculate a height in pixels from the start and end properties", () => {
    expect(mapStateToProps(state, { start: 10, end: 25 }).height).toEqual(
      "45px"
    );
  });
});
