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
  pixelsPerUnit => units => units * pixelsPerUnit
);

export const selectPixelsToUnits = createSelector(
  selectPixelsPerUnit,
  pixelsPerUnit => pixels => Math.round(pixels / pixelsPerUnit)
);

export const selectUnitsToPixelString = createSelector(
  selectPixelsPerUnit,
  pixelsPerUnit => units => `${units * pixelsPerUnit}px`
);

export const selectBounds = createSelector(
  state => state.config,
  config => config.bounds
);
