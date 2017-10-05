import { connect } from "react-redux";

import { selectEvent, deselectEvent } from "./EventActions";
import { Event } from "./Event";

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
    focus: () => dispatch(selectEvent(event.id)),
    blur: () => dispatch(deselectEvent(event.id))
  };
}

export const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
