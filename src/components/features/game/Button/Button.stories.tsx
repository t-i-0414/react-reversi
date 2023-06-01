import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'features/game/Button',
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
    onClick: {
      action: 'onReset',
    },
    dataCy: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    text: 'Game Start',
    type: 'submit',
    dataCy: 'dataCy',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  render: args => <Button {...args} />,
};
