import { connect } from "react-redux";

import { ConstrainedEvents } from "./ConstrainedEvents";
import { selectPixelsPerUnit } from "../Config/ConfigSelectors";

export function mapStateToProps(state) {
  return {
    pixelsPerUnit: selectPixelsPerUnit(state),
    events: Object.values(state.constrainedEvents.events).map(event => ({
      ...event,
      isFocused: state.constrainedEvents.focused === event.id
    }))
  };
}

export const ConstrainedEventsContainer = connect(mapStateToProps)(
  ConstrainedEvents
);
