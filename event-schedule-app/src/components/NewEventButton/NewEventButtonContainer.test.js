import { mapDispatchToProps } from "./NewEventButtonContainer";
import { createEvent } from "../Events/EventsActions";

describe("mapDispatchToProps", () => {
  it("return a function that dispatches a CREATE_EVENT action", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch).createEvent(10, 20);
    expect(dispatchArgs).toEqual([createEvent(10, 20)]);
  });
});
