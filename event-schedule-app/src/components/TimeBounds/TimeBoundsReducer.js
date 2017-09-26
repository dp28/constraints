import {
  SET_TIME_BOUNDS_PARAM,
  SELECT_TIME_BOUNDS_PARAM
} from "./TimeBoundsActions";

export const InitialState = null;

export function reducer(timeBounds = InitialState, action) {
  switch (action.type) {
    case SET_TIME_BOUNDS_PARAM:
      return setSelectedParam(timeBounds, action.timeInUnits);
    case SELECT_TIME_BOUNDS_PARAM:
      return { ...timeBounds, selectedParam: action.param };
    default:
      return timeBounds;
  }
}

function setSelectedParam(timeBounds, value) {
  const { selectedParam } = timeBounds;
  if (isValidUpdate(timeBounds, value)) {
    return { ...timeBounds, [selectedParam]: value };
  } else {
    return timeBounds;
  }
}

function isValidUpdate(timeBounds, value) {
  const { selectedParam } = timeBounds;
  const max = selectedParam === "max" ? value : timeBounds.max;
  const min = selectedParam === "min" ? value : timeBounds.min;
  if ((max || max === 0) && (min || min === 0)) {
    return max >= min;
  }
  return true;
}
