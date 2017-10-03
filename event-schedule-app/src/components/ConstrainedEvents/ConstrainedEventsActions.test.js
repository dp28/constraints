import {
  SET_EVENT_VARIABLE,
  CREATE_EVENT,
  UPDATE_SOLUTION,
  setEventVariable,
  createEvent,
  updateSolution
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

describe("createEvent", () => {
  it("should return a CREATE_EVENT action", () => {
    expect(createEvent().type).toEqual(CREATE_EVENT);
  });

  it("should return an action with the passed in minStart", () => {
    expect(createEvent(10, 20).minStart).toEqual(10);
  });

  it("should return an action with the passed in maxEnd", () => {
    expect(createEvent(10, 20).maxEnd).toEqual(20);
  });
});

describe("updateSolution", () => {
  it("should return a UPDATE_SOLUTION action", () => {
    expect(updateSolution().type).toEqual(UPDATE_SOLUTION);
  });

  it("should return an action with the passed in solution", () => {
    expect(updateSolution({ a: "1" }).solution).toEqual({ a: "1" });
  });
});
