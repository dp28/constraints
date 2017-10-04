import { connect } from "react-redux";

import { Events } from "./Events";
import { selectEvents } from "./EventsSelectors";
import { selectPixelsPerUnit } from "../Config/ConfigSelectors";

export function mapStateToProps(state) {
  return {
    pixelsPerUnit: selectPixelsPerUnit(state),
    events: selectEvents(state)
  };
}

export const EventsContainer = connect(mapStateToProps)(
  Events
);
