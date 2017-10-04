import { call, put, takeLatest } from "redux-saga/effects";

import { solve } from "../../api/solver";
import { updateSolution } from "./EventsActions";
import { BLUR_EVENT } from "../Event/EventActions";
import { solveCurrentProblem, solveOnBlur } from "./EventsSagas";

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
});

describe("solveOnBlur", () => {
  it("should start the solveCurrentProblem saga on BLUR_EVENT actions", () => {
    const store = { store: true };
    const saga = solveOnBlur(store);
    expect(saga.next().value).toEqual(
      takeLatest(BLUR_EVENT, solveCurrentProblem, store)
    );
  });
});
