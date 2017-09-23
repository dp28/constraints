import { connect } from "react-redux";

import { timelineItemClicked } from "./TimelineActions";
import { Timeline } from "./Timeline";
import { selectUnitConverters } from "../Config/ConfigSelectors";

export const mapStateToProps = selectUnitConverters;

export function mapDispatchToProps(dispatch) {
  return {
    timeClicked: timeInUnits => () => dispatch(timelineItemClicked(timeInUnits))
  };
}

export const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(
  Timeline
);
