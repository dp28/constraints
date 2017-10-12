import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";
import { VariableMarkerContainer } from "../VariableMarker/VariableMarkerContainer";
import { Draggable } from "../Drag/Draggable";

const style = {
  width: "50%",
  left: "25%",
  backgroundColor: "rgb(208, 233, 247)",
  border: "1px solid",
  borderColor: "rgb(76, 170, 225)"
};

const centred = {
  position: "relative",
  top: "50%",
  textAlign: "center",
  transform: "translateY(-50%)"
};

export const Event = ({ event, focus, blur, start, end, translate }) => (
  <TimelineItemContainer start={start} end={end} style={style}>
    <Draggable
      currentPositionInUnits={start}
      onDrag={translate}
      handle=".handle"
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          borderBottom:
            start === end ? `10px solid ${style.borderColor}` : null,
          outline: event.isSelected ? `white dotted medium` : null
        }}
        tabIndex="0"
        onFocus={focus}
        onBlur={blur}
      >
        {!event.isSelected && <div style={centred}>{event.name}</div>}
        {event.isSelected && (
          <div
            className="handle"
            style={{
              ...centred,
              border: "1px solid black"
            }}
          >
            Drag to move
          </div>
        )}
        {event.isSelected && (
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
    </Draggable>
  </TimelineItemContainer>
);
