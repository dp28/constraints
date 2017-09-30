import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { VariableMarker } from "./VariableMarker";
import {
  selectUnitsToPixels,
  selectPixelsToUnits
} from "../Config/ConfigSelectors";
import { startDragging, stopDragging } from "../Drag/DragActions";
import { setEventVariable } from "../ConstrainedEvents/ConstrainedEventsActions";

export const mapStateToProps = (state, { eventId, eventPart, rangePart }) => {
  const toPixels = selectUnitsToPixels(state);
  const event = state.constrainedEvents[eventId];
  const min = event.start.min;
  const valueInUnits = event[eventPart][rangePart];
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
    stopDragging: ({ clientY }) => bound.stopDragging(clientY),
    startDragging: startUnits => ({ clientY }) =>
      bound.startDragging(clientY, startUnits)
  };
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    startDragging: dispatchProps.startDragging(stateProps.valueInUnits),

    updateVariable: event => {
      if (!event.clientY) {
        return;
      }
      const distanceMoved = event.clientY - stateProps.dragStartY;
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
