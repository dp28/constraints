import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";
import { VariableMarkerContainer } from "../VariableMarker/VariableMarkerContainer";

const style = {
  width: "50%",
  backgroundColor: "rgba(0, 0, 255, 0.5)"
};

export const Event = ({ event, focus, blur, start, end }) => (
  <TimelineItemContainer start={start} end={end} style={style}>
    <div
      style={{
        height: "100%",
        width: "100%",
        borderBottom:
          start === end ? `10px solid ${style.backgroundColor}` : null
      }}
      tabIndex="0"
      onFocus={focus}
      onBlur={blur}
    >
      {event.isFocused && (
        <div>
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
      )}
    </div>
  </TimelineItemContainer>
);