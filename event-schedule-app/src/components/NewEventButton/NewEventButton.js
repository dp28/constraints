import React from "react";
import { Button } from "react-bootstrap";

export const NewEventButton = ({ createEvent }) => (
  <Button bsStyle="primary" onClick={() => createEvent(10, 20)}>
    Add event
  </Button>
);
