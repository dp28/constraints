import { mapDispatchToProps } from "./FinishEditingButtonContainer";
import { deselectEvent } from "../Event/EventActions";

describe("mapDispatchToProps", () => {
  it("return a function that dispatches a DESELECT_EVENT action with the right id", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).deselectEvent();
    expect(dispatchArgs).toEqual([deselectEvent("a")]);
  });
});
