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
declare type BoardState = Square[];

interface StoreState {
  game: {
    isGameStart: boolean;
    boardSquaresArray: BoardState;
    sideSquaresCount: number;
  };
}
