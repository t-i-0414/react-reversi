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
    shortName: string;
    value: string;
  };
};

declare type PieceColorType = {
  WHITE: 'white';
  BLACK: 'black';
  INVISIBLE: 'invisible';
};

declare type GamePlayer = {
  player: UnionVal<PlayerType>;
  pieceColor: UnionVal<Pick<PieceColorType, 'WHITE' | 'BLACK'>>;
  score: number;
  current: boolean;
};

interface Store {
  game: {
    isGameStarted: boolean;
    board: Board;
    sideSquaresCount: number;
    players: {
      [key in 'white' | 'black']: GamePlayer;
    };
  };
}
