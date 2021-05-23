const Player: PlayerType = {
  PLAYER_1: {
    name: 'Player 1',
    value: 'P1',
  },
  PLAYER_2: {
    name: 'Player 2',
    value: 'P2',
  },
  COM: {
    name: 'Player COM',
    value: 'COM',
  },
  NONE: {
    name: 'NONE',
    value: 'NONE',
  },
} as const;

export default Player;
