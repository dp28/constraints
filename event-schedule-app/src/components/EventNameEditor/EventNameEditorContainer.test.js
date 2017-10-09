import { mapDispatchToProps } from "./EventNameEditorContainer";
import { setEventName } from "../Event/EventActions";

describe("mapDispatchToProps", () => {
  it("return a function that dispatches a SET_EVENT_NAME action", () => {
    let dispatchArgs = null;
    const dispatch = (...args) => {
      dispatchArgs = args;
    };
    const event = { id: "a" };
    const domEvent = { target: { value: "bla" } };
    mapDispatchToProps(dispatch, { event }).setEventName(domEvent);
    expect(dispatchArgs).toEqual([setEventName("a", "bla")]);
  });
});
