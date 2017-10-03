import { connect } from "react-redux";

import { focusEvent, blurEvent } from "./ConstrainedEventActions";
import { ConstrainedEvent } from "./ConstrainedEvent";

export function mapStateToProps(state, { event }) {
  if (event.isFocused || isNotSolved(event)) {
    return {
      start: event.start.range.min,
      end: event.end.range.max
    };
  }
  return {
    start: event.start.solution,
    end: event.end.solution
  };
}

function isNotSolved(event) {
  return event.start.solution === null || event.start.solution === undefined;
}

export function mapDispatchToProps(dispatch, { event }) {
  return {
    focus: () => dispatch(focusEvent(event.id)),
    blur: () => dispatch(blurEvent(event.id))
  };
}

export const ConstrainedEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstrainedEvent);
