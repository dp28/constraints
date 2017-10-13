import { buildInitialState } from "./initialState";
import { save, load } from "./localStorageRepository";

describe("buildInitialState", () => {
  describe("if there is state saved in localStorage", () => {
    afterEach(() => localStorage.clear());
    it("should merge the default initial state with the saved state, keeping saved state if it exists", () => {
      const saved = {
        config: {
          minutesPerUnit: 15,
          pixelsPerUnit: 1
        },
        constrainedEvents: {
          events: {
            a: { id: "a", name: "saved event" }
          }
        },
        drag: {
          startUnits: null,
          startPixels: null
        }
      };
      save(saved);
      const current = {
        config: {
          minutesPerUnit: 15,
          pixelsPerUnit: 5,
          bounds: { min: 0, max: 96 }
        },
        constrainedEvents: {
          events: {}
        },
        drag: {
          startUnits: null,
          startPixels: null
        }
      };
      expect(buildInitialState()).toEqual({
        config: {
          minutesPerUnit: 15,
          pixelsPerUnit: 1,
          bounds: { min: 0, max: 96 }
        },
        constrainedEvents: {
          events: {
            a: { id: "a", name: "saved event" }
          }
        },
        drag: {
          startUnits: null,
          startPixels: null
        }
      });
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
