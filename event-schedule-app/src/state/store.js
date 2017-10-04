import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducer, INITIAL_STATE } from "./reducer";
import { solveOnBlur } from "../components/Events/EventsSagas";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(applyMiddleware(sagaMiddleware), devTools);

export const store = createStore(reducer, INITIAL_STATE, enhancer);

sagaMiddleware.run(solveOnBlur, store);
