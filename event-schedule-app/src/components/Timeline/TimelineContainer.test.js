import { mapStateToProps, mapDispatchToProps } from "./TimelineContainer";

describe("mapStateToProps", () => {
  it("should map out a toMinutes function'", () => {
    expect(
      mapStateToProps({ config: { minutesPerUnit: 2 }, timeBounds: {} })
        .toMinutes
    ).toBeDefined();
  });
});
