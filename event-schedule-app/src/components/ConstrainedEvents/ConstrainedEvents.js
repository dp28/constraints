import React from "react";

import { ConstrainedEventContainer } from "../ConstrainedEvent/ConstrainedEventContainer";

export const ConstrainedEvents = ({ events }) => (
  <div className="ConstrainedEvents">
    {events.map(event => (
      <ConstrainedEventContainer key={event.id} event={event} />
    ))}
  </div>
);
