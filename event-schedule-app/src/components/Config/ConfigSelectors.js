import { createSelector } from "reselect";

export const selectUnitsToMinutes = createSelector(
  state => state.config.minutesPerUnit,
  minutesPerUnit => units => units * minutesPerUnit
);

export const selectPixelsPerUnit = createSelector(
  state => state.config.pixelsPerUnit,
  pixelsPerUnit => pixelsPerUnit
);

export const selectUnitsToPixels = createSelector(
  selectPixelsPerUnit,
  pixelsPerUnit => units => `${units * pixelsPerUnit}px`
);
