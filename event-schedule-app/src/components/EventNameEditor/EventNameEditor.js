import React from "react";
import { TextInput } from "../TextInput/TextInput";

export const EventNameEditor = ({ event, setEventName }) => (
  <TextInput
    value={event.name}
    onChange={setEventName}
    name="eventNameEditor"
  />
);
