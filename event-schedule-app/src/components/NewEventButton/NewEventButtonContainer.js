import { connect } from "react-redux";

import { NewEventButton } from "./NewEventButton";
import { createEvent } from "../ConstrainedEvents/ConstrainedEventsActions";

export const mapDispatchToProps = dispatch => ({
  createEvent: (minStart, maxEnd) => dispatch(createEvent(minStart, maxEnd))
});

export const NewEventButtonContainer = connect(null, mapDispatchToProps)(
  NewEventButton
);
