import { mapStateToProps } from "./EventsContainer";

describe("mapStateToProps", () => {
  function mockState({ config = {}, constrainedEvents = {} } = {}) {
    return { config, constrainedEvents };
  }

  it("should map out the config property 'pixelsPerUnit'", () => {
    expect(
      mapStateToProps(
        mockState({
          config: { pixelsPerUnit: 2 },
          constrainedEvents: { events: {} }
        })
      ).pixelsPerUnit
    ).toEqual(2);
  });

  it("should transform the constrainedEvents property into an array", () => {
    expect(
      mapStateToProps(
        mockState({
          constrainedEvents: {
            events: { a: { id: "a" }, b: { id: "b" } }
          }
        })
      ).events
    ).toEqual([{ id: "a" }, { id: "b" }]);
  });
});
