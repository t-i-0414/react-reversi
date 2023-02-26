import { combineReducers } from 'redux';
import { gameReducer } from './modules/game';

export const reducer = combineReducers({
  game: gameReducer,
});
