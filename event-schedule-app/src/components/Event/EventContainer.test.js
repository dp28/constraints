import { mapStateToProps, mapDispatchToProps } from "./EventContainer";
import { selectEvent, translateEvent } from "./EventActions";

describe("mapStateToProps", () => {
  const state = { config: { bounds: { min: 0, max: 100 } } };

  describe("if the event is selected", () => {
    const event = {
      isSelected: true,
      start: { range: { min: 2 } },
      end: { range: { max: 10 } }
    };

    it("should use the event's end.range.max as its end", () => {
      expect(mapStateToProps(state, { event }).end).toEqual(10);
    });

    it("should use the event's start.range.min as its start", () => {
      expect(mapStateToProps(state, { event }).start).toEqual(2);
    });

    it("should have a zIndex equal to 50 plus its ratio through the bounds times 50", () => {
      expect(mapStateToProps(state, { event }).zIndex).toEqual(51);
    });
  });

  describe("if the event is not selected", () => {
    describe("but it does not have solved variables", () => {
      const event = {
        isSelected: false,
        start: { range: { min: 2 } },
        end: { range: { max: 10 } }
      };

      it("should use the event's end.range.max as its end", () => {
        expect(mapStateToProps(state, { event }).end).toEqual(10);
      });

      it("should use the event's start.range.min as its start", () => {
        expect(mapStateToProps(state, { event }).start).toEqual(2);
      });

      it("should have a zIndex equal its ratio through the bounds times 50", () => {
        expect(mapStateToProps(state, { event }).zIndex).toEqual(1);
      });
    });

    describe("and it does have solved variables", () => {
      const event = {
        isSelected: false,
        start: {
          range: { min: 1 },
          solution: 6
        },
        end: {
          range: { max: 10 },
          solution: 9
        }
      };

      it("should use the event's end.solution as its end", () => {
        expect(mapStateToProps(state, { event }).end).toEqual(9);
      });

      it("should use the event's start.solution as its start", () => {
        expect(mapStateToProps(state, { event }).start).toEqual(6);
      });

      it("should have a zIndex equal its solved ratio through the bounds times 50", () => {
        expect(mapStateToProps(state, { event }).zIndex).toEqual(3);
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

  it("should return an onDrag function that dispatched a TRANSLATE_EVENT action", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).translate(1);
    expect(dispatchArgs).toEqual([translateEvent("a", 1)]);
  });
});
