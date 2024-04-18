/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import * as ReactRedux from 'react-redux';
import type { Game, GameResult } from '~/domains';
import { GameMock } from '~/domains';
import * as StoreModule from '~/store';
import { useResetModal } from './useResetModal';

jest.mock<typeof import('react-redux')>('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(
    jest.requireActual<typeof ReactRedux>('react-redux').useSelector,
  ) as any,
}));
const MockedReactRedux = ReactRedux as jest.Mocked<typeof ReactRedux>;

jest.mock<typeof import('~/store')>('~/store', () => ({
  ...jest.requireActual('~/store'),
  resetGame: jest.fn(
    jest.requireActual<typeof StoreModule>('~/store').resetGame,
  ) as any,
}));
const MockedStoreModule = StoreModule as jest.Mocked<typeof StoreModule>;

const getResult = () => {
  const { result } = renderHook(() => useResetModal(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MockedReactRedux.Provider store={MockedStoreModule.store}>
        {children}
      </MockedReactRedux.Provider>
    ),
  });

  return result;
};

describe('useResetModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('gameResult', () => {
    it('should return winner', () => {
      const game: Game = JSON.parse(JSON.stringify(GameMock.game));
      game.board[0] = {
        key: '0-0',
        column: 0,
        row: 0,
        piece: 'black',
      };

      MockedReactRedux.useSelector.mockReturnValue(game);

      const result = getResult();

      const expected: GameResult = {
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

      expect(result.current.gameResult).toStrictEqual(expected);
    });

    it('should return draw', () => {
      MockedReactRedux.useSelector.mockReturnValue(GameMock.game);

      const result = getResult();

      const expected: GameResult = {
        isDraw: true,
        players: [
          {
            name: GameMock.game.blackPiecePlayer.name,
            pieceColor: 'black',
            score: 2,
          },
          {
            name: GameMock.game.whitePiecePlayer.name,
            pieceColor: 'white',
            score: 2,
          },
        ],
      };

      expect(result.current.gameResult).toStrictEqual(expected);
    });
  });

  describe('handleReset', () => {
    it('should reset game', () => {
      const result = getResult();

      act(() => {
        result.current.handleResetGame();
      });

      expect(MockedStoreModule.resetGame).toHaveBeenCalledTimes(1);
    });
  });
});
