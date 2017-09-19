export const TIMELINE_ITEM_CLICKED = "TIMELINE_ITEM_CLICKED";

export function timelineItemClicked(timeInUnits) {
  return { type: TIMELINE_ITEM_CLICKED, timeInUnits };
}
