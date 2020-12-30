import React, { useState } from 'react';
import styled from 'styled-components';
import Const from '../../const';
import getShouldReverseSquareArray from '../../utils';

import Square from '../atoms/Square';
import Piece from '../atoms/Piece';

import { BoardState, SquareState, PlayerValType } from '../../types';

const { Size, Color, PlayerVal } = Const;

interface BoardProp {
  onSideSquares: number;
}
const Board: React.FC<BoardProp> = ({ onSideSquares }) => {
  // ボードの状態の初期化メソッド
  const initializeState = (numArray: number[]): BoardState => {
    const squaresArray: SquareState[] = numArray.map(
      (num: number): SquareState => {
        return {
          id: num,
          column: num % onSideSquares,
          row: Math.floor(num / onSideSquares),
          val: PlayerVal.NONE,
        };
      },
    );

    return squaresArray;
  };

  // 一辺のマスの数から、盤面のトータルのマスの数を算出
  const squaresCountsArray: number[] = Array.from(
    new Array(onSideSquares ** 2).keys(),
  );

  // コンポーネントで使用する状態を定義
  const [playerFlg, changePlayer] = useState(true);
  const [state, updateState] = useState(initializeState(squaresCountsArray));

  // 現在のプレイヤーの値を設定
  let currentPlayerVal: PlayerValType;
  if (playerFlg) {
    currentPlayerVal = PlayerVal.WHITE;
  } else {
    currentPlayerVal = PlayerVal.BLACK;
  }

  // ひっくり返せる石があるかチェックするメソッド
  const checkCanReverseSquare = (squareCount: number): boolean => {
    const baseSquare = state[squareCount];
    const shouldReverseSquareArray: SquareState[] = getShouldReverseSquareArray(
      baseSquare,
      state,
      onSideSquares,
      currentPlayerVal,
    );

    if (shouldReverseSquareArray.length === 0) {
      return true; // FIXME:useEffectで最初に4つの石を置けるようになったらfalseに変える
    }

    return true;
  };

  // 石が置かれたときに挟まれた石をひっくり返し、プレイヤーを交代するメソッド
  const setSquare = (squareCount: number) => {
    const stateCopy: typeof state = state.slice();
    const clickedSquare: SquareState = stateCopy[squareCount];

    // ひっくり返されるべきマスをまとめておく配列を定義
    const shouldReverseSquareArray: SquareState[] = getShouldReverseSquareArray(
      clickedSquare,
      stateCopy,
      onSideSquares,
      currentPlayerVal,
    );

    // ひっくり返すマスの値を一括変更
    shouldReverseSquareArray.forEach((square) => {
      stateCopy[square.id].val = currentPlayerVal;
    });

    clickedSquare.val = currentPlayerVal;
    updateState(stateCopy);
    changePlayer(!playerFlg);
  };

  return (
    <StyledWrapper size={onSideSquares * Size.SQUARE_SIZE}>
      {squaresCountsArray.map((squareCount: number) => (
        <Square key={state[squareCount].id}>
          {checkCanReverseSquare(squareCount) && (
            <Piece
              playerVal={state[squareCount].val}
              onclick={() => {
                setSquare(squareCount);
              }}
            />
          )}
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
