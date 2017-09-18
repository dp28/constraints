import React from "react";
import "./Timeline.css";

const Item = ({ timeInMinutes }) => {
  const classes = isHour(timeInMinutes) ? "Item Item-show-border" : "Item";
  if (isHour(timeInMinutes)) {
    return (
      <div className="Item Item-show-border">{toHourLabel(timeInMinutes)}</div>
    );
  } else {
    return <div className="Item" />;
  }
};

export const Timeline = ({ minutesPerUnit, numberOfUnits, startInUnits }) => {
  const items = buildItemUnits(numberOfUnits, startInUnits).map(unit => (
    <Item timeInMinutes={unit * minutesPerUnit} />
  ));
  return <div className="Timeline">{items}</div>;
};

function buildItemUnits(numberOfUnits, startInUnits) {
  const items = [];
  for (let i = 0; i < numberOfUnits; i++) {
    items.push(startInUnits + i);
  }
  return items;
}

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
