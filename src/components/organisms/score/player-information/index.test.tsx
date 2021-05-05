import React from 'react';
import renderer from 'react-test-renderer';
import Const from 'src/const';
import PlayerInformation from '.';

const { PieceColor } = Const;

describe('PlayerInformation unit test', () => {
  it('snapshot(PieceColor White)', () => {
    const component = renderer.create(
      <PlayerInformation pieceColor={PieceColor.WHITE} score={0} />,
    );
    expect(component).toMatchSnapshot();
  });
  it('snapshot(PieceColor Black)', () => {
    const component = renderer.create(
      <PlayerInformation pieceColor={PieceColor.BLACK} score={0} />,
    );
    expect(component).toMatchSnapshot();
  });
});
