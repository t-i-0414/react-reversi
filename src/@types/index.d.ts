// Utility Types
declare type UnionValType<T> = T[keyof T];

// Square Type
declare type SquareType = {
  id: number;
  column: number;
  row: number;
  val: number;
};

// Board Type
declare type BoardType = SquareType[];
