import React from "react";

export const TimelineItem = ({
  start,
  height,
  children,
  style,
  onClick,
  onEnter
}) => (
  <div
    style={{ ...style, position: "absolute", top: start, height }}
    onClick={onClick}
    onMouseEnter={onEnter}
    onTouchMove={onEnter}
  >
    {children}
  </div>
);
