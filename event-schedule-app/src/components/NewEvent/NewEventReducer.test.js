import { reducer } from "./NewEventReducer";
import { timelineItemClicked } from "../Timeline/TimelineActions";

describe("reducer", () => {
  it("should return an empty object if called with undefined state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual({});
  });

  it("should return the passed-in state if it does not respond to the action", () => {
    expect(reducer({ a: 1 }, { type: "a" })).toEqual({ a: 1 });
  });

  describe("in response to a TIMELINE_ITEM_CLICKED action", () => {
    describe("if 'minStart' is not set", () => {
      it("should be set to the 'timeInUnits' of the action", () => {
        expect(reducer({}, timelineItemClicked(2)).minStart).toEqual(2);
      });
    });

    describe("if 'minStart' is set", () => {
      it("should set 'maxEnd' to the 'timeInUnits' of the action", () => {
        expect(reducer({ minStart: 1 }, timelineItemClicked(2)).maxEnd).toEqual(
          2
        );
      });

      describe("if the 'timeInUnits of the action is less than the 'minStart", () => {
        it("should not set the 'maxEnd'", () => {
          expect(
            reducer({ minStart: 10 }, timelineItemClicked(2)).maxEnd
          ).not.toEqual(2);
        });
      });
    });
  });
});
