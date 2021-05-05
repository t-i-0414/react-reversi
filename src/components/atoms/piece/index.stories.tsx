import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Const from 'src/const';
import Piece, { PieceProps } from '.';

const { PieceColor } = Const;

export default {
  title: 'Atoms/Piece',
  component: Piece,
  argTypes: {
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
  },
};

const Template: Story<PieceProps> = (args) => (
  <Base>
    <Piece {...args} />
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  pieceColor: PieceColor.WHITE,
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
