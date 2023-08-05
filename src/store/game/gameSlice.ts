/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Game, Board, Player, PieceColor } from '~/domains';

export type StartGamePayload = {
  board: Board;
  blackPiecePlayer: Player;
  whitePiecePlayer: Player;
  currentTurnPiece: PieceColor;
};

export type UpdateBoardPayload = {
  board: Board;
};

export type ChangeCurrentTurnPiecePayload = {
  pieceColor: PieceColor;
};

export const initialState: Game = {
  isStarted: false,
  board: [],
  blackPiecePlayer: {
    name: '',
  },
  whitePiecePlayer: {
    name: '',
  },
  currentTurnPiece: 'black',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<StartGamePayload>) => {
      state.isStarted = true;
      state.board = action.payload.board;
      state.blackPiecePlayer = action.payload.blackPiecePlayer;
      state.whitePiecePlayer = action.payload.whitePiecePlayer;
      state.currentTurnPiece = action.payload.currentTurnPiece;
    },
    updateBoard: (state, action: PayloadAction<UpdateBoardPayload>) => {
      state.board = action.payload.board;
    },
    changeCurrentTurnPiece: (
      state,
      action: PayloadAction<ChangeCurrentTurnPiecePayload>,
    ) => {
      state.currentTurnPiece = action.payload.pieceColor;
    },
    resetGame: () => initialState,
  },
});

export const { startGame, updateBoard, changeCurrentTurnPiece, resetGame } =
  gameSlice.actions;
export const { reducer } = gameSlice;
