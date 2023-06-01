import type { Board } from '~/domains/board/interface';
import type { PieceColor } from '~/domains/piece/interface';
import type { Player, PlayerInformation } from '~/domains/player/interface';

export type Game = {
  isStarted: boolean;
  board: Board;
  blackPiecePlayer: Player;
  whitePiecePlayer: Player;
  currentTurnPiece: PieceColor;
};

export type GameResult =
  | {
      isDraw: false;
      winner: PlayerInformation;
      loser: PlayerInformation;
    }
  | {
      isDraw: true;
      players: [PlayerInformation, PlayerInformation];
    };

export type GameScore = {
  currentTurnPiece: PieceColor;
  blackPiecePlayerInformation: PlayerInformation;
  whitePiecePlayerInformation: PlayerInformation;
};
