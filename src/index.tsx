import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import Game from '~/components/pages/game';

ReactDOM.render(
  <Provider store={store}>
    <Game dataCy='game' />
  </Provider>,
  document.getElementById('root'),
);
