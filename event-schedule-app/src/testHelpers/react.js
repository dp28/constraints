import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { INITIAL_STATE } from "../state/reducer";

export function mockStore(state = INITIAL_STATE) {
  return createStore(x => x, state);
}

export function render(component) {
  const div = document.createElement("div");
  return ReactDOM.render(
    <Provider store={mockStore()}>{component}</Provider>,
    div
  );
}
