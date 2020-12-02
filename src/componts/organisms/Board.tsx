import React, { useState } from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;

interface BoardProps {
  onSideSquares: number;
}

interface Wrapper {
  side: number;
}

const Board: React.FC<BoardProps> = ({ onSideSquares }) => {
  const totalSquaresCounts = Array.from(new Array(onSideSquares ** 2).keys());

  const initializeSquaresPosition = totalSquaresCounts.map((i: number) => {
    return [i % onSideSquares, Math.floor(i / onSideSquares), 0];
  });

  const [squaresPosition, setSquaresPosition] = useState(
    initializeSquaresPosition,
  );

  // 配列のstateは破壊的メソッドを加えられないため、positionのコピーを作成する
  const squaresPositionCopy = [...squaresPosition];

  // コピーしたpositionの値を変更するメソッドとして定義する
  const updateSquaresPositionCpoyVal = (
    positionKey: number,
    playerVal: number,
  ) => {
    squaresPositionCopy[positionKey][2] = playerVal;

    return squaresPositionCopy;
  };

  return (
    <Wrapper side={onSideSquares * 80}>
      {totalSquaresCounts.map((i: number) => (
        <Square
          key={i}
          value={squaresPosition[i][2]}
          piece="block"
          onClick={() => {
            setSquaresPosition(updateSquaresPositionCpoyVal(i, 1));
          }}
        />
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
