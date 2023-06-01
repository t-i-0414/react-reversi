import { base as boardMock } from '~/domains/board/mock';
import {
  player as playerMock,
  playerInformation as playerInformationMock,
} from '~/domains/player/mock';
import type { Game, GameResult, GameScore } from './interface';

export const game: Game = {
  isStarted: false,
  board: boardMock,
  blackPiecePlayer: playerMock.player1,
  whitePiecePlayer: playerMock.player2,
  currentTurnPiece: 'black',
};

export const gameResult: GameResult = {
  isDraw: false,
  winner: playerInformationMock.player1Information,
  loser: playerInformationMock.player2Information,
};

export const gameResultDraw: GameResult = {
  isDraw: true,
  players: [
    {
      ...playerInformationMock.player1Information,
      score: 2,
    },
    {
      ...playerInformationMock.player2Information,
      score: 2,
    },
  ],
};

export const gameScore: GameScore = {
  currentTurnPiece: 'black',
  blackPiecePlayerInformation: playerInformationMock.player1Information,
  whitePiecePlayerInformation: playerInformationMock.player2Information,
};
