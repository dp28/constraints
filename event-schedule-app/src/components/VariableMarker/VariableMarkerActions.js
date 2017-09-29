export const SET_TIME_BOUNDS_PARAM = "SET_TIME_BOUNDS_PARAM";
export const SELECT_TIME_BOUNDS_PARAM = "SELECT_TIME_BOUNDS_PARAM";

export function setTimeBoundsParam(timeInUnits) {
  return { type: SET_TIME_BOUNDS_PARAM, timeInUnits };
}

export function selectTimeBoundsParam(param) {
  return { type: SELECT_TIME_BOUNDS_PARAM, param };
}
