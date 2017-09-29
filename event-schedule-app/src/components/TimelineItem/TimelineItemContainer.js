import { connect } from "react-redux";

import { TimelineItem } from "./TimelineItem";
import { selectUnitsToPixelString } from "../Config/ConfigSelectors";

export const mapStateToProps = (state, { start, end }) => {
  const toPixels = selectUnitsToPixelString(state);
  return {
    start: toPixels(start),
    height: toPixels(end - start)
  };
};

export const TimelineItemContainer = connect(mapStateToProps)(TimelineItem);
