import {
  SET_EVENT_VARIABLE,
  setEventVariable
} from "./ConstrainedEventsActions";

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
