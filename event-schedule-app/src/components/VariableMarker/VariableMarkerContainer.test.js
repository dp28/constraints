import {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from "./VariableMarkerContainer";
import { incrementEventVariable } from "../Event/EventActions";

describe("mapStateToProps", () => {
  const state = {
    config: { pixelsPerUnit: 10 },
    constrainedEvents: {
      events: {
        a: {
          start: { range: { min: 10 } },
          end: { range: { max: 100 } }
        }
      }
    },
    drag: {}
  };

  it("should return the value in time units of the variable", () => {
    const ownProps = { eventId: "a", eventPart: "start", rangePart: "min" };
    expect(mapStateToProps(state, ownProps).valueInUnits).toEqual(10);
  });

  it("should return a function to transfrom pixels to time units", () => {
    const ownProps = { eventId: "a", eventPart: "start", rangePart: "min" };
    expect(mapStateToProps(state, ownProps).pixelsToUnits(10)).toEqual(1);
  });

  it("should return the dragStartY as 0 if drag.startY is not in the state", () => {
    const ownProps = { eventId: "a", eventPart: "start", rangePart: "min" };
    expect(mapStateToProps(state, ownProps).dragStartY).toEqual(0);
  });

  it("should return the dragStartUnits as 0 if drag.startUnits is not in the state", () => {
    const ownProps = { eventId: "a", eventPart: "start", rangePart: "min" };
    expect(mapStateToProps(state, ownProps).dragStartUnits).toEqual(0);
  });

  it("should transform an event start min to 0", () => {
    const ownProps = { eventId: "a", eventPart: "start", rangePart: "min" };
    expect(mapStateToProps(state, ownProps).centre).toEqual(0);
  });

  it("should transform an event end max to the height of the event", () => {
    const ownProps = { eventId: "a", eventPart: "end", rangePart: "max" };
    expect(mapStateToProps(state, ownProps).centre).toEqual(900);
  });
});

describe("mapDispatchToProps", () => {
  it("should return a function to update the event variable from an increment", () => {
    let arg = null;
    const dispatch = x => (arg = x);
    const ownProps = { eventId: "a", eventPart: "b", rangePart: "c" };
    mapDispatchToProps(dispatch, ownProps).updateVariable(10);
    expect(arg).toEqual(incrementEventVariable("a", "b", "c", 10));
  });
});
