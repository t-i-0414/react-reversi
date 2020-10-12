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
  border: 1px solid ${Color.BD_BLACK};
  display: flex;
  flex-wrap: wrap;
  height: 640px;
  margin: 0 auto;
  width: 640px;
`;

export default Board;
