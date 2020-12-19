import React, {
  useState,
  // , useReducer
} from 'react';
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

  const initializePosition = (countsArray: number[]): BoardState => {
    const positionArray = countsArray.map(
      (i: number): SquareState => {
        return {
          column: i % onSideSquares,
          row: Math.floor(i / onSideSquares),
          val: 0,
        };
      },
    );

    return positionArray;
  };

  const [position, updatePosition] = useState(
    initializePosition(squaresCounts),
  );
  console.log(position, updatePosition);

  return (
    <StyledWrapper length={onSideSquares * 80}>
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
  length: number;
}
const StyledWrapper = styled.div<StyledWrapperProp>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.length}px;
  height: ${(props) => props.length}px;
  margin: 0 auto;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
