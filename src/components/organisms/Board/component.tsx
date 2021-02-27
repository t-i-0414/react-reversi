import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

const { Size, Color } = Const;

export interface BoardProp {
  onSideSquares: number;
  dataCy: string;
}
const Board: React.FC<BoardProp> = ({ children, onSideSquares, dataCy }) => {
  return (
    <StyledBoard size={onSideSquares * Size.SQUARE_SIZE} data-cy={dataCy}>
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
  margin-bottom: 16px;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
