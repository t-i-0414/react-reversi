import { expect, it } from '@jest/globals';
import { Board } from '../board/interface';
import { PieceColor } from '../piece/interface';
import { Game } from './interface';
import { game as gameMock } from './mock';
import {
  getResult,
  getScore,
  getNextTurnPiece,
  isGameFinished,
} from './service';

describe('gameDomainService', () => {
  describe('getResult', () => {
    it('should return result (winner: white piece player)', () => {
      const game: Game = structuredClone(gameMock);
      game.board[0] = {
        key: '0-0',
        column: 0,
        row: 0,
        piece: 'black',
      };

      const result = getResult(game);

      const expected = {
        isDraw: false,
        winner: {
          name: game.blackPiecePlayer.name,
          pieceColor: 'black',
          score: 3,
        },
        loser: {
          name: game.whitePiecePlayer.name,
          pieceColor: 'white',
          score: 2,
        },
      };

      expect(result).toStrictEqual(expected);
    });

    it('should return result (winner: black piece player)', () => {
      const game: Game = structuredClone(gameMock);
      game.board[0] = {
        key: '0-0',
        column: 0,
        row: 0,
        piece: 'white',
      };

      const result = getResult(game);

      const expected = {
        isDraw: false,
        winner: {
          name: game.whitePiecePlayer.name,
          pieceColor: 'white',
          score: 3,
        },
        loser: {
          name: game.blackPiecePlayer.name,
          pieceColor: 'black',
          score: 2,
        },
      };

      expect(result).toStrictEqual(expected);
    });

    it('should return result (draw)', () => {
      const result = getResult(gameMock);

      const expected = {
        isDraw: true,
        players: [
          {
            name: gameMock.blackPiecePlayer.name,
            pieceColor: 'black',
            score: 2,
          },
          {
            name: gameMock.whitePiecePlayer.name,
            pieceColor: 'white',
            score: 2,
          },
        ],
      };

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getScore', () => {
    it('should return score', () => {
      const result = getScore(gameMock);

      const expected = {
        currentTurnPiece: 'black',
        blackPiecePlayerInformation: {
          name: gameMock.blackPiecePlayer.name,
          pieceColor: 'black',
          score: 2,
        },
        whitePiecePlayerInformation: {
          name: gameMock.whitePiecePlayer.name,
          pieceColor: 'white',
          score: 2,
        },
      };

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getNextTurnPiece', () => {
    const testCases: {
      currentTurnPiece: PieceColor;
      expected: PieceColor;
    }[] = [
      {
        currentTurnPiece: 'black',
        expected: 'white',
      },
      {
        currentTurnPiece: 'white',
        expected: 'black',
      },
    ];

    it.each(testCases)(
      'should return next turn piece(currentTurnPiece: $currentTurnPiece, expected: $expected)',
      ({ currentTurnPiece, expected }) => {
        const result = getNextTurnPiece(currentTurnPiece);

        expect(result).toBe(expected);
      },
    );
  });

  describe('isGameFinished', () => {
    const testCases: {
      case: string;
      board: Board;
      expected: boolean;
    }[] = [
      {
        case: 'when blackPiece win',
        board: [
          {
            key: '0-0',
            column: 0,
            row: 0,
            piece: 'black',
          },
        ],
        expected: true,
      },
      {
        case: 'when whitePiece win',
        board: [
          {
            key: '0-0',
            column: 0,
            row: 0,
            piece: 'white',
          },
        ],
        expected: true,
      },
      {
        case: 'when blackPiece only',
        board: [
          {
            key: '0-0',
            column: 0,
            row: 0,
            piece: 'black',
          },
          {
            key: '1-0',
            column: 1,
            row: 0,
            piece: null,
          },
        ],
        expected: true,
      },
      {
        case: 'when whitePiece only',
        board: [
          {
            key: '0-0',
            column: 0,
            row: 0,
            piece: 'white',
          },
          {
            key: '1-0',
            column: 1,
            row: 0,
            piece: null,
          },
        ],
        expected: true,
      },
      {
        case: 'when the game is in progress',
        board: gameMock.board,
        expected: false,
      },
    ];
    it.each(testCases)(
      'should return $expected ($case)',
      ({ board, expected }: { board: Board; expected: boolean }) => {
        const game: Game = structuredClone(gameMock);
        game.board = board;

        const result = isGameFinished(game);

        expect(result).toBe(expected);
      },
    );

    it('should return false', () => {
      const result = isGameFinished(gameMock);

      expect(result).toBe(false);
    });
  });
});
