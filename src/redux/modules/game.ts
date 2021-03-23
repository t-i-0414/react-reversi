import { Dispatch } from 'redux';
import Const from 'src/const';

const { PlayerVal } = Const;

const SET_GAME_START_FLAG = 'reversi/store/game/SET_GAME_START_FLAG';
const SET_SIDE_SQUARES_COUNT = 'reversi/store/game/SET_SIDE_SQUARES_COUNT';
const SET_BOARD_STATE = 'reversi/store/game/SET_BOARD_STATE';
const UPDATE_CURRENT_PLAYER = 'reversi/store/game/UPDATE_CURRENT_PLAYER';

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

type updateCurrentPlayer = {
  type: typeof UPDATE_CURRENT_PLAYER;
  payload: UnionValType<typeof PlayerVal>;
};

type ActionType =
  | SetGameStartFlag
  | SetSideSquaresCount
  | setBoardState
  | updateCurrentPlayer;

const initialState = {
  isGameStart: false,
  sideSquaresCount: 0,
  boardState: [],
  currentPlayer: PlayerVal.NONE,
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

export const updateCurrentPlayer = (
  stagingPlayer: UnionValType<typeof PlayerVal>,
) => (dispatch: Dispatch): void => {
  dispatch({
    type: UPDATE_CURRENT_PLAYER,
    payload: stagingPlayer,
  });
};

// Method to get the squares to turn over from the passed array
export const getShouldReversibleSquaresArray = (
  baseSquare: SquareState,
  board: BoardState,
  sideSquaresCount: number,
  currentPlayer: UnionValType<PlayerValState>,
): SquareState[] => {
  const surroundingSquares: Array<SquareState[]> = [];

  // Get the array of squares from the starting square to the left of the board.
  surroundingSquares.push(
    board
      .filter((square: SquareState) => {
        return !!(
          square.row === baseSquare.row && square.column < baseSquare.column
        );
      })
      .reverse(), // Reverse to use the clicked square as a starting point
  );

  // Get the array of squares on the right side of the board from the starting square
  surroundingSquares.push(
    board.filter((square: SquareState) => {
      return !!(
        square.row === baseSquare.row && square.column > baseSquare.column
      );
    }),
  );

  // Get an array of squares from the starting square to the top of the board
  surroundingSquares.push(
    board
      .filter((square: SquareState) => {
        return !!(
          square.row < baseSquare.row && square.column === baseSquare.column
        );
      })
      .reverse(), // Reverse to use the clicked square as a starting point
  );

  // Get an array of squares from the starting square to the bottom of the board
  surroundingSquares.push(
    board.filter((square: SquareState) => {
      return !!(
        square.row > baseSquare.row && square.column === baseSquare.column
      );
    }),
  );

  // Get an array of squares from the starting square to the top left corner of the board
  const upperLeftDiagonalSideSquaresArray: SquareState[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number = baseSquare.id - sideSquaresCount * count - count;
    if (squareId >= 0 && squareId < board.length) {
      upperLeftDiagonalSideSquaresArray.push(board[squareId]);
    }
  }
  surroundingSquares.push(upperLeftDiagonalSideSquaresArray);

  // Get an array of squares from the starting square to the top right corner of the board
  const upperRightDiagonalSideSquaresArray: SquareState[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number = baseSquare.id - sideSquaresCount * count + count;
    if (squareId > 0 && squareId < board.length) {
      upperRightDiagonalSideSquaresArray.push(board[squareId]);
    }
  }
  surroundingSquares.push(upperRightDiagonalSideSquaresArray);

  // Get an array of squares from the starting square to the bottom left corner of the board
  const lowerLeftDiagonalSideSquaresArray: SquareState[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number = baseSquare.id + sideSquaresCount * count - count;
    if (squareId >= 0 && squareId < board.length - 1) {
      lowerLeftDiagonalSideSquaresArray.push(board[squareId]);
    }
  }
  surroundingSquares.push(lowerLeftDiagonalSideSquaresArray);

  // Get an array of squares from the starting square to the bottom right corner of the board
  const lowerRightDiagonalSideSquaresArray: SquareState[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number = baseSquare.id + sideSquaresCount * count + count;
    if (squareId >= 0 && squareId < board.length) {
      lowerRightDiagonalSideSquaresArray.push(board[squareId]);
    }
  }
  surroundingSquares.push(lowerRightDiagonalSideSquaresArray);

  const reversibleSquaresArray: SquareState[] = [];

  surroundingSquares.forEach((squareArray) => {
    const emptySquareIndex: number = squareArray.findIndex(
      (square) => square.val === 0,
    );
    if (emptySquareIndex !== -1) {
      squareArray.splice(emptySquareIndex, squareArray.length);
    }

    const endpointSquareIndex: number = squareArray.findIndex(
      (square) => square.val === currentPlayer,
    );
    squareArray.splice(Math.max(0, endpointSquareIndex), squareArray.length);

    reversibleSquaresArray.push(...squareArray);
  });

  return reversibleSquaresArray;
};
