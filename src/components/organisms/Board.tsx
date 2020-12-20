import React, { useState } from 'react';
import styled from 'styled-components';

// 子要素
import Square from '../atoms/Square';
import Piece from '../atoms/Piece';

// 型
import { BoardState, SquareState } from '../../types';

// スタイル用
import Const from '../../const';

const { Color } = Const;

interface BoardProp {
  onSideSquares: number;
}
const Board: React.FC<BoardProp> = ({ onSideSquares }) => {
  const squaresCounts = Array.from(new Array(onSideSquares ** 2).keys());

  const initializeState = (countsArray: number[]): BoardState => {
    const squareArray = countsArray.map(
      (i: number): SquareState => {
        return {
          column: i % onSideSquares,
          row: Math.floor(i / onSideSquares),
          val: 0,
        };
      },
    );

    return squareArray;
  };

  const [state, updateState] = useState(initializeState(squaresCounts));
  console.log(state, updateState);

  return (
    <StyledWrapper size={onSideSquares * 80}>
      {squaresCounts.map((i: number) => (
        <Square key={i}>
          <Piece
            display="block"
            color={Color.PC_INVISIBLE}
            onclick={() => {
              console.log('clicked!');
            }}
          />
        </Square>
      ))}
    </StyledWrapper>
  );
};

interface StyledWrapperProp {
  size: number;
}
const StyledWrapper = styled.div<StyledWrapperProp>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: 0 auto;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
