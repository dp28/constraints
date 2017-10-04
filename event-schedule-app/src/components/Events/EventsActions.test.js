import {
  CREATE_EVENT,
  UPDATE_SOLUTION,
  createEvent,
  updateSolution
} from "./EventsActions";

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
