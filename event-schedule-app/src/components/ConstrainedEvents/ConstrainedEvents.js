import React from "react";

import { ConstrainedEvent } from "../ConstrainedEvent/ConstrainedEvent";

export const ConstrainedEvents = ({ events }) => (
  <div className="ConstrainedEvents">
    {events.map(event => <ConstrainedEvent key={event.id} event={event} />)}
  </div>
);
