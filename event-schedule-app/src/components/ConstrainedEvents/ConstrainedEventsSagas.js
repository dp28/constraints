import { call, put, takeLatest } from "redux-saga/effects";

import { solve } from "../../api/solver";
import { BLUR_EVENT } from "../ConstrainedEvent/ConstrainedEventActions";
import { selectEvents } from "./ConstrainedEventsSelectors";
import { updateSolution } from "./ConstrainedEventsActions";

export function* solveCurrentProblem(store) {
  const events = selectEvents(store.getState());
  const solution = yield call(solve, { events });
  yield put(updateSolution(solution));
}

export function* solveOnBlur(store) {
  yield takeLatest(BLUR_EVENT, solveCurrentProblem, store);
}
