import React from "react";

import { EventContainer } from "../Event/EventContainer";

export const Events = ({ events }) => (
  <div className="Events">
    {events.map(event => (
      <EventContainer key={event.id} event={event} />
    ))}
  </div>
);
