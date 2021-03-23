import { Dispatch } from 'redux';
import Const from 'src/const';

const { PlayerVal } = Const;

const SET_GAME_START_FLAG = 'reversi/game/SET_GAME_START_FLAG';
const SET_BOARD = 'reversi/game/SET_BOARD';
const SET_SIDE_SQUARE_COUNT = 'reversi/game/SET_SIDE_SQUARE_COUNT';

type SetGameStartFlag = {
  type: typeof SET_GAME_START_FLAG;
  payload: boolean;
};

type setBoardStates = {
  type: typeof SET_BOARD;
  payload: BoardState;
};

type SetSideSquareCount = {
  type: typeof SET_SIDE_SQUARE_COUNT;
  payload: number;
};

type ActionType = SetGameStartFlag | setBoardStates | SetSideSquareCount;

const initialState = {
  isGameStart: false,
  boardSquaresArray: [],
  sideSquaresCount: 0,
};

type State = {
  isGameStart: boolean;
  boardSquaresArray: BoardState;
  sideSquaresCount: number;
};

// reducer
export default (state: State = initialState, action: ActionType): State => {
  switch (action.type) {
    case SET_GAME_START_FLAG:
      return {
        ...state,
        isGameStart: action.payload,
      };
    case SET_BOARD:
      return {
        ...state,
        boardSquaresArray: action.payload,
      };
    case SET_SIDE_SQUARE_COUNT:
      return {
        ...state,
        sideSquaresCount: action.payload,
      };
    default:
      return state;
  }
};

export const setGameStartFlg = (flag: boolean) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: SET_GAME_START_FLAG,
    payload: flag,
  });
};

export const setBoardStates = (sideSquaresCount: number) => (
  dispatch: Dispatch,
): void => {
  const totalSquareCount: number = sideSquaresCount ** 2;
  const stagingBoard: BoardState = [];

  for (let squareCount = 0; squareCount < totalSquareCount; squareCount += 1) {
    const id = squareCount;
    const column = squareCount % sideSquaresCount;
    const row = Math.floor(squareCount / sideSquaresCount);
    let val: UnionValType<typeof PlayerVal> = PlayerVal.NONE;

    // Place four stones on top of each other when the board is initially rendered
    // Upprer left square
    if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2 - 1) {
      val = PlayerVal.WHITE;
    }

    // Upper right square
    if (
      column === sideSquaresCount / 2 - 1 &&
      row === sideSquaresCount / 2 - 1
    ) {
      val = PlayerVal.BLACK;
    }

    // Lower left square
    if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2) {
      val = PlayerVal.BLACK;
    }

    // Lower right square
    if (column === sideSquaresCount / 2 - 1 && row === sideSquaresCount / 2) {
      val = PlayerVal.WHITE;
    }

    stagingBoard.push({
      id,
      column,
      row,
      val,
    });
  }

  dispatch({
    type: SET_BOARD,
    payload: stagingBoard,
  });
  dispatch({
    type: SET_SIDE_SQUARE_COUNT,
    payload: sideSquaresCount,
  });
};

export const updateBoard = (stagingBoard: BoardState) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: SET_BOARD,
    payload: stagingBoard,
  });
};
