import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Button, { ButtonProp } from './component';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    // creates a specific argType based on the iconMap object
    children: {
      control: {
        type: 'text',
      },
    },
  },
};
interface EnhancedButtonProp extends ButtonProp {
  children: React.ReactNode;
}
const Template: Story<EnhancedButtonProp> = (args) => (
  <Base>
    <Button {...args}>{args.children}</Button>
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  children: 'Game Start',
};

const Base = styled.div`
  width: fit-content;
`;
