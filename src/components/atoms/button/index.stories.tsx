import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from '.';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template: Story<ButtonProps> = (args) => (
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
