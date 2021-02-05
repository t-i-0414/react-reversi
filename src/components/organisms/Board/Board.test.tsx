import React from 'react';
import renderer from 'react-test-renderer';
import Board from './container';

it('Game snapshot testing', () => {
  const component = renderer.create(<Board onSideSquares={8} dataCy="board" />);
  expect(component).toMatchSnapshot();
});
