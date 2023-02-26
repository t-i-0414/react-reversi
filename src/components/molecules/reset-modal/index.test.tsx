import { expect } from '@jest/globals';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import useResetModal from './hooks';
import ResetModal from '.';
import { PlayerMap } from '~/const';

jest.mock('./hooks');
const useResetModalMock = useResetModal as jest.MockedFunction<
  typeof useResetModal
>;

describe('resetModal', () => {
  afterEach(cleanup);

  it(`snapshot(${PlayerMap.PLAYER_1.name})`, () => {
    expect.hasAssertions();

    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `${PlayerMap.PLAYER_1.name} win!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it(`snapshot(${PlayerMap.PLAYER_2.name})`, () => {
    expect.hasAssertions();

    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `${PlayerMap.PLAYER_2.name} win!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it(`snapshot(Draw)`, () => {
    expect.hasAssertions();

    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `Draw!`,
    });
    const { asFragment } = render(<ResetModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
