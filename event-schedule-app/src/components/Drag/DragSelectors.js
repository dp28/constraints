import { createSelector } from "reselect";

import { selectUnitsToPixels } from "../Config/ConfigSelectors";

export const selectOffset = createSelector(
  selectUnitsToPixels,
  state => state.drag,
  (unitsToPixels, { startUnits, startPixels }) =>
    startPixels - unitsToPixels(startUnits)
);
