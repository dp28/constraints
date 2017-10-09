import React from "react";

import { NewEventButtonContainer } from "../NewEventButton/NewEventButtonContainer";
import { EventNameEditorContainer } from "../EventNameEditor/EventNameEditorContainer";

export const Tools = ({ currentEvent }) => (
  <div>
    {!currentEvent && <NewEventButtonContainer />}
    {currentEvent && <EventNameEditorContainer event={currentEvent} />}
  </div>
);
