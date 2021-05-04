import { Dispatch } from 'redux';
import Const from 'src/const';

const { Player } = Const;

/**
 * action
 */
const UPDATE_GAME_START_FLAG = 'reversi/store/game/update-game-start-flag';
const UPDATE_SIDE_SQUARES_COUNT =
  'reversi/store/game/update-side-squares-count';
const UPDATE_BOARD = 'reversi/store/game/update-board';
const UPDATE_CURRENT_PLAYER = 'reversi/store/game/update-current-player';
const UPDATE_SCORE = 'reservi/store/game/update-score';

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
type UpdateScore = {
  type: typeof UPDATE_SCORE;
  payload: {
    white: number;
    black: number;
  };
};

type ActionType =
  | UpdateGameStartFlag
  | UpdateSideSquaresCount
  | UpdateBoard
  | UpdateCurrentPlayer
  | UpdateScore;

/**
 * initial state
 */
const initialState = {
  isGameStart: false,
  sideSquaresCount: 0,
  board: [],
  currentPlayer: Player.NONE,
  score: {
    white: 0,
    black: 0,
  },
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
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.payload,
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

export const updateScore = (stagingScore: {
  white: number;
  black: number;
}): UpdateScore => ({
  type: UPDATE_SCORE,
  payload: stagingScore,
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
  countScore();
};

export const countScore = () => (
  dispatch: Dispatch,
  getState: () => Store,
): void => {
  const {
    game: { board },
  } = getState();

  const whitePiecesCount = board.reduce((prev, square) => {
    return prev + (square.val === Player.WHITE ? 1 : 0);
  }, 0);

  const blackPiecesCount = board.reduce((prev, square) => {
    return prev + (square.val === Player.BLACK ? 1 : 0);
  }, 0);

  dispatch(
    updateScore({
      white: whitePiecesCount,
      black: blackPiecesCount,
    }),
  );
};
