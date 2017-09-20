import { reducer } from "./reducer";
import { reducer as config } from "../components/Config/ConfigReducer";
import { reducer as newEvent } from "../components/NewEvent/NewEventReducer";

describe("reducer", () => {
  it("should be a combination of all the next-level reducers", () => {
    const state = {};
    const action = { type: "a" };
    expect(reducer(state, action)).toEqual({
      config: config(state.config, action),
      newEvent: newEvent(state.newEvent, action)
    });
  });
});
