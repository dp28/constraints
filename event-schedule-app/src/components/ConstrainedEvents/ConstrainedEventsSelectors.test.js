import { selectEvents } from "./ConstrainedEventsSelectors";

describe("selectEvents", () => {
  it("should return the events within constrainedEvents as an array", () => {
    const event1 = { id: "a" };
    const event2 = { id: "b" };
    const state = { constrainedEvents: { events: { a: event1, b: event2 } } };
    expect(selectEvents(state)).toEqual([event1, event2]);
  });
});
