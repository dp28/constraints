import { mapStateToProps, mapDispatchToProps } from "./TimelineContainer";

describe("mapStateToProps", () => {
  it("should map out a toMinutes function'", () => {
    expect(
      mapStateToProps({ config: { minutesPerUnit: 2, bounds: {} } }).toMinutes
    ).toBeDefined();
  });

  it("should map out a startInUnits from the config.bounds.min'", () => {
    expect(
      mapStateToProps({ config: { bounds: { min: 2 } } }).startInUnits
    ).toEqual(2);
  });

  it("should map out a numberOfUnits from the config.bounds'", () => {
    expect(
      mapStateToProps({ config: { bounds: { min: 2, max: 4 } } }).numberOfUnits
    ).toEqual(4 - 2);
  });
});
