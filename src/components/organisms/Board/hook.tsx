/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSelector, useDispatch } from 'react-redux';
import { updateBoardState, updateCurrentPlayer } from 'src/redux/modules/game';
import Const from 'src/const';

const { PlayerVal } = Const;

const useBoard = (): {
  boardSquaresArray: BoardState;
  sideSquaresCount: number;
  hasReversiblePiece: (squareCount: number) => boolean;
  reverseSquare: (squareCount: number) => void;
  hasPlacedPiece: (squareCount: number) => boolean;
} => {
  const dispatch = useDispatch();
  const {
    sideSquaresCount,
    boardState: boardSquaresArray,
    currentPlayer,
  } = useSelector((state: StoreState) => state.game);

  // Method to get the square to turn over from the passed array.....
  const getShouldReverseSquareArray = (
    baseSquare: SquareState,
    board: BoardState,
    sideSquares: number,
    playerVal: UnionValType<typeof PlayerVal>,
  ): SquareState[] => {
    const aroundSquareArrays: Array<SquareState[]> = [];

    // Get the array of squares from the starting square to the left of the board.
    aroundSquareArrays.push(
      board
        .filter((square: SquareState) => {
          return !!(
            square.row === baseSquare.row && square.column < baseSquare.column
          );
        })
        .reverse(),
    ); // Reverse to use the clicked square as a starting point

    // Get the array of squares on the right side of the board from the starting square
    aroundSquareArrays.push(
      board.filter((square: SquareState) => {
        return !!(
          square.row === baseSquare.row && square.column > baseSquare.column
        );
      }),
    );

    // Get an array of squares from the starting square to the top of the board
    aroundSquareArrays.push(
      board
        .filter((square: SquareState) => {
          return !!(
            square.row < baseSquare.row && square.column === baseSquare.column
          );
        })
        .reverse(),
    ); // Get an array of squares from the starting square to the top of the board

    // Obtain an array of squares from the starting square to the bottom of the board
    aroundSquareArrays.push(
      board.filter((square: SquareState) => {
        return !!(
          square.row > baseSquare.row && square.column === baseSquare.column
        );
      }),
    );

    // Obtain an array of squares from the starting square to the top left corner of the board
    const upperLeftDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id - sideSquares * count - count;
      if (squareId >= 0 && squareId < board.length) {
        upperLeftDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(upperLeftDiagonalSideSquareArray);

    // Obtain an array of squares from the starting square to the top right corner of the board
    const upperRightDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id - sideSquares * count + count;
      if (squareId > 0 && squareId < board.length) {
        upperRightDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(upperRightDiagonalSideSquareArray);

    // Obtain an array of squares from the starting square to the bottom left corner of the board

    const lowerLeftDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id + sideSquares * count - count;
      if (squareId >= 0 && squareId < board.length - 1) {
        lowerLeftDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(lowerLeftDiagonalSideSquareArray);

    // Obtain an array of squares from the starting square to the bottom right corner of the board
    const lowerRightDiagonalSideSquareArray: SquareState[] = [];
    for (let count = 1; count < sideSquares; count += 1) {
      const squareId: number = baseSquare.id + sideSquares * count + count;
      if (squareId >= 0 && squareId < board.length) {
        lowerRightDiagonalSideSquareArray.push(board[squareId]);
      }
    }
    aroundSquareArrays.push(lowerRightDiagonalSideSquareArray);

    const shouldReverseSquareArray: SquareState[] = [];
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
    const baseSquare: SquareState = boardSquaresArray[squareCount];
    const shouldReverseSquareArray: SquareState[] = getShouldReverseSquareArray(
      baseSquare,
      boardSquaresArray,
      sideSquaresCount,
      currentPlayer,
    );

    return !!(baseSquare.val === 0) && !!(shouldReverseSquareArray.length > 0);
  };

  // A method to check if a stone has already been placed
  const hasPlacedPiece = (squareCount: number): boolean => {
    const baseSquare: SquareState = boardSquaresArray[squareCount];

    return !!(baseSquare.val !== 0);
  };

  // The method turns over the stone that was trapped when the stone was placed and replaces the player
  const reverseSquare = (squareCount: number) => {
    const stateCopy: typeof boardSquaresArray = boardSquaresArray.slice();
    const clickedSquare: SquareState = stateCopy[squareCount];

    // The method turns over the stone that was trapped when the stone was placed and replaces the player
    const shouldReverseSquareArray: SquareState[] = getShouldReverseSquareArray(
      clickedSquare,
      stateCopy,
      sideSquaresCount,
      currentPlayer,
    );

    // Batch change the values of cells to be flipped
    shouldReverseSquareArray.forEach((square) => {
      stateCopy[square.id].val = currentPlayer;
    });

    clickedSquare.val = currentPlayer;

    const nextPlayer =
      currentPlayer === PlayerVal.BLACK ? PlayerVal.WHITE : PlayerVal.BLACK;
    dispatch(updateBoardState(stateCopy));
    dispatch(updateCurrentPlayer(nextPlayer));
  };

  return {
    boardSquaresArray,
    sideSquaresCount,
    hasReversiblePiece,
    reverseSquare,
    hasPlacedPiece,
  };
};

export default useBoard;
