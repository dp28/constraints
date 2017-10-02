import React from "react";

export const NewEventButton = ({ createEvent }) => (
  <button onClick={() => createEvent(10, 20)}>Add event</button>
);
