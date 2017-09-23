import { mapStateToProps } from "./NewEventContainer";

describe("mapStateToProps", () => {
  function mockState({ config = {}, newEvent = {} } = {}) {
    return { config, newEvent };
  }

  it("should map out the config property 'pixelsPerUnit'", () => {
    expect(
      mapStateToProps(mockState({ config: { pixelsPerUnit: 2 } })).pixelsPerUnit
    ).toEqual(2);
  });

  ["minStart", "minDuration", "maxDuration", "maxEnd"].forEach(property => {
    it(`should map out the newEvent property '${property}'`, () => {
      expect(
        mapStateToProps(mockState({ newEvent: { [property]: 2 } }))[property]
      ).toEqual(2);
    });

    it(`should set '${property}' to 0 if it does not exist on newEvent`, () => {
      expect(mapStateToProps(mockState())[property]).toEqual(0);
    });
  });
});
