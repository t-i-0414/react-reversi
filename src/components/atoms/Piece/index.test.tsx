import React from 'react';
import renderer from 'react-test-renderer';
import Const from 'src/const';
import Piece from 'src/components/atoms/piece';

const { Player } = Const;

describe('Piece unit test', () => {
  it('snapshot(white)', () => {
    const component = renderer.create(<Piece playerVal={Player.WHITE} />);
    expect(component).toMatchSnapshot();
  });
  it('snapshot(black)', () => {
    const component = renderer.create(<Piece playerVal={Player.BLACK} />);
    expect(component).toMatchSnapshot();
  });
  it('snapshot(clickable)', () => {
    const component = renderer.create(
      <Piece
        playerVal={Player.NONE}
        onclick={() => {
          return 'This is clickable Piece.';
        }}
        dataCy="clickable"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
