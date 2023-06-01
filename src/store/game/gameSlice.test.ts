import { expect } from '@jest/globals';
import {
  reducer,
  startGame,
  updateBoard,
  changeCurrentTurnPiece,
  resetGame,
  initialState,
} from './gameSlice';

describe('gameSlice', () => {
  describe('startGame', () => {
    it('should set gameState ready', () => {
      const state = reducer(
        initialState,
        startGame({
          blackPiecePlayer: { name: 'black' },
          whitePiecePlayer: { name: 'white' },
          board: [
            {
              key: '0-0',
              column: 0,
              row: 0,
              piece: 'black',
            },
          ],
          currentTurnPiece: 'white',
        }),
      );
      expect(state).toStrictEqual({
        isStarted: true,
        board: [
          {
            key: '0-0',
            column: 0,
            row: 0,
            piece: 'black',
          },
        ],
        blackPiecePlayer: { name: 'black' },
        whitePiecePlayer: { name: 'white' },
        currentTurnPiece: 'white',
      });
    });
  });

  describe('updateBoard', () => {
    it('should update board', () => {
      const state = reducer(
        initialState,
        updateBoard({
          board: [
            {
              key: '0-0',
              column: 0,
              row: 0,
              piece: 'black',
            },
          ],
        }),
      );
      expect(state.board).toStrictEqual([
        {
          key: '0-0',
          column: 0,
          row: 0,
          piece: 'black',
        },
      ]);
    });
  });

  describe('changeCurrentTurnPiece', () => {
    it('should change current turn piece', () => {
      const state = reducer(
        {
          ...initialState,
          currentTurnPiece: 'white',
        },
        changeCurrentTurnPiece({ pieceColor: 'black' }),
      );
      expect(state.currentTurnPiece).toBe('black');
    });
  });

  describe('resetGame', () => {
    it('should reset game', () => {
      const state = reducer(
        {
          isStarted: true,
          board: [
            {
              key: '0-0',
              column: 0,
              row: 0,
              piece: 'black',
            },
          ],
          blackPiecePlayer: { name: 'black' },
          whitePiecePlayer: { name: 'white' },
          currentTurnPiece: 'white',
        },
        resetGame(),
      );
      expect(state).toStrictEqual(initialState);
    });
  });
});
