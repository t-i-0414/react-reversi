import React, { useState } from 'react';
import styled from 'styled-components';
import Const from '../../const';

// 子要素
import Square from '../atoms/Square';
import Piece from '../atoms/Piece';

// 型
import { BoardState, SquareState, PlayerValType } from '../../types';

const { Size, Color, PlayerVal } = Const;

interface BoardProp {
  onSideSquares: number;
}
const Board: React.FC<BoardProp> = ({ onSideSquares }) => {
  // 一辺のマスの数から、盤面のトータルのマスの数を算出
  const squaresCountsArray: number[] = Array.from(
    new Array(onSideSquares ** 2).keys(),
  );

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

  // 使用する状態を定義
  const [playerFlg, changePlayer] = useState(true);
  const [state, updateState] = useState(initializeState(squaresCountsArray));

  // 現在のプレイヤーの値を設定
  let currentPlayerVal: PlayerValType;
  if (playerFlg) {
    currentPlayerVal = PlayerVal.WHITE;
  } else {
    currentPlayerVal = PlayerVal.BLACK;
  }

  // 石が置かれた際にボードの状態を更新するメソッド
  const setSquare = (squareCount: number) => {
    // 書き換え用のstateのコピーを作成
    const stateCopy: typeof state = state.slice();

    // クリックされたマスを定義
    const clickedSquare: SquareState = stateCopy[squareCount];

    // クリックされたマスから左方向のマスを配列として取得
    const leftSideSquareArray: SquareState[] = stateCopy
      .filter((square) => {
        return !!(
          square.row === clickedSquare.row &&
          square.column < clickedSquare.column
        );
      })
      .reverse(); // クリックされたマスを起点としたいためreverseをかける

    // クリックされたマスから右方向のマスを配列として取得
    const rightSideSquareArray: SquareState[] = stateCopy.filter((square) => {
      return !!(
        square.row === clickedSquare.row && square.column > clickedSquare.column
      );
    });

    // クリックされたマスから上方向のマスを配列として取得
    const upperSideSquareArray: SquareState[] = stateCopy
      .filter((square) => {
        return !!(
          square.row < clickedSquare.row &&
          square.column === clickedSquare.column
        );
      })
      .reverse(); // クリックされたマスを起点としたいためreverseをかける

    // クリックされたマスから下方向のマスを配列として取得
    const lowerSideSquareArray: SquareState[] = stateCopy.filter((square) => {
      return !!(
        square.row > clickedSquare.row && square.column === clickedSquare.column
      );
    });

    // クリックされたマスから左斜上方向のマスを配列として取得
    const upperLeftDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < onSideSquares; count += 1) {
      const squareId: number = clickedSquare.id - onSideSquares * count - count;
      if (squareId >= 0 && squareId < stateCopy.length) {
        upperLeftDiagonalSideSquareArray.push(stateCopy[squareId]);
      }
    }

    // クリックされたマスから右斜上方向のマスを配列として取得
    const upperRightDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < onSideSquares; count += 1) {
      const squareId: number = clickedSquare.id - onSideSquares * count + count;
      if (squareId > 0 && squareId < stateCopy.length) {
        upperRightDiagonalSideSquareArray.push(stateCopy[squareId]);
      }
    }

    // クリックされたマスから左斜下方向のマスを配列として取得
    const lowerLeftDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < onSideSquares; count += 1) {
      const squareId: number = clickedSquare.id + onSideSquares * count - count;
      if (squareId >= 0 && squareId < stateCopy.length - 1) {
        lowerLeftDiagonalSideSquareArray.push(stateCopy[squareId]);
      }
    }

    // クリックされたマスから右斜下方向のマスを配列として取得
    const lowerRightDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < onSideSquares; count += 1) {
      const squareId: number = clickedSquare.id + onSideSquares * count + count;
      if (squareId >= 0 && squareId < stateCopy.length) {
        lowerRightDiagonalSideSquareArray.push(stateCopy[squareId]);
      }
    }

    // 渡された配列からひっくり返すべきマスを取得するメソッド
    const getShouldReverseSquareArray = (
      squareArrays: Array<SquareState[]>,
    ): SquareState[] => {
      const shouldReverseSquareArray: SquareState[] = [];
      squareArrays.forEach((squareArray) => {
        const emptySquareIndex: number = squareArray.findIndex(
          (square) => square.val === 0,
        );
        if (emptySquareIndex !== -1) {
          squareArray.splice(emptySquareIndex, squareArray.length);
        }

        const endpointSquareIndex: number = squareArray.findIndex(
          (square) => square.val === currentPlayerVal,
        );
        squareArray.splice(
          Math.max(0, endpointSquareIndex),
          squareArray.length,
        );

        shouldReverseSquareArray.push(...squareArray);
      });

      return shouldReverseSquareArray;
    };

    // ひっくり返されるべきマスをまとめておく配列を定義
    const shouldReverseSquareArray: SquareState[] = [];

    // 各方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
    shouldReverseSquareArray.push(
      ...getShouldReverseSquareArray([
        leftSideSquareArray,
        rightSideSquareArray,
        upperSideSquareArray,
        lowerSideSquareArray,
        upperLeftDiagonalSideSquareArray,
        upperRightDiagonalSideSquareArray,
        lowerLeftDiagonalSideSquareArray,
        lowerRightDiagonalSideSquareArray,
      ]),
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
          <Piece
            playerVal={state[squareCount].val}
            onclick={() => {
              setSquare(squareCount);
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
