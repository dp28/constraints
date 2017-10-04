import { connect } from "react-redux";

import { NewEventButton } from "./NewEventButton";
import { createEvent } from "../Events/EventsActions";

export const mapDispatchToProps = dispatch => ({
  createEvent: (minStart, maxEnd) => dispatch(createEvent(minStart, maxEnd))
});

export const NewEventButtonContainer = connect(null, mapDispatchToProps)(
  NewEventButton
);
