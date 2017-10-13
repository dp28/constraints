import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";
import { VariableMarkerContainer } from "../VariableMarker/VariableMarkerContainer";
import { Draggable } from "../Drag/Draggable";
import Paper from "material-ui/Paper";
import { Colours } from "../../theme";

const style = {
  width: "50%",
  left: "25%"
};

const DefaultColour = Colours.grey.light;
const SelectedColour = Colours.primary.base;

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
      <Paper
        style={{
          height: "100%",
          width: "100%",
          outline: "none",
          backgroundColor: event.isSelected ? SelectedColour : DefaultColour,
          borderBottom: start === end ? `10px solid ${DefaultColour}` : null,
          zIndex: event.isSelected ? 10 : 1
        }}
        tabIndex="0"
        onFocus={focus}
        // onBlur={blur}
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
      </Paper>
    </Draggable>
  </TimelineItemContainer>
);
