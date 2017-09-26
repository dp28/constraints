import React from "react";
import "./TimeBounds.css";

export const TimeBounds = ({ pixelsPerUnit, min, max }) => {
  const inPixels = time => time * pixelsPerUnit + "px";
  return (
    <div
      className="TimeBounds"
      style={{ top: inPixels(min), height: inPixels(max - min) }}
    />
  );
};
