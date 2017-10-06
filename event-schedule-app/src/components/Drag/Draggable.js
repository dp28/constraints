import { DraggableCore } from "react-draggable";
import { connect } from "react-redux";

import { selectPixelsPerUnit } from "../Config/ConfigSelectors";
import { selectOffset } from "./DragSelectors";
import { startDragging, stopDragging } from "./DragActions";

export function mapStateToProps(state, { onDrag, currentPositionInUnits }) {
  const pixelsPerUnit = selectPixelsPerUnit(state);
  const offset = selectOffset(state);
  const dragHandlers = wrapDragHandler(
    onDrag,
    pixelsPerUnit,
    currentPositionInUnits,
    offset
  );
  return {
    axis: "y",
    grid: [100, pixelsPerUnit],
    offsetParent: global.document.body,
    ...dragHandlers
  };
}

function wrapDragHandler(onDrag, pixelsPerUnit, currentUnits, offset) {
  if (!onDrag) {
    return {};
  }
  return {
    onDrag: (_mouseEvent, dragData) => {
      if (isValidDrag(dragData, currentUnits * pixelsPerUnit, offset)) {
        onDrag(dragData.deltaY / pixelsPerUnit);
      }
    }
  };
}

function isValidDrag({ y, deltaY }, currentPositionY, offset) {
  return (
    (y - offset >= currentPositionY && deltaY > 0) ||
    (y - offset <= currentPositionY && deltaY < 0)
  );
}

export function mapDispatchToProps(dispatch, { currentPositionInUnits }) {
  return {
    onStart: (_mouseEvent, dragData) =>
      dispatch(startDragging(dragData.y, currentPositionInUnits)),
    onStop: () => dispatch(stopDragging())
  };
}

export const Draggable = connect(mapStateToProps, mapDispatchToProps)(
  DraggableCore
);
