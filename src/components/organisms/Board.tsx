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
          id: i,
          column: i % onSideSquares,
          row: Math.floor(i / onSideSquares),
          val: 0,
        };
      },
    );

    return squareArray;
  };

  const [playerFlg, changePlayer] = useState(true);
  const [state, updateState] = useState(initializeState(squaresCounts));

  return (
    <StyledWrapper size={onSideSquares * 80}>
      {squaresCounts.map((i: number) => (
        <Square key={state[i].id}>
          <Piece
            key={state[i].id}
            pieceVal={state[i].val}
            onclick={() => {
              updateState((prevState) => {
                const stateCopy = prevState;
                let playerVal;
                if (playerFlg) {
                  playerVal = 1;
                } else {
                  playerVal = -1;
                }

                stateCopy[squaresCounts[i]].val = playerVal;

                return {
                  ...stateCopy,
                };
              });
              changePlayer(!playerFlg);
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
