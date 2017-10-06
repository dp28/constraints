import React from "react";

import { Draggable } from "../Drag/Draggable";

const style = {
  position: "absolute",
  backgroundColor: "gray",
  textAlign: "center",
  width: "50%",
  left: "25%",
  height: "20px"
};

export const VariableMarker = ({
  centre,
  eventPart,
  rangePart,
  updateVariable,
  valueInUnits
}) => {
  return (
    <Draggable onDrag={updateVariable} currentPositionInUnits={valueInUnits}>
      <div style={{ ...style, top: `${centre - 10}px` }}>
        {rangePart} {eventPart}
      </div>
    </Draggable>
  );
};
