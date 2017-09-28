import { reducer } from "./ConstrainedEventsReducer";

describe("reducer", () => {
  it("should return the default event map if called with undefined state", () => {
    expect(Object.values(reducer(undefined, { type: "INIT" }))).toEqual([
      {
        id: expect.any(String),
        start: { min: 10, max: 20 },
        duration: { min: 10, max: 20 },
        end: { min: 30, max: 40 }
      }
    ]);
  });

  it("should return an object with a mapping from event id to events", () => {
    const result = reducer(undefined, { type: "INIT" });
    const id = Object.keys(result)[0];
    expect(id).toEqual(result[id].id);
  });

  it("should return the passed-in state if it does not respond to the action", () => {
    expect(reducer({}, { type: "a" })).toEqual({});
  });
});
