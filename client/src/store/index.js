import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/index";

//import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(), thunk);

const store = createStore(
  rootReducer,
  middleware
);

export default store;
