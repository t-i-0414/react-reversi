import React from 'react';
import renderer from 'react-test-renderer';
import Const from 'src/const';
import Piece from 'src/components/atoms/Piece/container';

const { PlayerVal } = Const;

describe('Piece unit test', () => {
  it('snapshot(white)', () => {
    const component = renderer.create(<Piece playerVal={PlayerVal.WHITE} />);
    expect(component).toMatchSnapshot();
  });
  it('snapshot(black)', () => {
    const component = renderer.create(<Piece playerVal={PlayerVal.BLACK} />);
    expect(component).toMatchSnapshot();
  });
  it('snapshot(clickable)', () => {
    const component = renderer.create(
      <Piece playerVal={PlayerVal.NONE} dataCy="clickable" />,
    );
    expect(component).toMatchSnapshot();
  });
});
