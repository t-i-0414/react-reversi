import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;

interface BoardProps {
  squares: number;
}

const Board: React.FC<BoardProps> = ({ squares }) => (
  <Wrapper>
    {Array.from(new Array(squares).keys()).map((i: number) => (
      <Square key={i + 1} />
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 640px;
  height: 640px;
  margin: 0 auto;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
