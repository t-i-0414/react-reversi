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
};

declare type PieceColorType = {
  WHITE: 'white';
  BLACK: 'black';
  INVISIBLE: 'invisible';
};

interface Store {
  game: {
    isGameStart: boolean;
    board: Board;
    sideSquaresCount: number;
    currentPlayer: UnionVal<PieceColorType>;
    score: {
      white: number;
      black: number;
    };
  };
}
