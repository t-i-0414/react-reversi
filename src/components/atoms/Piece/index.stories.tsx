import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react/types-6-0';
import Const from 'src/const';
import Piece, { PieceProp } from './component';

const { Color } = Const;

export default {
  title: 'Piece',
  component: Piece,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: {
          white: Color.PC_WHITE,
          black: Color.PC_BLACK,
          invisible: Color.PC_INVISIBLE,
        },
      },
    },
  },
};

const Template: Story<PieceProp> = (args) => (
  <Base>
    <Piece dataCy="dataCy" {...args} />
  </Base>
);

export const normal = Template.bind({});

normal.args = {
  color: Color.PC_WHITE,
};

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
