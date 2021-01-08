import Const from 'src/const';

const { PlayerVal } = Const;

// Player value
export type PlayerValType = typeof PlayerVal[keyof typeof PlayerVal];

// Square state
export type SquareStateType = {
  id: number;
  column: number;
  row: number;
  val: PlayerValType;
};

// Board state
export type BoardStateType = SquareStateType[];

// Whole state of Board states
export type State = {
  board: BoardStateType;
};
