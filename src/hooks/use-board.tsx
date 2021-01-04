import { useState, useEffect } from 'react';
import Const from '../const';

import { BoardStateType, SquareStateType, PlayerValType } from '../types';

const { PlayerVal } = Const;

const useBoard = (
  onSideSquares: number,
): {
  squaresCountsArray: Array<number>;
  boardState: BoardStateType;
  hasReversiblePiece: (squareCount: number) => boolean;
  reverseSquare: (squareCount: number) => void;
  hasPlacedPiece: (squareCount: number) => boolean;
} => {
  /**
   * Calculate the total number of squares on the board from the number of squares on the sides
   * @param {number} onSideSquares - Number of squares per side
   * @return - [0, 1, 2 ・・・]
   */
  const squaresCountsArray: number[] = Array.from(
    new Array(onSideSquares ** 2).keys(),
  );

  // ボードの状態の初期化メソッド
  const initializeState = (numArray: number[]): BoardStateType => {
    const squaresArray: SquareStateType[] = numArray.map(
      (num: number): SquareStateType => {
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

  // コンポーネントで使用する状態を定義
  const [isCurrentPlayer, changePlayer] = useState(true);
  const [boardState, updateState] = useState(
    initializeState(squaresCountsArray),
  );

  // 現在のプレイヤーの値を設定
  let currentPlayerVal: PlayerValType;
  if (isCurrentPlayer) {
    currentPlayerVal = PlayerVal.WHITE;
  } else {
    currentPlayerVal = PlayerVal.BLACK;
  }

  // ボードの初期レンダリング時に石を４つ互い違いに置く
  useEffect(() => {
    const stateCopy: BoardStateType = boardState.slice();
    const centerSquareArray: SquareStateType[] = stateCopy.filter((square) => {
      return (
        // 右上のマス
        (square.column === onSideSquares / 2 - 1 &&
          square.row === onSideSquares / 2 - 1) ||
        // 左上のマス
        (square.column === onSideSquares / 2 &&
          square.row === onSideSquares / 2 - 1) ||
        // 右下のマス
        (square.column === onSideSquares / 2 - 1 &&
          square.row === onSideSquares / 2) ||
        // 左下のマス
        (square.column === onSideSquares / 2 &&
          square.row === onSideSquares / 2)
      );
    });

    let isColorWhite = false;
    let playerVal: PlayerValType;
    centerSquareArray.map((square) => {
      const squareCopy = square;

      if (centerSquareArray.indexOf(square) * 2 !== centerSquareArray.length) {
        isColorWhite = !isColorWhite;
      }

      if (isColorWhite) {
        playerVal = PlayerVal.WHITE;
      } else {
        playerVal = PlayerVal.BLACK;
      }

      squareCopy.val = playerVal;

      return square;
    });

    updateState(stateCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 渡された配列からひっくり返すべきマスを取得するメソッド
  const getShouldReverseSquareArray = (
    baseSquare: SquareStateType,
    board: BoardStateType,
    sideSquares: number,
    playerVal: PlayerValType,
  ): SquareStateType[] => {
    const aroundSquareArrays: Array<SquareStateType[]> = [];

    // 起点となるマスから盤面の左方向のマスを配列として取得
    aroundSquareArrays.push(
      board
        .filter((square) => {
          return !!(
            square.row === baseSquare.row && square.column < baseSquare.column
          );
        })
        .reverse(),
    ); // クリックされたマスを起点としたいためreverseをかける

    // 起点となるマスから盤面の右方向のマスを配列として取得
    aroundSquareArrays.push(
      board.filter((square) => {
        return !!(
          square.row === baseSquare.row && square.column > baseSquare.column
        );
      }),
    );

    // 起点となるマスから盤面の上方向のマスを配列として取得
    aroundSquareArrays.push(
      board
        .filter((square) => {
          return !!(
            square.row < baseSquare.row && square.column === baseSquare.column
          );
        })
        .reverse(),
    ); // クリックされたマスを起点としたいためreverseをかける

    // 起点となるマスから盤面の下方向のマスを配列として取得
    aroundSquareArrays.push(
      board.filter((square) => {
        return !!(
          square.row > baseSquare.row && square.column === baseSquare.column
        );
      }),
    );

    // 起点となるマスから盤面の左斜上方向のマスを配列として取得
    const upperLeftDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id - sideSquares * count - count;
      if (squareId >= 0 && squareId < board.length) {
        upperLeftDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(upperLeftDiagonalSideSquareArray);

    // 起点となるマスから盤面の右斜上方向のマスを配列として取得
    const upperRightDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id - sideSquares * count + count;
      if (squareId > 0 && squareId < board.length) {
        upperRightDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(upperRightDiagonalSideSquareArray);

    // 起点となるマスから盤面の左斜下方向のマスを配列として取得

    const lowerLeftDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id + sideSquares * count - count;
      if (squareId >= 0 && squareId < board.length - 1) {
        lowerLeftDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(lowerLeftDiagonalSideSquareArray);

    // 起点となるマスから盤面の右斜下方向のマスを配列として取得
    const lowerRightDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id + sideSquares * count + count;
      if (squareId >= 0 && squareId < board.length) {
        lowerRightDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(lowerRightDiagonalSideSquareArray);

    const shouldReverseSquareArray: SquareStateType[] = [];
    aroundSquareArrays.forEach((squareArray) => {
      const emptySquareIndex: number = squareArray.findIndex(
        (square) => square.val === 0,
      );
      if (emptySquareIndex !== -1) {
        squareArray.splice(emptySquareIndex, squareArray.length);
      }

      const endpointSquareIndex: number = squareArray.findIndex(
        (square) => square.val === playerVal,
      );
      squareArray.splice(Math.max(0, endpointSquareIndex), squareArray.length);

      shouldReverseSquareArray.push(...squareArray);
    });

    return shouldReverseSquareArray;
  };

  // ひっくり返せる石があるかチェックするメソッド
  const hasReversiblePiece = (squareCount: number): boolean => {
    const baseSquare = boardState[squareCount];
    const shouldReverseSquareArray: SquareStateType[] = getShouldReverseSquareArray(
      baseSquare,
      boardState,
      onSideSquares,
      currentPlayerVal,
    );

    return !!(baseSquare.val === 0) && !!(shouldReverseSquareArray.length > 0);
  };

  // すでに置かれた石があるかチェックするメソッド
  const hasPlacedPiece = (squareCount: number): boolean => {
    const baseSquare = boardState[squareCount];

    return !!(baseSquare.val !== 0);
  };

  // 石が置かれたときに挟まれた石をひっくり返し、プレイヤーを交代するメソッド
  const reverseSquare = (squareCount: number) => {
    const stateCopy: typeof boardState = boardState.slice();
    const clickedSquare: SquareStateType = stateCopy[squareCount];

    // ひっくり返されるべきマスをまとめておく配列を定義
    const shouldReverseSquareArray: SquareStateType[] = getShouldReverseSquareArray(
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
    changePlayer(!isCurrentPlayer);
  };

  return {
    squaresCountsArray,
    boardState,
    hasReversiblePiece,
    reverseSquare,
    hasPlacedPiece,
  };
};

export default useBoard;
