import React from "react";

import { TimelineRow } from "../TimelineRow/TimelineRow";
import { ConstrainedEventsContainer } from "../ConstrainedEvents/ConstrainedEventsContainer";
import "./Timeline.css";

export const Timeline = ({ toMinutes, numberOfUnits, startInUnits }) => {
  const items = buildRowUnits(numberOfUnits, startInUnits).map(unit => (
    <TimelineRow
      key={unit}
      timeInMinutes={toMinutes(unit)}
      timeInUnits={unit}
    />
  ));
  return (
    <div className="Timeline">
      {items}
      <ConstrainedEventsContainer />
    </div>
  );
};

function buildRowUnits(numberOfUnits, startInUnits) {
  const items = [];
  for (let i = 0; i < numberOfUnits; i++) {
    items.push(startInUnits + i);
  }
  return items;
}
