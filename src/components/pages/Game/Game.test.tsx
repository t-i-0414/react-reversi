import React from 'react';
import renderer from 'react-test-renderer';
import Game from './container';

describe('Game unit test', () => {
  it('snapshot', () => {
    const component = renderer.create(<Game dataCy="start" />);
    expect(component).toMatchSnapshot();
  });
});
