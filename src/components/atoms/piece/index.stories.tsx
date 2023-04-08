import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { PieceColor } from '~/const';
import Piece from '.';

const meta: Meta<typeof Piece> = {
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

export default meta;

type Story = StoryObj<typeof Piece>;

export const Normal: Story = {
  args: { pieceColor: PieceColor.WHITE },
  decorators: [
    StoryComponent => (
      <Base>
        <StoryComponent />
      </Base>
    ),
  ],
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
