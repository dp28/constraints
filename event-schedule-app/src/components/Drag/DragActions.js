export const START_DRAGGING = "START_DRAGGING";
export const STOP_DRAGGING = "STOP_DRAGGING";

export const startDragging = (startPixels, startUnits) => ({
  type: START_DRAGGING,
  startPixels,
  startUnits
});
export const stopDragging = () => ({ type: STOP_DRAGGING });
