import { reducer } from "./reducer";
import { reducer as config } from "../components/Config/ConfigReducer";
import { reducer as constrainedEvents } from "../components/Events/EventsReducer";
import { reducer as drag } from "../components/Drag/DragReducer";

describe("reducer", () => {
  it("should be a combination of all the next-level reducers", () => {
    const state = {};
    const action = { type: "a" };
    expect(reducer(state, action)).toEqual({
      config: config(state.config, action),
      constrainedEvents: constrainedEvents(state.constrainedEvents, action),
      drag: drag(state.drag, action)
    });
  });
});
