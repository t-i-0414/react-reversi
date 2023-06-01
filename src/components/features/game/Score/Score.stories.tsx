import { PlayerMock } from '~/domains';
import { ScoreView } from './ScoreView';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ScoreView> = {
  title: 'features/game/Score',
  component: ScoreView,
  argTypes: {
    currentTurnPiece: {
      control: {
        type: 'select',
        options: ['black', 'white'],
      },
    },
    blackPiecePlayerInformation: {
      control: {
        type: 'object',
      },
    },
    whitePiecePlayerInformation: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    currentTurnPiece: 'black',
    blackPiecePlayerInformation:
      PlayerMock.playerInformation.player1Information,
    whitePiecePlayerInformation:
      PlayerMock.playerInformation.player2Information,
  },
};

export default meta;

type Story = StoryObj<typeof ScoreView>;

export const Black: Story = {
  args: {
    currentTurnPiece: 'black',
  },
  render: args => <ScoreView {...args} />,
};

export const White: Story = {
  args: {
    currentTurnPiece: 'white',
  },
  render: args => <ScoreView {...args} />,
};
