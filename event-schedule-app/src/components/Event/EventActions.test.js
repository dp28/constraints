import {
  selectEvent,
  deselectEvent,
  setEventVariable,
  SET_EVENT_VARIABLE,
  SELECT_EVENT,
  DESELECT_EVENT
} from "./EventActions";

describe("selectEvent", () => {
  it("should return a SELECT_EVENT action", () => {
    expect(selectEvent("a").type).toEqual(SELECT_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(selectEvent("a").eventId).toEqual("a");
  });
});

describe("deselectEvent", () => {
  it("should return a DESELECT_EVENT action", () => {
    expect(deselectEvent("a").type).toEqual(DESELECT_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(deselectEvent("a").eventId).toEqual("a");
  });
});

describe("setEventVariable", () => {
  it("should return a SET_EVENT_VARIABLE action", () => {
    expect(setEventVariable().type).toEqual(SET_EVENT_VARIABLE);
  });

  it("should return an action with the passed in eventId", () => {
    expect(setEventVariable("id", "", "", 10).eventId).toEqual("id");
  });

  it("should return an action with the passed in eventPart", () => {
    expect(setEventVariable("", "start", "", 10).eventPart).toEqual("start");
  });

  it("should return an action with the passed in rangePart", () => {
    expect(setEventVariable("", "", "min", 10).rangePart).toEqual("min");
  });

  it("should return an action with the passed in timeInUnits", () => {
    expect(setEventVariable("", "", "", 10).timeInUnits).toEqual(10);
  });
});
