import { expect } from '@jest/globals';
import React from 'react';
import renderer from 'react-test-renderer';
import { initialState } from '~/redux/modules/game';
import PlayerInformation from '.';

describe('playerInformation unit test', () => {
  it('snapshot(PieceColor White)', () => {
    const component = renderer.create(
      <PlayerInformation gamePlayer={initialState.players.black} />,
    );
    expect(component).toMatchSnapshot();
  });
  it('snapshot(PieceColor Black)', () => {
    const component = renderer.create(
      <PlayerInformation gamePlayer={initialState.players.white} />,
    );
    expect(component).toMatchSnapshot();
  });
});
