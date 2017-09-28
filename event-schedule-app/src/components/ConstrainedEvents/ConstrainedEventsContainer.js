import { connect } from "react-redux";

import { ConstrainedEvents } from "./ConstrainedEvents";
import { selectUnitConverters } from "../Config/ConfigSelectors";

export function mapStateToProps(state) {
  return {
    pixelsPerUnit: selectUnitConverters(state).pixelsPerUnit,
    events: Object.values(state.constrainedEvents)
  };
}

export const ConstrainedEventsContainer = connect(mapStateToProps)(
  ConstrainedEvents
);
