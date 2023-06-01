import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Piece } from './Piece';

const meta: Meta<typeof Piece> = {
  title: 'features/game/Piece',
  component: Piece,
  argTypes: {
    pieceColor: {
      control: {
        type: 'select',
        options: {
          white: 'white',
          black: 'black',
          canTurnOver: 'canTurnOver',
        },
      },
    },
    size: { control: { type: 'text' } },
    onclick: { action: 'clicked' },
    dataCy: { control: { type: 'text' } },
  },
  args: {
    pieceColor: 'white',
    size: '64px',
    dataCy: 'dataCY',
  },
};

export default meta;

type Story = StoryObj<typeof Piece>;

export const White: Story = {
  args: { pieceColor: 'white' },
  render: props => <Piece {...props} />,
};

export const Black: Story = {
  args: { pieceColor: 'black' },
  render: props => <Piece {...props} />,
};

export const CanTurnOver: Story = {
  args: { pieceColor: 'canTurnOver' },
  render: props => <Piece {...props} />,
};
