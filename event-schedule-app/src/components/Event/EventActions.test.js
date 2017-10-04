import {
  focusEvent,
  blurEvent,
  setEventVariable,
  SET_EVENT_VARIABLE,
  FOCUS_EVENT,
  BLUR_EVENT
} from "./EventActions";

describe("focusEvent", () => {
  it("should return a FOCUS_EVENT action", () => {
    expect(focusEvent("a").type).toEqual(FOCUS_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(focusEvent("a").eventId).toEqual("a");
  });
});

describe("blurEvent", () => {
  it("should return a BLUR_EVENT action", () => {
    expect(blurEvent("a").type).toEqual(BLUR_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(blurEvent("a").eventId).toEqual("a");
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
