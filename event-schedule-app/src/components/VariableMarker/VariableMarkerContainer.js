import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { VariableMarker } from "./VariableMarker";
import {
  selectUnitsToPixels,
  selectPixelsToUnits
} from "../Config/ConfigSelectors";
import { startDragging, stopDragging } from "../Drag/DragActions";
import { setEventVariable } from "../Event/EventActions";

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

export function mapDispatchToProps(dispatch) {
  const bound = bindActionCreators(
    { setEventVariable, startDragging, stopDragging },
    dispatch
  );
  return {
    ...bound,
    stopDragging: (_, { y }) => bound.stopDragging(y),
    startDragging: startUnits => (_, { y }) =>
      bound.startDragging(y, startUnits)
  };
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    startDragging: dispatchProps.startDragging(stateProps.valueInUnits),

    updateVariable: (_unusedMouseEvent, dragEventData) => {
      const distanceMoved = dragEventData.y - stateProps.dragStartY;
      const timeUnitsMoved = stateProps.pixelsToUnits(distanceMoved);
      if (timeUnitsMoved) {
        const { eventId, eventPart, rangePart } = ownProps;
        dispatchProps.setEventVariable(
          eventId,
          eventPart,
          rangePart,
          timeUnitsMoved + stateProps.dragStartUnits
        );
      }
    }
  };
}

export const VariableMarkerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(VariableMarker);
