import React from 'react';
import renderer from 'react-test-renderer';
import Game from './container';

it('Game snapshot testing', () => {
  const component = renderer.create(<Game dataCy="start" />);
  expect(component).toMatchSnapshot();
});
