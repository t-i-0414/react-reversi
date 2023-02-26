import { render, cleanup } from '@testing-library/react';
import React from 'react';
import useResetModal from './hooks';
import ResetModal from '.';
import Player from '~/const/playerMap';

jest.mock('./hooks');
const useResetModalMock = useResetModal as jest.MockedFunction<
  typeof useResetModal
>;

afterEach(cleanup);

describe('resetModal', () => {
  it(`snapshot(${Player.PLAYER_1.name})`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `${Player.PLAYER_1.name} win!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it(`snapshot(${Player.PLAYER_2.name})`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `${Player.PLAYER_2.name} win!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it(`snapshot(Draw)`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `Draw!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
