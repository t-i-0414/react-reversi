import { Dispatch } from 'redux';
import Const from 'src/const';

const { PlayerVal } = Const;

/**
 * action
 */
const SET_GAME_START_FLAG = 'reversi/store/game/SET_GAME_START_FLAG';
const SET_SIDE_SQUARES_COUNT = 'reversi/store/game/SET_SIDE_SQUARES_COUNT';
const SET_BOARD_STATE = 'reversi/store/game/SET_BOARD_STATE';
const UPDATE_CURRENT_PLAYER = 'reversi/store/game/UPDATE_CURRENT_PLAYER';

/**
 * action types
 */
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
  payload: Board;
};

type updateCurrentPlayer = {
  type: typeof UPDATE_CURRENT_PLAYER;
  payload: UnionValType<typeof PlayerVal>;
};

type ActionType =
  | SetGameStartFlag
  | SetSideSquaresCount
  | setBoardState
  | updateCurrentPlayer;

/**
 * initial state
 */
const initialState = {
  isGameStart: false,
  sideSquaresCount: 0,
  boardState: [],
  currentPlayer: PlayerVal.NONE,
};

/**
 * reducer
 */
export default (
  state: Store['game'] = initialState,
  action: ActionType,
): Store['game'] => {
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
    case UPDATE_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.payload,
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

export const initializeBoard = (sideSquaresCount: number) => (
  dispatch: Dispatch,
): void => {
  const squaresCountAmount: number = sideSquaresCount ** 2;
  const stagingBoard: Board = [];

  for (
    let squareCount = 0;
    squareCount < squaresCountAmount;
    squareCount += 1
  ) {
    const key = squareCount;
    const column = squareCount % sideSquaresCount;
    const row = Math.floor(squareCount / sideSquaresCount);
    let val: UnionValType<typeof PlayerVal> = PlayerVal.NONE;

    // place four stones when the board is initially rendered
    // upprer left square
    if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2 - 1) {
      val = PlayerVal.WHITE;
    }

    // upper right square
    if (
      column === sideSquaresCount / 2 - 1 &&
      row === sideSquaresCount / 2 - 1
    ) {
      val = PlayerVal.BLACK;
    }

    // lower left square
    if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2) {
      val = PlayerVal.BLACK;
    }

    // lower right square
    if (column === sideSquaresCount / 2 - 1 && row === sideSquaresCount / 2) {
      val = PlayerVal.WHITE;
    }

    stagingBoard.push({
      key,
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

export const updateBoardState = (stagingBoard: Board) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: SET_BOARD_STATE,
    payload: stagingBoard,
  });
};

export const updateCurrentPlayer = (
  stagingPlayer: UnionValType<typeof PlayerVal>,
) => (dispatch: Dispatch): void => {
  dispatch({
    type: UPDATE_CURRENT_PLAYER,
    payload: stagingPlayer,
  });
};

export const changeGamesTurn = (
  square: Square,
  updatableSquaresArray: Square[],
) => (dispatch: Dispatch, getState: () => Store): void => {
  const {
    game: { boardState: stagingBoardState, currentPlayer },
  } = getState();
  const clickedSquare: Square = stagingBoardState[square.key];

  // change each the value of squares for pieces to be turn over
  updatableSquaresArray.forEach((updatableSquare: Square) => {
    stagingBoardState[updatableSquare.key].val = currentPlayer;
  });

  // change the value of clicked square
  clickedSquare.val = currentPlayer;

  // switch the current player
  const nextPlayer =
    currentPlayer === PlayerVal.BLACK ? PlayerVal.WHITE : PlayerVal.BLACK;

  dispatch({
    type: SET_BOARD_STATE,
    payload: stagingBoardState,
  });
  dispatch({
    type: UPDATE_CURRENT_PLAYER,
    payload: nextPlayer,
  });
};
