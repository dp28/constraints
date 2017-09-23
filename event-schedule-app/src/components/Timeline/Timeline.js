import React from "react";

import { NewEventContainer } from "../NewEvent/NewEventContainer";
import "./Timeline.css";

const Item = ({ timeInMinutes, heightInPixels, onClick }) => {
  const classes = isHour(timeInMinutes) ? "Item Item-show-border" : "Item";
  const text = isHour(timeInMinutes) ? toHourLabel(timeInMinutes) : "";
  const height = isHour(timeInMinutes) ? heightInPixels - 1 : heightInPixels;
  return (
    <div
      className={classes}
      style={{ height: height + "px" }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export const Timeline = ({
  toMinutes,
  numberOfUnits,
  startInUnits,
  pixelsPerUnit,
  timeClicked
}) => {
  const items = buildItemUnits(numberOfUnits, startInUnits).map(unit => (
    <Item
      key={unit}
      timeInMinutes={toMinutes(unit)}
      heightInPixels={pixelsPerUnit}
      onClick={timeClicked(unit)}
    />
  ));
  return (
    <div className="Timeline">
      {items}
      <NewEventContainer />
    </div>
  );
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
