import React from "react";

import { TimelineItemContainer } from "../TimelineItem/TimelineItemContainer";

export const TimelineRow = ({
  timeInMinutes,
  timeInUnits,
  onClick,
  onEnter
}) => {
  const borderTop = isHour(timeInMinutes) ? "1px solid grey" : null;
  const text = isHour(timeInMinutes) ? toHourLabel(timeInMinutes) : "";

  return (
    <TimelineItemContainer
      start={timeInUnits}
      end={timeInUnits + 1}
      style={{ width: "100%", borderTop }}
      onClick={onClick}
      onEnter={onEnter}
    >
      {text}
    </TimelineItemContainer>
  );
};

function isHour(timeInMinutes) {
  return timeInMinutes % 60 === 0;
}

function toHourLabel(timeInMinutes) {
  const hour = Math.floor(timeInMinutes / 60);
  const minute = timeInMinutes % 60;
  return `${padNumber(hour)}:${padNumber(minute)}`;
}

function padNumber(number) {
  const numString = String(number);
  return numString.length === 1 ? `0${numString}` : numString;
}
