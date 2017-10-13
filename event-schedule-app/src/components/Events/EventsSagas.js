import { call, put, takeLatest } from "redux-saga/effects";

import { solve } from "../../api/solver";
import { DESELECT_EVENT } from "../Event/EventActions";
import { selectEvents } from "./EventsSelectors";
import { updateSolution } from "./EventsActions";
import { save } from "../../state/localStorageRepository";

export function* solveCurrentProblem(store) {
  const events = selectEvents(store.getState());
  const solution = yield call(solve, { events });
  yield put(updateSolution(solution));
  save(store.getState());
}

export function* solveOnBlur(store) {
  yield takeLatest(DESELECT_EVENT, solveCurrentProblem, store);
}
