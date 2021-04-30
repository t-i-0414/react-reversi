import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Const from 'src/const';
import Piece, { PieceProps } from '.';

const { Player } = Const;

export default {
  title: 'Atoms/Piece',
  component: Piece,
  argTypes: {
    playerVal: {
      control: {
        type: 'select',
        options: {
          white: Player.WHITE,
          black: Player.BLACK,
          invisible: Player.NONE,
        },
      },
    },
  },
};

const Template: Story<PieceProps> = (args) => (
  <Base>
    <Piece {...args} />
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  playerVal: Player.WHITE,
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
