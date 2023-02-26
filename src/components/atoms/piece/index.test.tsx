import React from 'react';
import renderer from 'react-test-renderer';
import Piece from '.';
import { PieceColor } from '~/const';

describe('piece unit test', () => {
  it('snapshot(white)', () => {
    expect.hasAssertions();
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
        onclick={() => 'This is clickable Piece.'}
        dataCy='clickable'
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
