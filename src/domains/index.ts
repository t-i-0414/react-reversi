import {
  createBoard,
  turnOverPieces,
  updateBoardByNextTurnPiece,
  getSquaresHavingCanTurnOverPieceByEachDirection,
  getBoardSideSquareCount,
} from './board/service';
import {
  getNextTurnPiece,
  getScore,
  getResult,
  isGameFinished,
} from './game/service';

export type * from './board/interface';
export type * from './game/interface';
export type * from './piece/interface';
export type * from './player/interface';
export type * from './square/interface';
export * as BoardMock from './board/mock';
export * as GameMock from './game/mock';
export * as PlayerMock from './player/mock';

export const BoardDomainService = {
  createBoard,
  turnOverPieces,
  updateBoardByNextTurnPiece,
  getSquaresHavingCanTurnOverPieceByEachDirection,
  getBoardSideSquareCount,
};
export const GameDomainService = {
  getNextTurnPiece,
  getScore,
  getResult,
  isGameFinished,
};
