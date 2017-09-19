import { createStore } from "redux";

import { reducer, INITIAL_STATE } from "./reducer";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducer, INITIAL_STATE, devTools);
