import React from "react";
import { FormControl } from "react-bootstrap";

export const EventNameEditor = ({ event, setEventName }) => (
  <FormControl type="text" value={event.name} onChange={setEventName} />
);
