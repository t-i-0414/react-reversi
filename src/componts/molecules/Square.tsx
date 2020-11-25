import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Piece from '../atoms/Piece';

const { Color } = Const;

interface Square {
  key: number;
  value: number;
  piece: 'none' | 'block';
  onClick: () => void;
}

const Square: React.FC<Square> = ({ value, piece, onClick }) => {
  let color: string;
  switch (value) {
    case 1:
      color = Color.PC_WHITE;
      break;
    case -1:
      color = Color.PC_BLACK;
      break;
    default:
      color = Color.PC_INVISIBLE;
  }

  return (
    <Wrapper>
      <Piece color={color} display={piece} onClick={onClick} />
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
