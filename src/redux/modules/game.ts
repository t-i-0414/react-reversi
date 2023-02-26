import { Dispatch } from 'redux';
import { PlayerMap, PieceColor } from '~/const';
import type { Square, Board, Store, MapValues } from '~/types';

/**
 * action
 */
const UPDATE_GAME_START_FLAG = 'reversi/store/game/update-game-start-flag';
const UPDATE_SIDE_SQUARES_COUNT =
  'reversi/store/game/update-side-squares-count';
const UPDATE_BOARD = 'reversi/store/game/update-board';
const UPDATE_PLAYERS = 'reversi/store/game/update-players';
const CLEAR_STATE = 'reversi/store/game/clear-state';
const DO_NOTHING = 'reversi/store/game/do-nothing';

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

type UpdatePlayers = {
  type: typeof UPDATE_PLAYERS;
  payload: Store['game']['players'];
};

type ClearState = {
  type: typeof CLEAR_STATE;
};

type DoNothing = {
  type: typeof DO_NOTHING;
};

type ActionType =
  | UpdateGameStartFlag
  | UpdateSideSquaresCount
  | UpdateBoard
  | UpdatePlayers
  | ClearState
  | DoNothing;

/**
 * initial state
 */
export const initialState: Store['game'] = {
  isGameStarted: false,
  sideSquaresCount: 0,
  board: [],
  players: {
    black: {
      ...PlayerMap.PLAYER_1,
      pieceColor: PieceColor.BLACK,
      score: 0,
      current: true,
    },
    white: {
      ...PlayerMap.PLAYER_2,
      pieceColor: PieceColor.WHITE,
      score: 0,
      current: false,
    },
  },
};

/**
 * reducer
 */
export const gameReducer = (
  state: Store['game'] = initialState,
  action: ActionType = {
    type: 'reversi/store/game/do-nothing',
  },
): Store['game'] => {
  switch (action.type) {
    case UPDATE_GAME_START_FLAG:
      return {
        ...state,
        isGameStarted: action.payload,
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
    case UPDATE_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case CLEAR_STATE:
      return {
        ...initialState,
      };
    case DO_NOTHING:
      return state;
    default: {
      const _unreachable: never = action;

      return state;
    }
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

export const updatePlayers = (
  stagingPlayers: Store['game']['players'],
): UpdatePlayers => ({
  type: UPDATE_PLAYERS,
  payload: stagingPlayers,
});

export const clearState = (): ClearState => ({
  type: CLEAR_STATE,
});

export const initializeBoard =
  (sideSquaresCount: number) =>
  (dispatch: Dispatch): void => {
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
      let pieceColor: MapValues<typeof PieceColor> = PieceColor.INVISIBLE;

      /**
       * place four stones when the board is initially rendered
       */
      // upprer left square
      if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2 - 1) {
        pieceColor = PieceColor.WHITE;
      }

      // upper right square
      if (
        column === sideSquaresCount / 2 - 1 &&
        row === sideSquaresCount / 2 - 1
      ) {
        pieceColor = PieceColor.BLACK;
      }

      // lower left square
      if (column === sideSquaresCount / 2 && row === sideSquaresCount / 2) {
        pieceColor = PieceColor.BLACK;
      }

      // lower right square
      if (column === sideSquaresCount / 2 - 1 && row === sideSquaresCount / 2) {
        pieceColor = PieceColor.WHITE;
      }

      stagingBoard.push({
        key,
        column,
        row,
        pieceColor,
      });
    }

    dispatch(updateSideSquaresCount(sideSquaresCount));
    dispatch(updateBoard(stagingBoard));
  };

export const updateScore =
  () =>
  (dispatch: Dispatch, getState: () => Store): void => {
    const {
      game: { board, players },
    } = getState();

    const whitePiecesCount = board.reduce(
      (prev, square) => prev + (square.pieceColor === PieceColor.WHITE ? 1 : 0),
      0,
    );

    const blackPiecesCount = board.reduce(
      (prev, square) => prev + (square.pieceColor === PieceColor.BLACK ? 1 : 0),
      0,
    );

    const stagingPlayers = { ...players };

    stagingPlayers.white.score = whitePiecesCount;
    stagingPlayers.black.score = blackPiecesCount;

    dispatch(updatePlayers(stagingPlayers));
  };

export const changeGamesTurn =
  (square: Square, updatableSquaresArray: Square[]) =>
  (dispatch: Dispatch, getState: () => Store): void => {
    const {
      game: { board: stagingBoard, players },
    } = getState();
    const clickedSquare: Square = stagingBoard[square.key];

    const currentPlayerIndex = Object.entries(players).find(
      ([_id, player]) => player.current === true,
    )?.[0] as keyof Store['game']['players'];
    const currentPlayer = players[currentPlayerIndex];

    // change each the value of squares for pieces to be turn over
    updatableSquaresArray.forEach((updatableSquare: Square) => {
      stagingBoard[updatableSquare.key].pieceColor = currentPlayer.pieceColor;
    });

    // change the value of clicked square
    clickedSquare.pieceColor = currentPlayer.pieceColor;

    // switch the current player
    const stagingPlayers = Object.fromEntries(
      Object.entries(players).map(([key, player]) => {
        const stagingPlayer = { ...player };
        stagingPlayer.current = !stagingPlayer.current;

        return [key, stagingPlayer];
      }),
    ) as Store['game']['players'];

    dispatch(updateBoard(stagingBoard));
    dispatch(updatePlayers(stagingPlayers));
    updateScore();
  };
