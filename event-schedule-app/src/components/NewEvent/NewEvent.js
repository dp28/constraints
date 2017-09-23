import React from "react";
import "./NewEvent.css";

export const NewEvent = ({
  pixelsPerUnit,
  minStart,
  minDuration,
  maxDuration,
  maxEnd
}) => {
  const inPixels = time => time * pixelsPerUnit + "px";
  return (
    <div
      className="NewEvent"
      style={{ top: inPixels(minStart), height: inPixels(maxEnd - minStart) }}
    />
  );
};
