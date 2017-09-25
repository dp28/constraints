import {
  startEvent,
  setEventEnd,
  toggleEditingEvent,
  START_EVENT,
  SET_EVENT_END,
  TOGGLE_EDITING_EVENT
} from "./NewEventActions";

describe("startEvent", () => {
  it("should return a START_EVENT action", () => {
    expect(startEvent().type).toEqual(START_EVENT);
  });

  it("should return an action with the passed in timeInUnits", () => {
    expect(startEvent(10).timeInUnits).toEqual(10);
  });
});

describe("setEventEnd", () => {
  it("should return a SET_EVENT_END action", () => {
    expect(setEventEnd().type).toEqual(SET_EVENT_END);
  });

  it("should return an action with the passed in timeInUnits", () => {
    expect(setEventEnd(10).timeInUnits).toEqual(10);
  });
});

describe("toggleEditingEvent", () => {
  it("should return a TOGGLE_EDITING_EVENT action", () => {
    expect(toggleEditingEvent().type).toEqual(TOGGLE_EDITING_EVENT);
  });
});
