import { Meta, StoryObj } from '@storybook/react';
import PlayerInformation from './PlayerInformation';

const meta: Meta<typeof PlayerInformation> = {
  title: 'features/game/Score/PlayerInformation',
  component: PlayerInformation,
  argTypes: {
    name: {
      control: 'text',
    },
    score: {
      control: 'number',
    },
    pieceColor: {
      control: 'select',
      options: ['black', 'white'],
    },
    nameSide: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  args: {
    name: 'Player1',
    score: 10,
    pieceColor: 'black',
    nameSide: 'left',
  },
};

export default meta;

type Story = StoryObj<typeof PlayerInformation>;

export const Left: Story = {
  args: {
    name: 'Player1',
    pieceColor: 'black',
    nameSide: 'left',
  },
  render: props => <PlayerInformation {...props} />,
};

export const Right: Story = {
  args: {
    name: 'Player2',
    pieceColor: 'white',
    nameSide: 'right',
  },
  render: props => <PlayerInformation {...props} />,
};
