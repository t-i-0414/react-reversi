import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

const { Size, Color } = Const;

interface BoardProp {
  onSideSquares: number;
}
const Board: React.FC<BoardProp> = ({ children, onSideSquares }) => {
  return (
    <StyledBoard size={onSideSquares * Size.SQUARE_SIZE}>
      {children}
    </StyledBoard>
  );
};

interface StyledBoardProp {
  size: number;
}
const StyledBoard = styled.div<StyledBoardProp>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: 0 auto;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
