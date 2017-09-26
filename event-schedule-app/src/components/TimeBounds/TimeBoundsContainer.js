import { connect } from "react-redux";

import { TimeBounds } from "./TimeBounds";
import { selectUnitConverters } from "../Config/ConfigSelectors";

export function mapStateToProps(state) {
  const { timeBounds } = state;
  return {
    pixelsPerUnit: selectUnitConverters(state).pixelsPerUnit,
    min: get(timeBounds, "min") || 0,
    max: get(timeBounds, "max") || 0
  };
}

function get(object, property) {
  return object && object[property] ? object[property] : null;
}

export const TimeBoundsContainer = connect(mapStateToProps)(TimeBounds);
