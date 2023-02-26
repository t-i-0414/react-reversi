import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import Square, { SquareProps } from '.';

export default {
  title: 'Atoms/Square',
  component: Square,
};

const Template: Story<SquareProps> = () => <Square dataCy='dataCy' />;

export const Normal = Template.bind({});
