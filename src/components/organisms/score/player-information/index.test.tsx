import React from 'react';
import renderer from 'react-test-renderer';
import Const from 'src/const';
import PlayerInformation from './index';

const { Player } = Const;

describe('Square unit test', () => {
  it('snapshot(Player White)', () => {
    const component = renderer.create(
      <PlayerInformation player={Player.WHITE} />,
    );
    expect(component).toMatchSnapshot();
  });
  it('snapshot(Player Black)', () => {
    const component = renderer.create(
      <PlayerInformation player={Player.BLACK} />,
    );
    expect(component).toMatchSnapshot();
  });
});
