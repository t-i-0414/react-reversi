import { Dispatch } from 'redux';
import Const from 'src/const';

const { PlayerVal } = Const;

const SET_GAME_START_FLAG = 'reversi/store/game/SET_GAME_START_FLAG';
const SET_SIDE_SQUARES_COUNT = 'reversi/store/game/SET_SIDE_SQUARES_COUNT';
const SET_BOARD_STATE = 'reversi/store/game/SET_BOARD_STATE';

type SetGameStartFlag = {
  type: typeof SET_GAME_START_FLAG;
  payload: boolean;
};

type SetSideSquaresCount = {
  type: typeof SET_SIDE_SQUARES_COUNT;
  payload: number;
};

type setBoardState = {
  type: typeof SET_BOARD_STATE;
  payload: BoardState;
};

type ActionType = SetGameStartFlag | SetSideSquaresCount | setBoardState;

const initialState = {
  isGameStart: false,
  sideSquaresCount: 0,
  boardState: [],
};

// reducer
export default (
  state: StoreState['game'] = initialState,
  action: ActionType,
): StoreState['game'] => {
  switch (action.type) {
    case SET_GAME_START_FLAG:
      return {
        ...state,
        isGameStart: action.payload,
      };
    case SET_SIDE_SQUARES_COUNT:
      return {
        ...state,
        sideSquaresCount: action.payload,
      };
    case SET_BOARD_STATE:
      return {
        ...state,
        boardState: action.payload,
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

export const setTotalBoardStates = (sideSquaresCount: number) => (
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
    type: SET_SIDE_SQUARES_COUNT,
    payload: sideSquaresCount,
  });

  dispatch({
    type: SET_BOARD_STATE,
    payload: stagingBoard,
  });
};

export const updateBoardState = (stagingBoard: BoardState) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: SET_BOARD_STATE,
    payload: stagingBoard,
  });
};
