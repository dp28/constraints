import { createSelector } from "reselect";

export const selectUnitConverters = createSelector(
  state => state.config.minutesPerUnit,
  state => state.config.pixelsPerUnit,
  (minutesPerUnit, pixelsPerUnit) => ({
    toMinutes: units => units * minutesPerUnit,
    pixelsPerUnit
  })
);
