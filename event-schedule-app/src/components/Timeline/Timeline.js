import React from "react";

import { TimeBoundsContainer } from "../TimeBounds/TimeBoundsContainer";
import { TimelineRow } from "../TimelineRow/TimelineRow";
import { ConstrainedEventsContainer } from "../ConstrainedEvents/ConstrainedEventsContainer";
import "./Timeline.css";

export const Timeline = ({
  toMinutes,
  numberOfUnits,
  startInUnits,
  timeClicked,
  timeHovered
}) => {
  const items = buildRowUnits(numberOfUnits, startInUnits).map(unit => (
    <TimelineRow
      key={unit}
      timeInMinutes={toMinutes(unit)}
      timeInUnits={unit}
      onClick={() => timeClicked(unit)}
      onEnter={() => timeHovered(unit)}
    />
  ));
  return (
    <div className="Timeline">
      {items}
      <ConstrainedEventsContainer />
      <TimeBoundsContainer />
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
