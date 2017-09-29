import React from "react";

const style = {
  position: "absolute",
  backgroundColor: "gray",
  textAlign: "center",
  width: "50%",
  left: "25%",
  height: "20px"
};

export const VariableMarker = ({ centre, eventPart, rangePart }) => {
  return (
    <div style={{ ...style, top: `${centre - 10}px` }}>
      {rangePart} {eventPart}
    </div>
  );
};
