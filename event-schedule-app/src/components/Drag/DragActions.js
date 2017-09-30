export const START_DRAGGING = "START_DRAGGING";
export const STOP_DRAGGING = "STOP_DRAGGING";

export const startDragging = (startY, startUnits) => ({
  type: START_DRAGGING,
  startY,
  startUnits
});
export const stopDragging = endY => ({ type: STOP_DRAGGING, endY });
