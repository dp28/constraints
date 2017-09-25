import { reducer } from "./NewEventReducer";
import { startEvent, setEventEnd, toggleEditingEvent } from "./NewEventActions";

describe("reducer", () => {
  it("should return an empty object if called with undefined state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual({});
  });

  it("should return the passed-in state if it does not respond to the action", () => {
    expect(reducer({ a: 1 }, { type: "a" })).toEqual({ a: 1 });
  });

  describe("in response to a START_EVENT action", () => {
    it("should be set to the 'timeInUnits' of the action", () => {
      expect(reducer({}, startEvent(2)).minStart).toEqual(2);
    });
  });

  describe("in response to a SET_EVENT_END action", () => {
    it("should set 'maxEnd' to the 'timeInUnits' of the action", () => {
      expect(reducer({ minStart: 0 }, setEventEnd(2)).maxEnd).toEqual(2);
    });

    describe("if the 'timeInUnits of the action is less than the 'minStart", () => {
      it("should not set the 'maxEnd'", () => {
        expect(reducer({ minStart: 10 }, setEventEnd(2)).maxEnd).not.toEqual(2);
      });
    });
  });

  describe("in response to a TOGGLE_EDITING_EVENT action", () => {
    it("should set 'editing' to true if it was not defined", () => {
      expect(reducer({}, toggleEditingEvent()).editing).toBe(true);
    });
    it("should set 'editing' to true if it was falsy", () => {
      expect(reducer({ editing: false }, toggleEditingEvent()).editing).toBe(
        true
      );
    });

    it("should set 'editing' to false if it was truthy", () => {
      expect(reducer({ editing: true }, toggleEditingEvent()).editing).toBe(
        false
      );
    });
  });
});
