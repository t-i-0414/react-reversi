/* eslint-disable @typescript-eslint/no-namespace */
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

const middleware = [reduxThunk];

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare let window: ExtendedWindow;
const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

declare namespace NodeJS {
  interface Global {
    IS_TEST: boolean;
  }
}
declare let global: NodeJS.Global;
if (process.env.NODE_ENV !== 'production' && !global.IS_TEST) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware.push(logger as any);
}

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
