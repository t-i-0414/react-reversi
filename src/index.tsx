import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Game from '~/components/features/game/Game/Game';
import { store } from './store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Game dataCy='game' />
  </Provider>,
);
