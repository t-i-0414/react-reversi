import { Meta, StoryObj } from '@storybook/react';
import { initialState } from '~/redux/modules/game';
import PlayerInformation from '.';

const meta: Meta<typeof PlayerInformation> = {
  title: 'Molecules/PlayerInformation',
  component: PlayerInformation,
  argTypes: {
    gamePlayer: {
      control: {
        type: 'select',
        options: {
          Player1: initialState.players.black,
          Player2: initialState.players.white,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PlayerInformation>;

export const Normal: Story = {
  args: {
    gamePlayer: initialState.players.black,
  },
};
