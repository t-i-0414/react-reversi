// マスの状態
export type SquareState = {
  id: number;
  column: number;
  row: number;
  val: number;
};

// ボードの状態
export type BoardState = SquareState[];

// state全体の状態
export type State = {
  board: BoardState;
};