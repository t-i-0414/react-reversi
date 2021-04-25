/**
 * Utility Types
 */
declare type UnionValType<T> = T[keyof T];

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

declare type PlayerValState = {
  WHITE: 1;
  BLACK: -1;
  NONE: 0;
};

interface Store {
  game: {
    isGameStart: boolean;
    boardState: Board;
    sideSquaresCount: number;
    currentPlayer: UnionValType<PlayerValState>;
  };
}
