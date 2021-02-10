import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Square, { SquareProp } from './component';

export default {
  title: 'Square',
  component: Square,
};

const Template: Story<SquareProp> = () => <Square dataCy="dataCy" />;

export const normal = Template.bind({});
