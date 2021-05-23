import React from 'react';
import renderer from 'react-test-renderer';
import { initialState } from 'src/redux/modules/game';
import PlayerInformation from '.';

describe('PlayerInformation unit test', () => {
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
