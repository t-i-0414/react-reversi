import { Meta, StoryObj } from '@storybook/react';
import { Square } from './Square';

const meta: Meta<typeof Square> = {
  title: 'features/game/Board/Square',
  component: Square,
  argTypes: {
    piece: {
      control: {
        type: 'select',
        options: {
          black: 'black',
          white: 'white',
          canTurnOver: 'canTurnOver',
          null: null,
        },
      },
    },
    dataCy: { control: { type: 'text' } },
    onclick: { action: 'onclick' },
  },
  args: {
    piece: 'black',
    dataCy: 'dataCy',
  },
};

export default meta;

type Story = StoryObj<typeof Square>;

export const Black: Story = {
  args: {
    piece: 'black',
  },
  render: args => <Square {...args} />,
};

export const White: Story = {
  args: {
    piece: 'white',
  },
  render: args => <Square {...args} />,
};

export const CanTurnOver: Story = {
  args: {
    piece: 'canTurnOver',
  },
  render: args => <Square {...args} />,
};

export const Null: Story = {
  args: {
    piece: null,
  },
  render: args => <Square {...args} />,
};
