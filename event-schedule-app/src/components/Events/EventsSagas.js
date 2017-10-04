import { call, put, takeLatest } from "redux-saga/effects";

import { solve } from "../../api/solver";
import { BLUR_EVENT } from "../Event/EventActions";
import { selectEvents } from "./EventsSelectors";
import { updateSolution } from "./EventsActions";

export function* solveCurrentProblem(store) {
  const events = selectEvents(store.getState());
  const solution = yield call(solve, { events });
  yield put(updateSolution(solution));
}

export function* solveOnBlur(store) {
  yield takeLatest(BLUR_EVENT, solveCurrentProblem, store);
}
