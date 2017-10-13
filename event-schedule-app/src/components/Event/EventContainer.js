import { connect } from "react-redux";

import { selectEvent, translateEvent } from "./EventActions";
import { Event } from "./Event";
import { selectRatioThroughBounds } from "../Config/ConfigSelectors";

const HalfMaxZIndex = 50;

export function mapStateToProps(state, { event }) {
  const ratioThroughBounds = selectRatioThroughBounds(state);
  const props = buildRange(event);
  const baseZIndex = Math.round(
    ratioThroughBounds(props.start) * HalfMaxZIndex
  );
  props.zIndex = event.isSelected ? HalfMaxZIndex + baseZIndex : baseZIndex;
  return props;
}

function buildRange(event) {
  if (event.isSelected || isNotSolved(event)) {
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
    translate: distance => dispatch(translateEvent(event.id, distance))
  };
}

export const EventContainer = connect(mapStateToProps, mapDispatchToProps)(
  Event
);
