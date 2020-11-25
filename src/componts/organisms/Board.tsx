import React, { useState } from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;

interface BoardProps {
  sideSquares: number;
}

type Wrapper = {
  side: number;
};

const Board: React.FC<BoardProps> = ({ sideSquares }) => {
  // 一辺の長さ（sideSquares）から必要なマス目の数を計算
  const squaresCounts = Array.from(new Array(sideSquares ** 2).keys());

  // マス目に持たせる縦の座標、横の座標、マス目の値を初期化する処理
  const initPositon = squaresCounts.map((i: number) => {
    return [i % sideSquares, Math.floor(i / sideSquares), 0];
  });

  // initPositionから座標（position）ステートを初期化
  const [position, setPosition] = useState(initPositon);

  // 配列のstateは破壊的メソッドを加えられないため、positionのコピーを作成する
  const positionCopy = [...position];

  // コピーしたpositionの値を変更するメソッドとして定義する
  const updatePositionCpoyVal = (positionKey: number, playerVal: number) => {
    positionCopy[positionKey][2] = playerVal;

    return positionCopy;
  };

  return (
    <Wrapper side={sideSquares * 80}>
      {squaresCounts.map((i: number) => (
        <Square
          key={i}
          value={position[i][2]}
          piece="block"
          onClick={() => {
            setPosition(updatePositionCpoyVal(i, 1));
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
