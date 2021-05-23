import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Const from 'src/const';
import PlayerInformation, { PlayerInformationProps } from '.';

const { PieceColor, Player } = Const;

export default {
  title: 'Molecules/PlayerInformation',
  component: PlayerInformation,
  argTypes: {
    player: {
      control: {
        type: 'select',
        options: {
          Player1: Player.PLAYER_1.value,
          Player2: Player.PLAYER_2.value,
          PlayerCOM: Player.COM,
        },
      },
    },
    pieceColor: {
      control: {
        type: 'select',
        options: {
          white: PieceColor.WHITE,
          black: PieceColor.BLACK,
        },
      },
    },
    score: {
      control: { type: 'number', min: 0, max: 256 },
    },
  },
};

const Template: Story<PlayerInformationProps> = (args) => (
  <PlayerInformation {...args} />
);

export const normal = Template.bind({});

normal.args = {
  pieceColor: PieceColor.WHITE,
  player: Player.PLAYER_1.value,
  score: 10,
};
