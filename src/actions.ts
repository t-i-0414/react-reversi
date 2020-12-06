import { BoardState } from './types';

export const boardActionType = {
  ADD_SQUARES: 'ADD_SQUARES',
  TO_WHITE: 'TO_WHITE',
  TO_BLACK: 'TO_BLACK',
} as const;

type ValueOf<T> = T[keyof T];

export type BoardAction = {
  type: ValueOf<typeof boardActionType>;
  add?: BoardState;
  val?: number;
};

export const addSquares = (add: BoardState): BoardAction => ({
  type: boardActionType.ADD_SQUARES,
  add,
});

export const toWhite = (val: number): BoardAction => ({
  type: boardActionType.TO_WHITE,
  val,
});

export const toBlack = (val: number): BoardAction => ({
  type: boardActionType.TO_BLACK,
  val,
});
