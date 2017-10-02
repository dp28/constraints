import React from "react";

import { TimelineContainer } from "../Timeline/TimelineContainer";
import { NewEventButtonContainer } from "../NewEventButton/NewEventButtonContainer";
import "./App.css";

export const App = () => (
  <div className="App">
    <NewEventButtonContainer />
    <TimelineContainer numberOfUnits={24 * 4} startInUnits={0} />
  </div>
);
