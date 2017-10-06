import { connect } from "react-redux";

import { VariableMarker } from "./VariableMarker";
import {
  selectUnitsToPixels,
  selectPixelsToUnits
} from "../Config/ConfigSelectors";
import { incrementEventVariable } from "../Event/EventActions";

export const mapStateToProps = (state, { eventId, eventPart, rangePart }) => {
  const toPixels = selectUnitsToPixels(state);
  const event = state.constrainedEvents.events[eventId];
  const min = event.start.range.min;
  const valueInUnits = event[eventPart].range[rangePart];
  return {
    valueInUnits,
    centre: toPixels(valueInUnits - min),
    pixelsToUnits: selectPixelsToUnits(state),
    dragStartY: state.drag.startY || 0,
    dragStartUnits: state.drag.startUnits || 0
  };
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateVariable: timeUnitsMoved => {
      const { eventId, eventPart, rangePart } = ownProps;
      dispatch(
        incrementEventVariable(eventId, eventPart, rangePart, timeUnitsMoved)
      );
    }
  };
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    updateVariable: timeUnitsMoved => {
      if (timeUnitsMoved) {
        const { eventId, eventPart, rangePart } = ownProps;
        dispatchProps.incrementEventVariable(
          eventId,
          eventPart,
          rangePart,
          timeUnitsMoved
        );
      }
    }
  };
}

export const VariableMarkerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariableMarker);
