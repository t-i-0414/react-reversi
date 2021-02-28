import { useState, useEffect } from 'react';
import Const from 'src/const';
import { BoardStateType, SquareStateType, PlayerValType } from 'src/@types';

const { PlayerVal } = Const;

const useBoard = (
  onSideSquares: number,
): {
  boardState: BoardStateType;
  hasReversiblePiece: (squareCount: number) => boolean;
  reverseSquare: (squareCount: number) => void;
  hasPlacedPiece: (squareCount: number) => boolean;
} => {
  const initializeBoardState = (
    oneSideSquareCounts: number,
  ): BoardStateType => {
    const totalSquareCounts: number = oneSideSquareCounts ** 2;
    const boardState: BoardStateType = [];

    for (
      let squareCounts = 0;
      squareCounts < totalSquareCounts;
      squareCounts += 1
    ) {
      boardState.push({
        id: squareCounts,
        column: squareCounts % oneSideSquareCounts,
        row: Math.floor(squareCounts / oneSideSquareCounts),
        val: PlayerVal.NONE,
      });
    }

    return boardState;
  };

  const [isCurrentPlayer, changePlayer] = useState(true);
  const [boardState, updateState] = useState(
    initializeBoardState(onSideSquares),
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
        // Upper right square
        (square.column === onSideSquares / 2 - 1 &&
          square.row === onSideSquares / 2 - 1) ||
        // Upprer left square
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

    // Get an array of squares from the starting square to the top of the board
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

  // The method turns over the stone that was trapped when the stone was placed and replaces the player
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
    boardState,
    hasReversiblePiece,
    reverseSquare,
    hasPlacedPiece,
  };
};

export default useBoard;
