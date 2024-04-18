/**
 * @jest-environment jsdom
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { GameMock } from '~/domains';
import type { Board } from '~/domains';
import * as StoreModule from '~/store';
import { useBoard } from './useBoard';

jest.mock<typeof import('react-redux')>('react-redux', () => ({
  ...jest.requireActual<typeof ReactRedux>('react-redux'),
  useSelector: jest.fn(
    jest.requireActual<typeof ReactRedux>('react-redux').useSelector,
  ) as any,
}));
const MockedReactRedux = ReactRedux as jest.Mocked<typeof ReactRedux>;

jest.mock<typeof import('~/store')>('~/store', () => ({
  ...jest.requireActual('~/store'),
  changeCurrentTurnPiece: jest.fn(
    jest.requireActual<typeof StoreModule>('~/store').changeCurrentTurnPiece,
  ) as any,
  updateBoard: jest.fn(
    jest.requireActual<typeof StoreModule>('~/store').updateBoard,
  ) as any,
}));
const MockedStoreModule = StoreModule as jest.Mocked<typeof StoreModule>;

const getResult = () => {
  const { result } = renderHook(() => useBoard(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MockedReactRedux.Provider store={MockedStoreModule.store}>
        {children}
      </MockedReactRedux.Provider>
    ),
  });

  return result;
};

describe('useBoard', () => {
  beforeEach(() => {
    MockedReactRedux.useSelector.mockReturnValue(GameMock.game);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('board', () => {
    it('should return board', () => {
      const result = getResult();

      expect(result.current.board).toStrictEqual(GameMock.game.board);
    });
  });

  describe('handlePlacePiece', () => {
    it('should call dispatchers', () => {
      const expectedBoard: Board = JSON.parse(
        JSON.stringify(GameMock.game.board),
      );
      expectedBoard[0].piece = null;
      expectedBoard[1].piece = 'canTurnOver';
      expectedBoard[2].piece = 'black';
      expectedBoard[3].piece = 'canTurnOver';
      expectedBoard[4].piece = null;
      expectedBoard[5].piece = 'black';
      expectedBoard[6].piece = 'black';
      expectedBoard[7].piece = null;
      expectedBoard[8].piece = null;
      expectedBoard[9].piece = 'white';
      expectedBoard[10].piece = 'black';
      expectedBoard[11].piece = 'canTurnOver';
      expectedBoard[12].piece = null;
      expectedBoard[13].piece = null;
      expectedBoard[14].piece = null;
      expectedBoard[15].piece = null;

      const result = getResult();

      result.current.handlePlacePiece(GameMock.game.board[2]);

      expect(MockedStoreModule.changeCurrentTurnPiece).toHaveBeenCalledTimes(1);
      expect(MockedStoreModule.changeCurrentTurnPiece).toHaveBeenCalledWith({
        pieceColor: 'white',
      });

      expect(MockedStoreModule.updateBoard).toHaveBeenCalledTimes(1);
      expect(MockedStoreModule.updateBoard).toHaveBeenCalledWith({
        board: expectedBoard,
      });
    });

    it('should not call dispatchers', () => {
      const result = getResult();

      result.current.handlePlacePiece(GameMock.game.board[0]);

      expect(MockedStoreModule.changeCurrentTurnPiece).toHaveBeenCalledTimes(0);
      expect(MockedStoreModule.updateBoard).toHaveBeenCalledTimes(0);
    });
  });
});
