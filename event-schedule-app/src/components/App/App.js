import React from "react";
import { TimelineContainer } from "../Timeline/TimelineContainer";
import "./App.css";

export const App = () => (
  <div className="App">
    <TimelineContainer numberOfUnits={24 * 4} startInUnits={0} />
  </div>
);
