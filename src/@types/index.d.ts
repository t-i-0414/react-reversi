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
  [index: string]: {
    name: string;
    value: string;
  };
};

declare type PieceColorType = {
  WHITE: 'white';
  BLACK: 'black';
  INVISIBLE: 'invisible';
};

declare type GamePlayer = {
  player: PlayerType[keyof PlayerType];
  pieceColor: UnionVal<PieceColorType>;
  score: number;
  current: boolean;
};

interface Store {
  game: {
    isGameStart: boolean;
    board: Board;
    sideSquaresCount: number;
    players: {
      [index: string]: GamePlayer;
    };
  };
}
