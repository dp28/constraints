import { connect } from "react-redux";

import { timelineItemClicked } from "./TimelineActions";
import { Timeline } from "./Timeline";

export function mapStateToProps({ config }) {
  return {
    minutesPerUnit: config.minutesPerUnit,
    pixelsPerUnit: config.pixelsPerUnit
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    timeClicked: timeInUnits => () => dispatch(timelineItemClicked(timeInUnits))
  };
}

export const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(
  Timeline
);
