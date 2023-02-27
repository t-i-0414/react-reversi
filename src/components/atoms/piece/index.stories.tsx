import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';
import { PieceColor } from '~/const';
import Piece, { PieceProps } from '.';

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

const Template: Story<PieceProps> = args => (
  <Base>
    <Piece {...args} />
  </Base>
);

export const Normal = Template.bind({});

Normal.args = {
  pieceColor: PieceColor.WHITE,
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
