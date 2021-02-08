import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Square from './component';

export default {
  title: 'Square',
  component: Square,
};

const Template: Story<ComponentProps<typeof Square>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Square {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  dataCy: 'dataCy',
};
