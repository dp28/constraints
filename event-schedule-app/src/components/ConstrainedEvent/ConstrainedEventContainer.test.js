import { mapDispatchToProps } from "./ConstrainedEventContainer";
import { focusEvent, blurEvent } from "./ConstrainedEventActions";

describe("mapDispatchToProps", () => {
  it("should return a focus function that dispatches a FOCUS_EVENT action with the correct id", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).focus();
    expect(dispatchArgs).toEqual([focusEvent("a")]);
  });

  it("should return a blur function that dispatches a BLUR_EVENT action with the correct id", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    mapDispatchToProps(dispatch, { event: { id: "a" } }).blur();
    expect(dispatchArgs).toEqual([blurEvent("a")]);
  });
});
