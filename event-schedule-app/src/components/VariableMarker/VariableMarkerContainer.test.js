import { mapStateToProps } from "./VariableMarkerContainer";

describe("mapStateToProps", () => {
  const state = {
    config: { pixelsPerUnit: 10 },
    constrainedEvents: { a: { start: { min: 10 }, end: { max: 100 } } }
  };

  it("should transform an event start min to 0", () => {
    const ownProps = { eventId: "a", eventPart: "start", rangePart: "min" };
    expect(mapStateToProps(state, ownProps).centre).toEqual(0);
  });

  it("should transform an event end max to the height of the event", () => {
    const ownProps = { eventId: "a", eventPart: "end", rangePart: "max" };
    expect(mapStateToProps(state, ownProps).centre).toEqual(900);
  });
});
