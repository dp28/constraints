import { connect } from "react-redux";

import { TimeBounds } from "./TimeBounds";

export function mapStateToProps(state) {
  const { timeBounds } = state;
  return {
    min: get(timeBounds, "min") || 0,
    max: get(timeBounds, "max") || 0
  };
}

function get(object, property) {
  return object && object[property] ? object[property] : null;
}

export const TimeBoundsContainer = connect(mapStateToProps)(TimeBounds);
