import { reducer } from "./reducer";
import { reducer as config } from "../components/Config/ConfigReducer";
import { reducer as timeBounds } from "../components/TimeBounds/TimeBoundsReducer";
import { reducer as constrainedEvents } from "../components/ConstrainedEvents/ConstrainedEventsReducer";
import { reducer as drag } from "../components/Drag/DragReducer";

describe("reducer", () => {
  it("should be a combination of all the next-level reducers", () => {
    const state = {};
    const action = { type: "a" };
    expect(reducer(state, action)).toEqual({
      config: config(state.config, action),
      timeBounds: timeBounds(state.timeBounds, action),
      constrainedEvents: constrainedEvents(state.constrainedEvents, action),
      drag: drag(state.drag, action)
    });
  });
});
