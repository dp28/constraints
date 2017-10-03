import { connect } from "react-redux";

import { ConstrainedEvents } from "./ConstrainedEvents";
import { selectEvents } from "./ConstrainedEventsSelectors";
import { selectPixelsPerUnit } from "../Config/ConfigSelectors";

export function mapStateToProps(state) {
  return {
    pixelsPerUnit: selectPixelsPerUnit(state),
    events: selectEvents(state)
  };
}

export const ConstrainedEventsContainer = connect(mapStateToProps)(
  ConstrainedEvents
);
