import { connect } from "react-redux";

import { focusEvent, blurEvent } from "./ConstrainedEventActions";
import { ConstrainedEvent } from "./ConstrainedEvent";

export function mapDispatchToProps(dispatch, { event }) {
  return {
    focus: () => dispatch(focusEvent(event.id)),
    blur: () => dispatch(blurEvent(event.id))
  };
}

export const ConstrainedEventContainer = connect(null, mapDispatchToProps)(
  ConstrainedEvent
);
