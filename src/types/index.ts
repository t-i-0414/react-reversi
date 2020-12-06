// マスの状態
export type SqiuareState = { column: number; row: number; val: number };

// ボードの状態
export type BoardState = SqiuareState[];

// state全体の状態
export type State = {
  board: BoardState;
};
