import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Button, { ButtonProp } from './component';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    // creates a specific argType based on the iconMap object
    text: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template: Story<ButtonProp> = (args) => (
  <Base>
    <Button {...args}>{args.text}</Button>
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  text: 'Game Start',
};

const Base = styled.div`
  width: fit-content;
`;
