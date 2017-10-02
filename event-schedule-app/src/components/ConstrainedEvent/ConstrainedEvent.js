import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";
import { VariableMarkerContainer } from "../VariableMarker/VariableMarkerContainer";

const style = {
  width: "50%",
  backgroundColor: "rgba(0, 0, 255, 0.5)"
};

export const ConstrainedEvent = ({ event }) => (
  <TimelineItemContainer
    start={event.start.range.min}
    end={event.end.range.max}
    style={style}
  >
    <VariableMarkerContainer
      eventId={event.id}
      eventPart="start"
      rangePart="min"
    />

    <VariableMarkerContainer
      eventId={event.id}
      eventPart="start"
      rangePart="max"
    />

    <VariableMarkerContainer
      eventId={event.id}
      eventPart="end"
      rangePart="min"
    />

    <VariableMarkerContainer
      eventId={event.id}
      eventPart="end"
      rangePart="max"
    />
  </TimelineItemContainer>
);
