import { mapStateToProps } from "./ConstrainedEventsContainer";

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

  it("should transform the constrainedEvents property into an array with the correct one focused", () => {
    expect(
      mapStateToProps(
        mockState({
          constrainedEvents: {
            events: { a: { id: "a" }, b: { id: "b" } },
            focused: "a"
          }
        })
      ).events
    ).toEqual([{ id: "a", isFocused: true }, { id: "b", isFocused: false }]);
  });
});
