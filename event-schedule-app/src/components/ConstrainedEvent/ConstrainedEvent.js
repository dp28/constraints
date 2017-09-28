import React from "react";
import "./ConstrainedEvent.css";

export const ConstrainedEvent = ({ pixelsPerUnit, event }) => {
  const inPixels = time => time * pixelsPerUnit + "px";
  const minStart = event.start.min;
  const maxEnd = event.end.max;
  return (
    <div
      className="ConstrainedEvent"
      style={{ top: inPixels(minStart), height: inPixels(maxEnd - minStart) }}
    />
  );
};
