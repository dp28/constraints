import { connect } from "react-redux";

import { EventNameEditor } from "./EventNameEditor";
import { setEventName } from "../Event/EventActions";

export const mapDispatchToProps = (dispatch, { event }) => ({
  setEventName: ({ target }) => dispatch(setEventName(event.id, target.value))
});

export const EventNameEditorContainer = connect(null, mapDispatchToProps)(
  EventNameEditor
);
