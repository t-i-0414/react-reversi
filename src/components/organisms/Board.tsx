import React, { useState } from 'react';
import styled from 'styled-components';
import Const from '../../const';

// 子要素
import Square from '../atoms/Square';
import Piece from '../atoms/Piece';

// 型
import { BoardState, SquareState } from '../../types';

const { Size, Color, Settings } = Const;

interface BoardProp {
  onSideSquares: number;
}
const Board: React.FC<BoardProp> = ({ onSideSquares }) => {
  const squaresCountsArray: number[] = Array.from(
    new Array(onSideSquares ** 2).keys(),
  );

  const initializeState = (numArray: number[]): BoardState => {
    const squaresArray: SquareState[] = numArray.map(
      (num: number): SquareState => {
        return {
          id: num,
          column: num % onSideSquares,
          row: Math.floor(num / onSideSquares),
          val: 0,
        };
      },
    );

    return squaresArray;
  };

  const [playerFlg, changePlayer] = useState(true);
  const [state, updateState] = useState(initializeState(squaresCountsArray));

  return (
    <StyledWrapper size={onSideSquares * Size.SQUARE_SIZE}>
      {squaresCountsArray.map((squareCount: number) => (
        <Square key={state[squareCount].id}>
          <Piece
            key={state[squareCount].id}
            pieceVal={state[squareCount].val}
            onclick={() => {
              // 書き換え用のstateのコピーを作成
              const stateCopy: typeof state = state.slice();

              // 現在のプレイヤーの値を設定
              let currentPlayerVal: number;
              if (playerFlg) {
                currentPlayerVal = Settings.PLAYER.WHITE.VAL;
              } else {
                currentPlayerVal = Settings.PLAYER.BLACK.VAL;
              }

              // クリックされたマスを定義
              const clickedSquare: SquareState =
                stateCopy[squaresCountsArray[squareCount]];

              // ひっくり返されるべきマスをまとめておく配列を定義
              const shouldReverseSquareArray: SquareState[] = [];

              // 渡された配列からひっくり返すべきマスを取得するメソッド
              const getShouldReverseSquareArray = (
                squareStateArray: SquareState[],
              ): SquareState[] => {
                const emptySquareIndex: number = squareStateArray.findIndex(
                  (square) => square.val === 0,
                );
                if (emptySquareIndex !== -1) {
                  squareStateArray.splice(
                    emptySquareIndex,
                    squareStateArray.length,
                  );
                }

                const endpointSquareIndex: number = squareStateArray.findIndex(
                  (square) => square.val === currentPlayerVal,
                );
                squareStateArray.splice(
                  Math.max(0, endpointSquareIndex),
                  squareStateArray.length,
                );

                return squareStateArray;
              };

              // クリックされたマスから左方向のマスを配列として取得
              const leftSideSquareArray: SquareState[] = stateCopy
                .filter((square) => {
                  return !!(
                    square.row === clickedSquare.row &&
                    square.column < clickedSquare.column
                  );
                })
                .reverse(); // クリックされたマスを起点としたいためreverseをかける

              // 左方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(leftSideSquareArray),
              );

              // クリックされたマスから右方向のマスを配列として取得
              const rightSideSquareArray: SquareState[] = stateCopy.filter(
                (square) => {
                  return !!(
                    square.row === clickedSquare.row &&
                    square.column > clickedSquare.column
                  );
                },
              );

              // 右方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(rightSideSquareArray),
              );

              // クリックされたマスから上方向のマスを配列として取得
              const upperSideSquareArray: SquareState[] = stateCopy
                .filter((square) => {
                  return !!(
                    square.row < clickedSquare.row &&
                    square.column === clickedSquare.column
                  );
                })
                .reverse(); // クリックされたマスを起点としたいためreverseをかける

              // 上方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(upperSideSquareArray),
              );

              // クリックされたマスから下方向のマスを配列として取得
              const lowerSideSquareArray: SquareState[] = stateCopy.filter(
                (square) => {
                  return !!(
                    square.row > clickedSquare.row &&
                    square.column === clickedSquare.column
                  );
                },
              );

              // 下方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(lowerSideSquareArray),
              );

              // クリックされたマスから左斜上方向のマスを配列として取得
              const upperLeftDiagonalSideSquareArray: SquareState[] = [];
              for (let count = 1; count <= onSideSquares; count += 1) {
                const squareId: number =
                  clickedSquare.id - onSideSquares * count - count;
                if (squareId >= 0 && squareId < stateCopy.length) {
                  upperLeftDiagonalSideSquareArray.push(stateCopy[squareId]);
                }
              }

              // 左斜上方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(
                  upperLeftDiagonalSideSquareArray,
                ),
              );

              // クリックされたマスから右斜上方向のマスを配列として取得
              const upperRightDiagonalSideSquareArray: SquareState[] = [];
              for (let count = 1; count <= onSideSquares; count += 1) {
                const squareId: number =
                  clickedSquare.id - onSideSquares * count + count;
                if (squareId >= 0 && squareId < stateCopy.length) {
                  upperRightDiagonalSideSquareArray.push(stateCopy[squareId]);
                }
              }

              // 右斜上方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(
                  upperRightDiagonalSideSquareArray,
                ),
              );

              // クリックされたマスから左斜下方向のマスを配列として取得
              const lowerLeftDiagonalSideSquareArray: SquareState[] = [];
              for (let count = 1; count <= onSideSquares; count += 1) {
                const squareId: number =
                  clickedSquare.id + onSideSquares * count - count;
                if (squareId >= 0 && squareId < stateCopy.length) {
                  lowerLeftDiagonalSideSquareArray.push(stateCopy[squareId]);
                }
              }

              // 左斜下方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(
                  lowerLeftDiagonalSideSquareArray,
                ),
              );

              // クリックされたマスから右斜下方向のマスを配列として取得
              const lowerRightDiagonalSideSquareArray: SquareState[] = [];
              for (let count = 1; count <= onSideSquares; count += 1) {
                const squareId: number =
                  clickedSquare.id + onSideSquares * count + count;
                if (squareId >= 0 && squareId < stateCopy.length) {
                  lowerRightDiagonalSideSquareArray.push(stateCopy[squareId]);
                }
              }

              // 右斜下方向のマスの配列の内、ひっくり返されるべきマスを一括変更用の配列に追加
              shouldReverseSquareArray.push(
                ...getShouldReverseSquareArray(
                  lowerRightDiagonalSideSquareArray,
                ),
              );

              // ひっくり返すマスの値を一括変更
              shouldReverseSquareArray.forEach((square) => {
                stateCopy[square.id].val = currentPlayerVal;
              });

              clickedSquare.val = currentPlayerVal;
              updateState(stateCopy);
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
