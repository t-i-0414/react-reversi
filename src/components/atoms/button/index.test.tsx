import { expect } from '@jest/globals';
import React from 'react';
import renderer from 'react-test-renderer';
import Button from '.';

describe('button unit test', () => {
  it('snapshot', () => {
    const component = renderer.create(
      <Button
        onClick={() => true}
        text='Game Start'
        type='button'
        dataCy='start'
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
