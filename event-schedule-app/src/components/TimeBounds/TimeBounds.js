import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";

const style = {
  width: "50%",
  backgroundColor: "rgba(255, 0, 0, 0.5)",
  pointerEvents: "none"
};

export const TimeBounds = ({ min, max }) => (
  <TimelineItemContainer start={min} end={max} style={style} />
);
