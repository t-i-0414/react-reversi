import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;

interface BoardProps {
  squaresOnSide: number;
}

type Wrapper = {
  side: number;
};

const Board: React.FC<BoardProps> = ({ squaresOnSide }) => (
  <Wrapper side={squaresOnSide * 80}>
    {Array.from(new Array(squaresOnSide ** 2).keys()).map((i: number) => (
      <Square
        key={i + 1}
        position={[i % squaresOnSide, Math.floor(i / squaresOnSide)]}
        value={0}
        piece="block"
      />
    ))}
  </Wrapper>
);

const Wrapper = styled.div<Wrapper>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.side}px;
  height: ${(props) => props.side}px;
  margin: 0 auto;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
