import React from 'react';
import renderer from 'react-test-renderer';
import Button from '.';

describe('Button unit test', () => {
  it('snapshot', () => {
    const component = renderer.create(
      <Button
        onClick={() => {
          return true;
        }}
        text="Game Start"
        dataCy="start"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
