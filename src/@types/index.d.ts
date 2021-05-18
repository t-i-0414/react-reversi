/**
 * Utility Types
 */
declare type UnionVal<T> = T[keyof T];

/**
 * State Types
 */
declare type Square = {
  key: number;
  column: number;
  row: number;
  pieceColor: UnionVal<PieceColorType>;
};

declare type Board = Square[];

declare type PlayerType = {
  PLAYER_1: 'P1';
  PLAYER_2: 'P2';
  COM: 'com';
  NONE: 'none';
};

declare type PieceColorType = {
  WHITE: 'white';
  BLACK: 'black';
  INVISIBLE: 'invisible';
};

declare type GamePlayer = {
  player: UnionVal<PlayerType>;
  pieceColor: UnionVal<PieceColorType>;
};

interface Store {
  game: {
    isGameStart: boolean;
    board: Board;
    sideSquaresCount: number;
    currentPlayer: GamePlayer;
    score: {
      white: number;
      black: number;
    };
  };
}
