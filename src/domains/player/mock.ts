import type { Player, PlayerInformation } from './interface';

const player1: Player = {
  name: 'Player1',
};

const player2: Player = {
  name: 'Player2',
};

export const player = {
  player1,
  player2,
};
const player1Information: PlayerInformation = {
  name: player1.name,
  pieceColor: 'black',
  score: 2,
};
const player2Information: PlayerInformation = {
  name: player2.name,
  pieceColor: 'white',
  score: 1,
};

export const playerInformation = {
  player1Information,
  player2Information,
};
