import { expect } from '@jest/globals';
import { base as BoardMock } from './mock';
import {
  getPieceCountByColor,
  getBoardSideSquareCount,
  getLeftSquaresByLocation,
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
      const baseColumn = 1;
      const baseRow = 0;

      const result = getLeftSquaresByLocation({
        board: BoardMock,
        baseColumn,
        baseRow,
      });

      const expected = [
        {
          key: '0-0',
          column: 0,
          row: 0,
          piece: null,
        },
      ];

      expect(result).toStrictEqual(expected);
    });
  });
});
