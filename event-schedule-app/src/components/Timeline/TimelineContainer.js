import { connect } from "react-redux";
import { createSelector } from "reselect";

import { Timeline } from "./Timeline";
import { selectUnitsToMinutes, selectBounds } from "../Config/ConfigSelectors";

export const mapStateToProps = createSelector(
  selectUnitsToMinutes,
  selectBounds,
  (toMinutes, bounds) => ({
    toMinutes,
    startInUnits: bounds.min,
    numberOfUnits: bounds.max - bounds.min
  })
);

export const TimelineContainer = connect(mapStateToProps)(Timeline);
