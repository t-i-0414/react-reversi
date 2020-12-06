import React from 'react';
import styled from 'styled-components';
import Piece from '../atoms/Piece';
import Const from '../../const';

const { Color } = Const;

interface Square {
  key: number;
  piece: 'none' | 'block';
}

const Square: React.FC<Square> = ({ piece }) => {
  const color: string = Color.PC_INVISIBLE;
  // switch (value) {
  //   case 1:
  //     color = Color.PC_WHITE;
  //     break;
  //   case -1:
  //     color = Color.PC_BLACK;
  //     break;
  //   default:
  //     color =
  // }

  return (
    <Wrapper>
      <Piece display={piece} color={color} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: ${Color.BG_GREEN};
  border: 1px solid ${Color.BD_BLACK};
`;

export default Square;
