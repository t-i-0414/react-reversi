import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Square, { SquareProps } from './component';

export default {
  title: 'Atoms/Square',
  component: Square,
};

const Template: Story<SquareProps> = () => <Square dataCy="dataCy" />;

export const normal = Template.bind({});
