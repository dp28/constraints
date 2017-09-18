import React from "react";
import { Timeline } from "../Timeline";
import "./App.css";

export const App = () => (
  <div className="App">
    <Timeline numberOfUnits={24 * 4} minutesPerUnit={15} startInUnits={0} />
  </div>
);
