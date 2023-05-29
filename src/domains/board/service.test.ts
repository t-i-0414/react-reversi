import { expect, it } from '@jest/globals';
import { Board } from '~/domains/board/interface';
import type { Square } from '~/domains/square/interface';
import { base as BoardMock } from './mock';
import {
  getPieceCountByColor,
  getBoardSideSquareCount,
  getLeftSquaresByLocation,
  getRightSquaresByLocation,
  getTopSquaresByLocation,
  getBottomSquaresByLocation,
  getUpperLeftSquaresByLocation,
  getUpperRightSquaresByLocation,
  getLowerLeftSquaresByLocation,
  getLowerRightSquaresByLocation,
  getEachDirectionSquaresByLocation,
  getSquaresHavingCanTurnOverPiece,
  getSquaresHavingCanTurnOverPieceByEachDirection,
  turnOverPieces,
  updateBoardByNextTurnPiece,
} from './service';

describe('boardDomainService', () => {
  describe('getPieceCountByColor', () => {
    it('should return piece count by color', () => {
      const pieceColor = 'white';

      const result = getPieceCountByColor(BoardMock, pieceColor);

      const expected = 2;

      expect(result).toBe(expected);
    });
  });

  describe('getBoardSideSquareCount', () => {
    it('should return board side square count', () => {
      const result = getBoardSideSquareCount(BoardMock);

      const expected = 4;

      expect(result).toBe(expected);
    });
  });

  describe('getLeftSquaresByLocation', () => {
    it('should return left squares by location', () => {
      const baseColumn = 3;
      const baseRow = 0;

      const result = getLeftSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[2], BoardMock[1], BoardMock[0]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getRightSquaresByLocation', () => {
    it('should return right squares by location', () => {
      const baseColumn = 0;
      const baseRow = 0;

      const result = getRightSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[1], BoardMock[2], BoardMock[3]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getTopSquaresByLocation', () => {
    it('should return top squares by location', () => {
      const baseColumn = 0;
      const baseRow = 3;

      const result = getTopSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[8], BoardMock[4], BoardMock[0]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getBottomSquaresByLocation', () => {
    it('should return bottom squares by location', () => {
      const baseColumn = 0;
      const baseRow = 0;

      const result = getBottomSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[4], BoardMock[8], BoardMock[12]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getUpperLeftSquaresByLocation', () => {
    it('should return upper left squares by location', () => {
      const baseColumn = 3;
      const baseRow = 3;

      const result = getUpperLeftSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[10], BoardMock[5], BoardMock[0]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getUpperRightSquaresByLocation', () => {
    it('should return upper right squares by location', () => {
      const baseColumn = 0;
      const baseRow = 3;

      const result = getUpperRightSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[9], BoardMock[6], BoardMock[3]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getLowerLeftSquaresByLocation', () => {
    it('should return lower left squares by location', () => {
      const baseColumn = 3;
      const baseRow = 0;

      const result = getLowerLeftSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[6], BoardMock[9], BoardMock[12]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getLowerRightSquaresByLocation', () => {
    it('should return lower right squares by location', () => {
      const baseColumn = 0;
      const baseRow = 0;

      const result = getLowerRightSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [BoardMock[5], BoardMock[10], BoardMock[15]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getEachDirectionSquaresByLocation', () => {
    it('should return each direction squares by location', () => {
      const baseColumn = 1;
      const baseRow = 1;

      const result = getEachDirectionSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [
        [BoardMock[4]], // left
        [BoardMock[6], BoardMock[7]], // right
        [BoardMock[1]], // top
        [BoardMock[9], BoardMock[13]], // bottom
        [BoardMock[0]], // upper left
        [BoardMock[2]], // upper right
        [BoardMock[8]], // lower left
        [BoardMock[10], BoardMock[15]], // lower right
      ];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('getSquaresHavingCanTurnOverPiece', () => {
    it.each<{
      square0: Square['piece'];
      square1: Square['piece'];
      square2: Square['piece'];
      square3: Square['piece'];
      expectedSquares: Square['key'][];
    }>`
      square0          | square1    | square2          | square3          | expectedSquares
      ${'black'}       | ${'black'} | ${'black'}       | ${'white'}       | ${['0-0', '0-1', '0-2']}
      ${'black'}       | ${'black'} | ${'white'}       | ${'black'}       | ${['0-0', '0-1']}
      ${'black'}       | ${'black'} | ${'white'}       | ${'canTurnOver'} | ${['0-0', '0-1']}
      ${'black'}       | ${'black'} | ${'white'}       | ${null}          | ${['0-0', '0-1']}
      ${'black'}       | ${'white'} | ${'black'}       | ${'black'}       | ${['0-0']}
      ${'black'}       | ${'white'} | ${'canTurnOver'} | ${'canTurnOver'} | ${['0-0']}
      ${'black'}       | ${'white'} | ${null}          | ${null}          | ${['0-0']}
      ${'black'}       | ${'black'} | ${'canTurnOver'} | ${'white'}       | ${[]}
      ${'black'}       | ${'black'} | ${null}          | ${'white'}       | ${[]}
      ${'canTurnOver'} | ${'black'} | ${'black'}       | ${'white'}       | ${[]}
      ${null}          | ${'black'} | ${'black'}       | ${'white'}       | ${[]}
      ${'white'}       | ${'black'} | ${'black'}       | ${'black'}       | ${[]}
    `(
      'should return squares having can turn over piece',
      ({ square0, square1, square2, square3, expectedSquares }) => {
        const pieceColor = 'white';
        const squares: Square[] = [
          {
            key: '0-0',
            column: 0,
            row: 0,
            piece: square0,
          },
          {
            key: '0-1',
            column: 0,
            row: 1,
            piece: square1,
          },
          {
            key: '0-2',
            column: 0,
            row: 2,
            piece: square2,
          },
          {
            key: '0-3',
            column: 0,
            row: 3,
            piece: square3,
          },
        ];

        const expected = expectedSquares.map(key =>
          squares.find(square => square.key === key),
        );

        const result = getSquaresHavingCanTurnOverPiece(squares, pieceColor);

        expect(result).toStrictEqual(expected);
      },
    );
  });

  describe('getSquaresHavingCanTurnOverPieceByEachDirection', () => {
    it('should return squares having can turn over piece by each direction', () => {
      const result = getSquaresHavingCanTurnOverPieceByEachDirection({
        board: BoardMock,
        baseSquare: BoardMock[2],
        currentTurnPiece: 'black',
      });

      const expected = [BoardMock[6]];

      expect(result).toStrictEqual(expected);
    });
  });

  describe('turnOverPieces', () => {
    it('should turn over pieces', () => {
      const expected: Board = JSON.parse(JSON.stringify(BoardMock));
      expected[0].piece = 'black';
      expected[1].piece = 'black';

      const result = turnOverPieces({
        board: BoardMock,
        targetSquares: [BoardMock[0], BoardMock[1]],
        currentTurnPiece: 'black',
      });

      expect(result).toStrictEqual(expected);
    });
  });

  describe('updateBoardByNextTurnPiece', () => {
    it('should update board by next turn piece', () => {
      const expected: Board = JSON.parse(JSON.stringify(BoardMock));
      expected[1].piece = 'canTurnOver';
      expected[4].piece = 'canTurnOver';
      expected[11].piece = 'canTurnOver';
      expected[14].piece = 'canTurnOver';
      expected[2].piece = null;
      expected[7].piece = null;
      expected[8].piece = null;
      expected[13].piece = null;

      const result = updateBoardByNextTurnPiece({
        board: BoardMock,
        nextTurnPiece: 'white',
      });

      expect(result).toStrictEqual(expected);
    });
  });
});
