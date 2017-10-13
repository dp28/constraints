import { buildInitialState } from "./initialState";
import { save, load } from "./localStorageRepository";

describe("buildInitialState", () => {
  describe("if there is state saved in localStorage", () => {
    afterEach(() => localStorage.clear());

    it("should return that state", () => {
      save({ some: "state" });
      expect(buildInitialState()).toEqual({ some: "state" });
    });
  });

  describe("if there isn't any state saved in local storage", () => {
    it("should return initial states for all the reducers", () => {
      const initialState = buildInitialState();
      const expectedKeys = new Set(["config", "constrainedEvents", "drag"]);
      expect(new Set(Object.keys(initialState))).toEqual(expectedKeys);
    });
  });
});
