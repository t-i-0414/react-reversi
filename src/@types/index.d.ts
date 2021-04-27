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
  val: number;
};

declare type Board = Square[];

declare type Player = {
  WHITE: 1;
  BLACK: -1;
  NONE: 0;
};

interface Store {
  game: {
    isGameStart: boolean;
    board: Board;
    sideSquaresCount: number;
    currentPlayer: UnionVal<Player>;
  };
}
