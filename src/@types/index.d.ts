/**
 * Utility Types
 */
declare type UnionValType<T> = T[keyof T];

/**
 * State Types
 */

declare type SquareState = {
  id: number;
  column: number;
  row: number;
  val: number;
};

declare type BoardState = SquareState[];

declare type PlayerValState = {
  WHITE: 1;
  BLACK: -1;
  NONE: 0;
};

interface StoreState {
  game: {
    isGameStart: boolean;
    boardState: BoardState;
    sideSquaresCount: number;
    currentPlayer: UnionValType<PlayerValState>;
  };
}
