import { timelineItemClicked, TIMELINE_ITEM_CLICKED } from "./TimelineActions";

describe("timelineItemClicked", () => {
  it("should be of type 'TIMELINE_ITEM_CLICKED'", () => {
    expect(timelineItemClicked(1).type).toEqual(TIMELINE_ITEM_CLICKED);
  });

  it("should use the argument as the time", () => {
    expect(timelineItemClicked(1).timeInUnits).toEqual(1);
  });
});
