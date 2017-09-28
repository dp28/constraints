import React from "react";

import { ConstrainedEvent } from "../ConstrainedEvent/ConstrainedEvent";
import "./ConstrainedEvents.css";

export const ConstrainedEvents = ({ pixelsPerUnit, events }) => (
  <div className="ConstrainedEvents">
    {events.map(event => (
      <ConstrainedEvent
        key={event.id}
        pixelsPerUnit={pixelsPerUnit}
        event={event}
      />
    ))}
  </div>
);
