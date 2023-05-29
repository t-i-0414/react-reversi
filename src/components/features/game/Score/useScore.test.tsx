/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { GameMock } from '~/domains';
import { store } from '~/store';
import { useScore } from './useScore';

jest.mock<typeof import('react-redux')>('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(jest.requireActual('react-redux').useSelector) as any,
}));
const MockedReactRedux = ReactRedux as jest.Mocked<typeof ReactRedux>;

const getResult = () => {
  const { result } = renderHook(() => useScore(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MockedReactRedux.Provider store={store}>
        {children}
      </MockedReactRedux.Provider>
    ),
  });

  return result;
};

describe('useScore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('currentTurnPiece', () => {
    it('should return current turn piece(black)', () => {
      MockedReactRedux.useSelector.mockReturnValue(GameMock.game);

      const result = getResult();

      expect(result.current.currentTurnPiece).toBe('black');
    });

    it('should return current turn piece(white)', () => {
      MockedReactRedux.useSelector.mockReturnValue({
        ...GameMock.game,
        currentTurnPiece: 'white',
      });

      const result = getResult();

      expect(result.current.currentTurnPiece).toBe('white');
    });
  });

  describe('playerInformation', () => {
    it('should return player information', () => {
      MockedReactRedux.useSelector.mockReturnValue(GameMock.game);

      const result = getResult();

      expect(result.current.blackPiecePlayerInformation).toStrictEqual({
        name: 'Player1',
        pieceColor: 'black',
        score: 2,
      });

      expect(result.current.whitePiecePlayerInformation).toStrictEqual({
        name: 'Player2',
        pieceColor: 'white',
        score: 2,
      });
    });
  });
});
