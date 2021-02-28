import Const from 'src/const';

const { PlayerVal } = Const;

// Player value
declare type PlayerValType = typeof PlayerVal[keyof typeof PlayerVal];

// Square state
declare type SquareStateType = {
  id: number;
  column: number;
  row: number;
  val: PlayerValType;
};

// Board state
declare type BoardStateType = SquareStateType[];

// Whole state of Board states
declare type State = {
  board: BoardStateType;
};
