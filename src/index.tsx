import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Game from '~/components/pages/game';
import { store } from './redux';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  // @ts-ignore
  <Provider store={store}>
    <Game dataCy='game' />
  </Provider>,
);
