import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    type: {
      control: {
        type: 'select',
        options: {
          submit: 'submit',
          button: 'button',
          reset: 'reset',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  args: {
    text: 'Game Start',
    type: 'submit',
  },
  decorators: [
    StoryComponent => (
      <Base>
        <StoryComponent />
      </Base>
    ),
  ],
};

const Base = styled.div`
  width: fit-content;
`;
