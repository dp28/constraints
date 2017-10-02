import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";
import { VariableMarkerContainer } from "../VariableMarker/VariableMarkerContainer";

const style = {
  width: "50%",
  backgroundColor: "rgba(0, 0, 255, 0.5)"
};

export const ConstrainedEvent = ({ event, focus, blur }) => (
  <TimelineItemContainer
    start={event.start.range.min}
    end={event.end.range.max}
    style={style}
  >
    <div
      style={{ height: "100%", width: "100%" }}
      tabIndex="0"
      onFocus={focus}
      onBlur={blur}
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
    </div>
  </TimelineItemContainer>
);
