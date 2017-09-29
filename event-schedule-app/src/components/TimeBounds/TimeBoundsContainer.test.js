import { mapStateToProps } from "./TimeBoundsContainer";

describe("mapStateToProps", () => {
  function mockState({ timeBounds = {} } = {}) {
    return { timeBounds };
  }

  ["min", "max"].forEach(property => {
    it(`should map out the timeBounds property '${property}'`, () => {
      expect(
        mapStateToProps(mockState({ timeBounds: { [property]: 2 } }))[property]
      ).toEqual(2);
    });

    it(`should set '${property}' to 0 if it does not exist on timeBounds`, () => {
      expect(mapStateToProps(mockState())[property]).toEqual(0);
    });

    it(`should set '${property}' to 0 if timeBounds is null`, () => {
      expect(
        mapStateToProps(mockState({ timeBounds: null }))[property]
      ).toEqual(0);
    });
  });
});
