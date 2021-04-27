import { Dispatch } from 'redux';
import Const from 'src/const';

const { Player } = Const;

/**
 * action
 */
const UPDATE_GAME_START_FLAG = 'reversi/store/game/UPDATE_GAME_START_FLAG';
const UPDATE_SIDE_SQUARES_COUNT =
  'reversi/store/game/UPDATE_SIDE_SQUARES_COUNT';
const UPDATE_BOARD = 'reversi/store/game/UPDATE_BOARD';
const UPDATE_CURRENT_PLAYER = 'reversi/store/game/UPDATE_CURRENT_PLAYER';

/**
 * action types
 */
type UpdateGameStartFlag = {
  type: typeof UPDATE_GAME_START_FLAG;
  payload: boolean;
};

type UpdateSideSquaresCount = {
  type: typeof UPDATE_SIDE_SQUARES_COUNT;
  payload: number;
};

type UpdateBoard = {
  type: typeof UPDATE_BOARD;
  payload: Board;
};

type UpdateCurrentPlayer = {
  type: typeof UPDATE_CURRENT_PLAYER;
  payload: UnionVal<typeof Player>;
};

type ActionType =
  | UpdateGameStartFlag
  | UpdateSideSquaresCount
  | UpdateBoard
  | UpdateCurrentPlayer;

/**
 * initial state
 */
const initialState = {
  isGameStart: false,
  sideSquaresCount: 0,
  board: [],
  currentPlayer: Player.NONE,
};

/**
 * reducer
 */
export default (
  state: Store['game'] = initialState,
  action: ActionType,
): Store['game'] => {
  switch (action.type) {
    case UPDATE_GAME_START_FLAG:
      return {
        ...state,
        isGameStart: action.payload,
      };
    case UPDATE_SIDE_SQUARES_COUNT:
      return {
        ...state,
        sideSquaresCount: action.payload,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        board: action.payload,
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

export const updateGameStartFlg = (flag: boolean): UpdateGameStartFlag => ({
  type: UPDATE_GAME_START_FLAG,
  payload: flag,
});

export const updateSideSquaresCount = (
  sideSquaresCount: number,
): UpdateSideSquaresCount => ({
  type: UPDATE_SIDE_SQUARES_COUNT,
  payload: sideSquaresCount,
});

export const updateBoard = (stagingBoard: Board): UpdateBoard => ({
  type: UPDATE_BOARD,
  payload: stagingBoard,
});

export const updateCurrentPlayer = (
  stagingPlayer: UnionVal<typeof Player>,
): UpdateCurrentPlayer => ({
  type: UPDATE_CURRENT_PLAYER,
  payload: stagingPlayer,
});

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
    let val: UnionVal<typeof Player> = Player.NONE;

    // place four stones when the board is initially rendered
    // upprer left square
    if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2 - 1) {
      val = Player.WHITE;
    }

    // upper right square
    if (
      column === sideSquaresCount / 2 - 1 &&
      row === sideSquaresCount / 2 - 1
    ) {
      val = Player.BLACK;
    }

    // lower left square
    if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2) {
      val = Player.BLACK;
    }

    // lower right square
    if (column === sideSquaresCount / 2 - 1 && row === sideSquaresCount / 2) {
      val = Player.WHITE;
    }

    stagingBoard.push({
      key,
      column,
      row,
      val,
    });
  }

  dispatch(updateSideSquaresCount(sideSquaresCount));
  dispatch(updateBoard(stagingBoard));
};

export const changeGamesTurn = (
  square: Square,
  updatableSquaresArray: Square[],
) => (dispatch: Dispatch, getState: () => Store): void => {
  const {
    game: { board: stagingBoard, currentPlayer },
  } = getState();
  const clickedSquare: Square = stagingBoard[square.key];

  // change each the value of squares for pieces to be turn over
  updatableSquaresArray.forEach((updatableSquare: Square) => {
    stagingBoard[updatableSquare.key].val = currentPlayer;
  });

  // change the value of clicked square
  clickedSquare.val = currentPlayer;

  // switch the current player
  const nextPlayer =
    currentPlayer === Player.BLACK ? Player.WHITE : Player.BLACK;

  dispatch(updateBoard(stagingBoard));
  dispatch(updateCurrentPlayer(nextPlayer));
};
