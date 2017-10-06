import { mapStateToProps, mapDispatchToProps } from "./EventContainer";
import { selectEvent, deselectEvent, translateEvent } from "./EventActions";

describe("mapStateToProps", () => {
  describe("if the event is focused", () => {
    const event = {
      isFocused: true,
      start: { range: { min: 1 } },
      end: { range: { max: 10 } }
    };

    it("should use the event's end.range.max as its end", () => {
      expect(mapStateToProps({}, { event }).end).toEqual(10);
    });

    it("should use the event's start.range.min as its start", () => {
      expect(mapStateToProps({}, { event }).start).toEqual(1);
    });
  });

  describe("if the event is not focused", () => {
    describe("but it does not have solved variables", () => {
      const event = {
        isFocused: false,
        start: { range: { min: 1 } },
        end: { range: { max: 10 } }
      };

      it("should use the event's end.range.max as its end", () => {
        expect(mapStateToProps({}, { event }).end).toEqual(10);
      });

      it("should use the event's start.range.min as its start", () => {
        expect(mapStateToProps({}, { event }).start).toEqual(1);
      });
    });

    describe("and it does have solved variables", () => {
      const event = {
        isFocused: false,
        start: {
          range: { min: 1 },
          solution: 5
        },
        end: {
          range: { max: 10 },
          solution: 9
        }
      };

      it("should use the event's end.solution as its end", () => {
        expect(mapStateToProps({}, { event }).end).toEqual(9);
      });

      it("should use the event's start.solution as its start", () => {
        expect(mapStateToProps({}, { event }).start).toEqual(5);
      });
    });
  });
});

describe("mapDispatchToProps", () => {
  it("should return a focus function that dispatches a SELECT_EVENT action with the correct id", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).focus();
    expect(dispatchArgs).toEqual([selectEvent("a")]);
  });

  it("should return a blur function that dispatches a DESELECT_EVENT action with the correct id", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).blur();
    expect(dispatchArgs).toEqual([deselectEvent("a")]);
  });

  it("should return an onDrag function that dispatched a TRANSLATE_EVENT action", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).translate(1);
    expect(dispatchArgs).toEqual([translateEvent("a", 1)]);
  });
});
