import React from 'react';
import renderer from 'react-test-renderer';
import Board from './container';

describe('Board unit test', () => {
  it('snapshot', () => {
    const component = renderer.create(
      <Board onSideSquares={8} dataCy="board" />,
    );
    expect(component).toMatchSnapshot();
  });
});
