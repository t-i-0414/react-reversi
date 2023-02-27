/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line camelcase
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { reducer } from './reducer';

const middleware = [reduxThunk];

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare let window: ExtendedWindow;
const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

declare namespace NodeJS {
  // eslint-disable-next-line no-unused-vars
  interface Global {
    IS_TEST: boolean;
  }
}
declare let global: NodeJS.Global;
if (process.env.NODE_ENV !== 'production' && !global.IS_TEST) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware.push(logger as any);
}

export const store = legacy_createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
