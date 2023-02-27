import { PieceColor } from '~/const';
import { store } from '~/redux';
import type { Square, Store } from '~/types';

/**
 * Function to get arrays of the square that has piece that can be turn over in each directions from the passed square
 */
const getUpdatableSquaresArray = (passedSquare: Square): Square[] => {
  const { board, sideSquaresCount, players } = store.getState().game;

  const currentPlayerIndex = Object.entries(players).find(
    ([_id, player]) => player.current === true,
  )?.[0] as keyof Store['game']['players'];
  const currentPlayer = players[currentPlayerIndex];

  const eachDirectionSquaresArray: Array<Square[]> = [];

  // Get an array of squares from the passed square to the left
  eachDirectionSquaresArray.push(
    board
      .filter(
        square =>
          !!(
            square.row === passedSquare.row &&
            square.column < passedSquare.column
          ),
      )
      .reverse(), // Reverse to use the passed square as a starting point
  );

  // Get an array of squares from the passed square to the right side
  eachDirectionSquaresArray.push(
    board.filter(
      square =>
        !!(
          square.row === passedSquare.row && square.column > passedSquare.column
        ),
    ),
  );

  // Get an array of squares from the passed square to the top
  eachDirectionSquaresArray.push(
    board
      .filter(
        square =>
          !!(
            square.row < passedSquare.row &&
            square.column === passedSquare.column
          ),
      )
      .reverse(), // Reverse to use the passed square as a starting point
  );

  // Get an array of squares from the passed square to the bottom
  eachDirectionSquaresArray.push(
    board.filter(
      square =>
        !!(
          square.row > passedSquare.row && square.column === passedSquare.column
        ),
    ),
  );

  // Get an array of squares from the passed square to the upper left
  const upperLeftSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key - sideSquaresCount * count - count;

    const upperLeftSquare = board[squareId];

    if (
      upperLeftSquare &&
      upperLeftSquare.key < passedSquare.key &&
      upperLeftSquare.column < passedSquare.column &&
      upperLeftSquare.row < passedSquare.row
    ) {
      upperLeftSquaresArray.push(upperLeftSquare);
    }
  }
  eachDirectionSquaresArray.push(upperLeftSquaresArray);

  // Get an array of squares from the passed square to the upper right
  const upperRightSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key - sideSquaresCount * count + count;

    const upperRightSquare = board[squareId];

    if (
      upperRightSquare &&
      upperRightSquare.key < passedSquare.key &&
      upperRightSquare.column > passedSquare.column &&
      upperRightSquare.row < passedSquare.row
    ) {
      upperRightSquaresArray.push(upperRightSquare);
    }
  }
  eachDirectionSquaresArray.push(upperRightSquaresArray);

  // Get an array of squares from the passed square to the lower left
  const lowerLeftSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key + sideSquaresCount * count - count;

    const lowerLeftSquare = board[squareId];

    if (
      lowerLeftSquare &&
      lowerLeftSquare.key > passedSquare.key &&
      lowerLeftSquare.column < passedSquare.column &&
      lowerLeftSquare.row > passedSquare.row
    ) {
      lowerLeftSquaresArray.push(lowerLeftSquare);
    }
  }
  eachDirectionSquaresArray.push(lowerLeftSquaresArray);

  // Get an array of squares from the passed square to the lower right
  const lowerRightSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key + sideSquaresCount * count + count;

    const lowerRightSquare = board[squareId];

    if (
      lowerRightSquare &&
      lowerRightSquare.key > passedSquare.key &&
      lowerRightSquare.column > passedSquare.column &&
      lowerRightSquare.row > passedSquare.row
    ) {
      lowerRightSquaresArray.push(lowerRightSquare);
    }
  }
  eachDirectionSquaresArray.push(lowerRightSquaresArray);

  const updatableSquaresArray: Square[] = [];

  eachDirectionSquaresArray.forEach(squareArray => {
    const emptySquareIndex: number = squareArray.findIndex(
      square => square.pieceColor === PieceColor.INVISIBLE,
    );
    if (emptySquareIndex !== -1) {
      squareArray.splice(emptySquareIndex, squareArray.length);
    }

    const endpointSquareIndex: number = squareArray.findIndex(
      square => square.pieceColor === currentPlayer.pieceColor,
    );
    squareArray.splice(Math.max(0, endpointSquareIndex), squareArray.length);

    updatableSquaresArray.push(...squareArray);
  });

  return updatableSquaresArray;
};

export default { getUpdatableSquaresArray };
