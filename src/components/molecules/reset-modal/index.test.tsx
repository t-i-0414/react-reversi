import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Player from 'src/const/player';
import ResetModal from '.';
import useResetModal from './hooks';

jest.mock('./hooks');
const useResetModalMock = useResetModal as jest.MockedFunction<
  typeof useResetModal
>;

afterEach(cleanup);

describe('ResetModal', () => {
  it(`snapshot(${Player.PLAYER_1.name})`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => {
        return true;
      },
      gameResultText: `${Player.PLAYER_1.name} win!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it(`snapshot(${Player.PLAYER_2.name})`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => {
        return true;
      },
      gameResultText: `${Player.PLAYER_2.name} win!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it(`snapshot(Draw)`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => {
        return true;
      },
      gameResultText: `Draw!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
