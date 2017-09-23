import { mapStateToProps, mapDispatchToProps } from "./TimelineContainer";
import { TIMELINE_ITEM_CLICKED } from "./TimelineActions";

describe("mapStateToProps", () => {
  it("should map out a toMinutes function'", () => {
    expect(
      mapStateToProps({ config: { minutesPerUnit: 2 } }).toMinutes
    ).toBeDefined();
  });

  it("should map out the config property 'pixelsPerUnit'", () => {
    expect(
      mapStateToProps({ config: { pixelsPerUnit: 2 } }).pixelsPerUnit
    ).toEqual(2);
  });
});

describe("mapDispatchToProps", () => {
  it("should bind a 'TIMELINE_ITEM_CLICKED' action creator", () => {
    const dispatch = action => ({ action });
    expect(mapDispatchToProps(dispatch).timeClicked(1)().action.type).toEqual(
      TIMELINE_ITEM_CLICKED
    );
  });
});
