import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Const from 'src/const';
import Piece, { PieceProp } from './component';

const { PlayerVal } = Const;

export default {
  title: 'Atoms/Piece',
  component: Piece,
  argTypes: {
    playerVal: {
      control: {
        type: 'select',
        options: {
          white: PlayerVal.WHITE,
          black: PlayerVal.BLACK,
          invisible: PlayerVal.NONE,
        },
      },
    },
  },
};

const Template: Story<PieceProp> = (args) => (
  <Base>
    <Piece {...args} />
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  playerVal: PlayerVal.WHITE,
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
