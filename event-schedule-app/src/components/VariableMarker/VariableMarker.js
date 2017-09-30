import React from "react";

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
  startDragging,
  stopDragging,
  updateVariable
}) => {
  return (
    <div
      style={{ ...style, top: `${centre - 10}px` }}
      draggable="true"
      onDrag={updateVariable}
      onDragStart={startDragging}
      onDragEnd={stopDragging}
    >
      {rangePart} {eventPart}
    </div>
  );
};
