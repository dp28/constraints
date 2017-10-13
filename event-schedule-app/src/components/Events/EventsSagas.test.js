import { call, put, takeLatest } from "redux-saga/effects";

import { solve } from "../../api/solver";
import { updateSolution } from "./EventsActions";
import { DESELECT_EVENT } from "../Event/EventActions";
import { solveCurrentProblem, solveOnBlur } from "./EventsSagas";
import { save, load } from "../../state/localStorageRepository";

afterEach(() => localStorage.clear());

describe("solveCurrentProblem", () => {
  const store = {
    getState: () => ({ constrainedEvents: { events: { a: { id: "a" } } } })
  };

  it("should post to the API with the current events from the passed-in store", () => {
    const saga = solveCurrentProblem(store);
    const events = Object.values(store.getState().constrainedEvents.events);
    expect(saga.next().value).toEqual(call(solve, { events }));
  });

  it("should dispatch an UPDATE_SOLUTION event with the result", () => {
    const saga = solveCurrentProblem(store);
    saga.next();
    const solution = { a: "1", b: "2" };
    expect(saga.next(solution).value).toEqual(put(updateSolution(solution)));
  });

  it("should save the current state to localStorage", () => {
    const state = { constrainedEvents: { events: { a: { id: "a" } } } };
    const mockStore = { getState: () => state };
    const saga = solveCurrentProblem(store);
    saga.next();
    saga.next();
    saga.next();
    expect(load()).toEqual(state);
  });
});

describe("solveOnBlur", () => {
  it("should start the solveCurrentProblem saga on DESELECT_EVENT actions", () => {
    const store = { store: true };
    const saga = solveOnBlur(store);
    expect(saga.next().value).toEqual(
      takeLatest(DESELECT_EVENT, solveCurrentProblem, store)
    );
  });
});
