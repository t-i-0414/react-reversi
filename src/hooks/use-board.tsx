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

  // Board state initialization method
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

  // Define the state to be used by the component
  const [isCurrentPlayer, changePlayer] = useState(true);
  const [boardState, updateState] = useState(
    initializeState(squaresCountsArray),
  );

  // Set the value for the current player
  let currentPlayerVal: PlayerValType;
  if (isCurrentPlayer) {
    currentPlayerVal = PlayerVal.WHITE;
  } else {
    currentPlayerVal = PlayerVal.BLACK;
  }

  // Place four stones on top of each other when the board is initially rendered
  useEffect(() => {
    const stateCopy: BoardStateType = boardState.slice();
    const centerSquareArray: SquareStateType[] = stateCopy.filter((square) => {
      return (
        // Top right square
        (square.column === onSideSquares / 2 - 1 &&
          square.row === onSideSquares / 2 - 1) ||
        // Top left square
        (square.column === onSideSquares / 2 &&
          square.row === onSideSquares / 2 - 1) ||
        // Lower right square
        (square.column === onSideSquares / 2 - 1 &&
          square.row === onSideSquares / 2) ||
        // Lower left square
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

  // Method to get the square to turn over from the passed array
  const getShouldReverseSquareArray = (
    baseSquare: SquareStateType,
    board: BoardStateType,
    sideSquares: number,
    playerVal: PlayerValType,
  ): SquareStateType[] => {
    const aroundSquareArrays: Array<SquareStateType[]> = [];

    // Get the array of squares from the starting square to the left of the board.
    aroundSquareArrays.push(
      board
        .filter((square) => {
          return !!(
            square.row === baseSquare.row && square.column < baseSquare.column
          );
        })
        .reverse(),
    ); // Reverse to use the clicked square as a starting point

    // Get the array of squares on the right side of the board from the starting square
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
    ); // Get an array of squares from the starting square to the top of the board

    // Obtain an array of squares from the starting square to the bottom of the board
    aroundSquareArrays.push(
      board.filter((square) => {
        return !!(
          square.row > baseSquare.row && square.column === baseSquare.column
        );
      }),
    );

    // Obtain an array of squares from the starting square to the top left corner of the board
    const upperLeftDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id - sideSquares * count - count;
      if (squareId >= 0 && squareId < board.length) {
        upperLeftDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(upperLeftDiagonalSideSquareArray);

    // Obtain an array of squares from the starting square to the top right corner of the board
    const upperRightDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id - sideSquares * count + count;
      if (squareId > 0 && squareId < board.length) {
        upperRightDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(upperRightDiagonalSideSquareArray);

    // Obtain an array of squares from the starting square to the bottom left corner of the board

    const lowerLeftDiagonalSideSquareArray: SquareStateType[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id + sideSquares * count - count;
      if (squareId >= 0 && squareId < board.length - 1) {
        lowerLeftDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(lowerLeftDiagonalSideSquareArray);

    // Obtain an array of squares from the starting square to the bottom right corner of the board
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

  // Method to check if there is a stone that can be turned over
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

  // A method to check if a stone has already been placed
  const hasPlacedPiece = (squareCount: number): boolean => {
    const baseSquare = boardState[squareCount];

    return !!(baseSquare.val !== 0);
  };

  // 石が置かれたときに挟まれた石をひっくり返し、プレイヤーを交代するメソッド
  const reverseSquare = (squareCount: number) => {
    const stateCopy: typeof boardState = boardState.slice();
    const clickedSquare: SquareStateType = stateCopy[squareCount];

    // The method turns over the stone that was trapped when the stone was placed and replaces the player
    const shouldReverseSquareArray: SquareStateType[] = getShouldReverseSquareArray(
      clickedSquare,
      stateCopy,
      onSideSquares,
      currentPlayerVal,
    );

    // Batch change the values of cells to be flipped
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
