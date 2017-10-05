import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducer, INITIAL_STATE } from "./reducer";
import { solveOnBlur } from "../components/Events/EventsSagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(reducer, INITIAL_STATE, enhancer);

sagaMiddleware.run(solveOnBlur, store);
