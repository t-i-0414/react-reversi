import React from 'react';
import renderer from 'react-test-renderer';
import Square from '.';

describe('square unit test', () => {
  it('snapshot', () => {
    const component = renderer.create(<Square dataCy="square-1" />);
    expect(component).toMatchSnapshot();
  });
});
