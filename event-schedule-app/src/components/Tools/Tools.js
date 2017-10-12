import React from "react";

import { NewEventButtonContainer } from "../NewEventButton/NewEventButtonContainer";
import { EventNameEditorContainer } from "../EventNameEditor/EventNameEditorContainer";
import { FinishEditingButtonContainer } from "../FinishEditingButton/FinishEditingButtonContainer";

export const Tools = ({ currentEvent }) => (
  <div>
    {!currentEvent && <NewEventButtonContainer />}
    {currentEvent && (
      <div>
        <EventNameEditorContainer event={currentEvent} />
        <FinishEditingButtonContainer event={currentEvent} />
      </div>
    )}
  </div>
);
