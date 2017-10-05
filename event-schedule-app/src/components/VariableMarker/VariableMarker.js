import React from "react";
import { DraggableCore as Draggable } from "react-draggable";

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
    <Draggable
      axis={"y"}
      grid={[100, 5]}
      onDrag={updateVariable}
      onStart={startDragging}
      onStop={stopDragging}
      offsetParent={global.document ? global.document.body : undefined}
    >
      <div style={{ ...style, top: `${centre - 10}px` }}>
        {rangePart} {eventPart}
      </div>
    </Draggable>
  );
};
