import { expect } from '@jest/globals';
import { cleanup } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { PlayerMap } from '~/const';
import useResetModal from './hooks';
import ResetModal from '.';

jest.mock('./hooks');
const useResetModalMock = useResetModal as jest.MockedFunction<
  typeof useResetModal
>;

describe('resetModal', () => {
  afterEach(cleanup);

  it(`snapshot(${PlayerMap.PLAYER_1.name})`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `${PlayerMap.PLAYER_1.name} win!`,
    });
    const component = renderer.create(<ResetModal />);
    expect(component).toMatchSnapshot();
  });

  it(`snapshot(${PlayerMap.PLAYER_2.name})`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `${PlayerMap.PLAYER_2.name} win!`,
    });
    const component = renderer.create(<ResetModal />);
    expect(component).toMatchSnapshot();
  });

  it(`snapshot(Draw)`, () => {
    useResetModalMock.mockReturnValue({
      onReset: () => true,
      gameResultText: `Draw!`,
    });
    const component = renderer.create(<ResetModal />);
    expect(component).toMatchSnapshot();
  });
});
