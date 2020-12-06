import { Reducer } from 'redux';
import { BoardAction, boardActionType as type } from './actions';
import { State } from './types';

export const initialState: State = {
  board: [{ column: 0, row: 0, val: 0 }],
};

export const boardReducer: Reducer<State, BoardAction> = (
  state: State = initialState,
  action: BoardAction,
): State => {
  switch (action.type) {
    case type.ADD_SQUARES:
      return {
        ...state,
        board: action.add ?? [{ column: 0, row: 0, val: 0 }],
      };
    case type.TO_WHITE:
      return {
        ...state,
        board: state.board.slice(),
      };
    case type.TO_BLACK:
      return {
        ...state,
        board: state.board.slice(),
      };
    default: {
      const _: never = action.type;

      return state;
    }
  }
};
