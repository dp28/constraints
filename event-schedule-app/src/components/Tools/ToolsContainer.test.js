import { mapStateToProps } from "./ToolsContainer";

describe("mapStateToProps", () => {
  it("returns undefined for currentEvent if none are focused", () => {
    const state = {
      constrainedEvents: {
        events: { a: { id: "a", isSelected: false } }
      }
    };
    expect(mapStateToProps(state).currentEvent).toEqual(undefined);
  });
  it("returns the focused event for currentEvent if one is focused", () => {
    const event = { id: "a", isSelected: true };
    const state = {
      constrainedEvents: {
        events: { [event.id]: event }
      }
    };
    expect(mapStateToProps(state).currentEvent).toBe(event);
  });
});
