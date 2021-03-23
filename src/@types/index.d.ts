// Utility Types
declare type UnionValType<T> = T[keyof T];

// Square Type
declare type SquareState = {
  id: number;
  column: number;
  row: number;
  val: number;
};

// Board Type
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
