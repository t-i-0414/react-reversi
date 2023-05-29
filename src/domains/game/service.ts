import { getPieceCountByColor } from '../board/service';
import { PieceColor } from '../piece/interface';
import type { Game, GameResult, GameScore } from './interface';

export const getResult = (game: Game): GameResult => {
  const { blackPiecePlayerInformation, whitePiecePlayerInformation } =
    getScore(game);
  const blackPiecePlayerScore = blackPiecePlayerInformation.score;
  const whitePiecePlayerScore = whitePiecePlayerInformation.score;

  if (blackPiecePlayerScore > whitePiecePlayerScore) {
    return {
      isDraw: false,
      winner: blackPiecePlayerInformation,
      loser: whitePiecePlayerInformation,
    };
  }

  if (blackPiecePlayerScore < whitePiecePlayerScore) {
    return {
      isDraw: false,
      winner: whitePiecePlayerInformation,
      loser: blackPiecePlayerInformation,
    };
  }

  return {
    isDraw: true,
    players: [blackPiecePlayerInformation, whitePiecePlayerInformation],
  };
};

export const getScore = (game: Game): GameScore => {
  const { currentTurnPiece, blackPiecePlayer, whitePiecePlayer } = game;
  const blackPieceScore = getPieceCountByColor(game.board, 'black');
  const whitePieceScore = getPieceCountByColor(game.board, 'white');

  return {
    currentTurnPiece,
    blackPiecePlayerInformation: {
      name: blackPiecePlayer.name,
      pieceColor: 'black',
      score: blackPieceScore,
    },
    whitePiecePlayerInformation: {
      name: whitePiecePlayer.name,
      pieceColor: 'white',
      score: whitePieceScore,
    },
  };
};

export const getNextTurnPiece = (currentTurnPiece: PieceColor): PieceColor =>
  currentTurnPiece === 'black' ? 'white' : 'black';
