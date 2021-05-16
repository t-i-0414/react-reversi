import React from 'react';
import styled from 'styled-components';
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
          Player1: Player.PLAYER_1,
          Player2: Player.PLAYER_2,
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
          invisible: PieceColor.INVISIBLE,
        },
      },
    },
    score: {
      control: { type: 'number', min: 0, max: 256 },
    },
  },
};

const Template: Story<PlayerInformationProps> = (args) => (
  <Base>
    <PlayerInformation {...args} />
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  pieceColor: PieceColor.WHITE,
  player: Player.PLAYER_1,
  score: 10,
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
