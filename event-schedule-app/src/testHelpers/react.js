import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { buildInitialStateFromReducers } from "../state/initialState";

export function mockStore(stateExtensions) {
  return createStore(x => x, {
    ...buildInitialStateFromReducers(),
    ...stateExtensions
  });
}

export function render(component, stateExtensions = {}) {
  const div = document.createElement("div");
  return ReactDOM.render(
    <Provider store={mockStore(stateExtensions)}>{component}</Provider>,
    div
  );
}
