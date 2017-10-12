import React from "react";
import { Button } from "react-bootstrap";

export const FinishEditingButton = ({ deselectEvent }) => (
  <Button bsStyle="primary" onClick={deselectEvent}>
    Done
  </Button>
);
