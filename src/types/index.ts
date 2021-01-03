import Const from '../const';

const { PlayerVal } = Const;

// プレイヤーの値
export type PlayerValType = typeof PlayerVal[keyof typeof PlayerVal];

// マスの状態
export type SquareStateType = {
  id: number;
  column: number;
  row: number;
  val: PlayerValType;
};

// ボードの状態
export type BoardStateType = SquareStateType[];

// state全体の状態
export type State = {
  board: BoardStateType;
};
