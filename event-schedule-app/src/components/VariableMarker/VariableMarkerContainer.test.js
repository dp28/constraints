import {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from "./VariableMarkerContainer";
import { setEventVariable } from "../ConstrainedEvents/ConstrainedEventsActions";
import { startDragging, stopDragging } from "../Drag/DragActions";

describe("mapStateToProps", () => {
  const state = {
    config: { pixelsPerUnit: 10 },
    constrainedEvents: {
      a: {
        start: { range: { min: 10 } },
        end: { range: { max: 100 } }
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
  it("should return a function to update the event variable", () => {
    let arg = null;
    const dispatch = x => (arg = x);
    mapDispatchToProps(dispatch).setEventVariable("a", "b", "c", 10);
    expect(arg).toEqual(setEventVariable("a", "b", "c", 10));
  });

  it("should return a function to startDragging from an event which is curried with the startUnits", () => {
    let arg = null;
    const dispatch = x => (arg = x);
    mapDispatchToProps(dispatch).startDragging(3)({ clientY: 10 });
    expect(arg).toEqual(startDragging(10, 3));
  });

  it("should return a function to stopDragging from an event", () => {
    let arg = null;
    const dispatch = x => (arg = x);
    mapDispatchToProps(dispatch).stopDragging({ clientY: 10 });
    expect(arg).toEqual(stopDragging(10));
  });
});

describe("mergeProps", () => {
  const pixelsToUnits = pixels => Math.round(pixels / 10);

  describe("#startDragging", () => {
    it("should be bound to the startUnits of the drag state", () => {
      const merged = mergeProps(
        { valueInUnits: 10 },
        { startDragging: x => y => [x, y] }
      );
      expect(merged.startDragging(2)).toEqual([10, 2]);
    });
  });

  describe("#updateVariable", () => {
    it("should call setEventVariable with the new units if the drag has changed them", () => {
      let setEventVariableArgs = null;
      const dispatchProps = {
        startDragging: x => x,
        setEventVariable: (...args) => {
          setEventVariableArgs = args;
        }
      };
      const { updateVariable } = mergeProps(
        { pixelsToUnits, dragStartY: 10, dragStartUnits: 15 },
        dispatchProps,
        { eventId: "a", eventPart: "start", rangePart: "min" }
      );
      const mockEvent = { clientY: 30 };
      updateVariable(mockEvent);
      expect(setEventVariableArgs).toEqual([
        "a",
        "start",
        "min",
        15 + (30 - 10) / 10
      ]);
    });

    it("should not call setEventVariable with the new units if the drag has not changed them", () => {
      let setEventVariableArgs = null;
      const dispatchProps = {
        startDragging: x => x,
        setEventVariable: (...args) => {
          setEventVariableArgs = args;
        }
      };
      const { updateVariable } = mergeProps(
        { pixelsToUnits, dragStartUnits: 15, dragStartY: 10 },
        dispatchProps,
        { eventId: "a", eventPart: "start", rangePart: "min" }
      );
      const mockEvent = { clientY: 14 };
      updateVariable(mockEvent);
      expect(setEventVariableArgs).toEqual(null);
    });
  });
});
