import { BoardStateType } from 'src/@types';

const SET_BOARD = 'reversi/board/SET_BOARD';

type SetBoard = {
  type: typeof SET_BOARD;
  payload: BoardStateType;
};

type ActionType = SetBoard;

const initialState = {
  board: [],
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    default:
      return state;
  }
};

// updating...
