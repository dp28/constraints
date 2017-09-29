import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";

const style = {
  width: "50%",
  backgroundColor: "rgba(0, 0, 255, 0.5)",
  pointerEvents: "none"
};

export const ConstrainedEvent = ({ event }) => (
  <TimelineItemContainer
    start={event.start.min}
    end={event.end.max}
    style={style}
  />
);
