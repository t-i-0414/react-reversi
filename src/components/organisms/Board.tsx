import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SqiuareState } from '../../types';
import { addSquares } from '../../actions';
import Square from '../molecules/Square';

import Const from '../../const';

const { Color } = Const;

interface BoardProps {
  onSideSquares: number;
}

interface Wrapper {
  side: number;
}

const Board: React.FC<BoardProps> = ({ onSideSquares }) => {
  const dispatch = useDispatch();

  const totalSquaresCounts = Array.from(new Array(onSideSquares ** 2).keys());

  const initializeSquaresPosition = totalSquaresCounts.map(
    (i: number): SqiuareState => {
      return {
        column: Math.floor(i / onSideSquares),
        row: i % onSideSquares,
        val: 0,
      };
    },
  );

  dispatch(addSquares(initializeSquaresPosition));

  return (
    <Wrapper side={onSideSquares * 80}>
      {totalSquaresCounts.map((i: number) => (
        <Square key={i} piece="block" />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<Wrapper>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.side}px;
  height: ${(props) => props.side}px;
  margin: 0 auto;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
