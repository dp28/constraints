import { createSelector } from "reselect";

export const selectEvents = createSelector(
  state => state.constrainedEvents.events,
  Object.values
);
