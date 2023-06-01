import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BoardMock } from '~/domains';
import { BoardView } from './BoardView';

const meta: Meta<typeof BoardView> = {
  title: 'features/game/Board',
  component: BoardView,
  argTypes: {
    board: { control: 'object' },
    onPlacePiece: { action: 'onPlacePiece' },
  },
  args: {
    board: BoardMock.base,
  },
};

export default meta;

type Story = StoryObj<typeof BoardView>;

export const Normal: Story = {
  render: args => <BoardView {...args} />,
};
