import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Game from '~/components/pages/game';
import { store } from './redux';

ReactDOM.render(
  <Provider store={store}>
    <Game dataCy='game' />
  </Provider>,
  document.getElementById('root'),
);
