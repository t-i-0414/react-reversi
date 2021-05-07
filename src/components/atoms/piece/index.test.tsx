import React from 'react';
import renderer from 'react-test-renderer';
import Const from 'src/const';
import Piece from '.';

const { PieceColor } = Const;

describe('Piece unit test', () => {
  it('snapshot(white)', () => {
    const component = renderer.create(<Piece pieceColor={PieceColor.WHITE} />);
    expect(component).toMatchSnapshot();
  });
  it('snapshot(black)', () => {
    const component = renderer.create(<Piece pieceColor={PieceColor.BLACK} />);
    expect(component).toMatchSnapshot();
  });
  it('snapshot(clickable)', () => {
    const component = renderer.create(
      <Piece
        pieceColor={PieceColor.INVISIBLE}
        onclick={() => {
          return 'This is clickable Piece.';
        }}
        dataCy="clickable"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
