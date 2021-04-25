import store from 'src/redux/create-store';

/**
 * Method to get arrays of the square that has piece that can be turn over in each directions from the passed square
 */
const getUpdatableSquaresArray = (passedSquare: Square): Square[] => {
  const { boardState, sideSquaresCount, currentPlayer } = store.getState().game;

  const eachDirectionSquaresArray: Array<Square[]> = [];

  // Get an array of squares from the passed square to the left
  eachDirectionSquaresArray.push(
    boardState
      .filter((square) => {
        return !!(
          square.row === passedSquare.row && square.column < passedSquare.column
        );
      })
      .reverse(), // Reverse to use the passed square as a starting point
  );

  // Get an array of squares from the passed square to the right side
  eachDirectionSquaresArray.push(
    boardState.filter((square) => {
      return !!(
        square.row === passedSquare.row && square.column > passedSquare.column
      );
    }),
  );

  // Get an array of squares from the passed square to the top
  eachDirectionSquaresArray.push(
    boardState
      .filter((square) => {
        return !!(
          square.row < passedSquare.row && square.column === passedSquare.column
        );
      })
      .reverse(), // Reverse to use the passed square as a starting point
  );

  // Get an array of squares from the passed square to the bottom
  eachDirectionSquaresArray.push(
    boardState.filter((square) => {
      return !!(
        square.row > passedSquare.row && square.column === passedSquare.column
      );
    }),
  );

  // Get an array of squares from the passed square to the upper left
  const upperLeftSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key - sideSquaresCount * count - count;
    if (squareId >= 0 && squareId < boardState.length) {
      upperLeftSquaresArray.push(boardState[squareId]);
    }
  }
  eachDirectionSquaresArray.push(upperLeftSquaresArray);

  // Get an array of squares from the passed square to the upper right
  const upperRightSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key - sideSquaresCount * count + count;
    if (squareId > 0 && squareId < boardState.length) {
      upperRightSquaresArray.push(boardState[squareId]);
    }
  }
  eachDirectionSquaresArray.push(upperRightSquaresArray);

  // Get an array of squares from the passed square to the lower left
  const lowerLeftSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key + sideSquaresCount * count - count;
    if (squareId >= 0 && squareId < boardState.length - 1) {
      lowerLeftSquaresArray.push(boardState[squareId]);
    }
  }
  eachDirectionSquaresArray.push(lowerLeftSquaresArray);

  // Get an array of squares from the passed square to the lower right
  const lowerRightSquaresArray: Square[] = [];
  for (let count = 1; count < sideSquaresCount; count += 1) {
    const squareId: number =
      passedSquare.key + sideSquaresCount * count + count;
    if (squareId >= 0 && squareId < boardState.length) {
      lowerRightSquaresArray.push(boardState[squareId]);
    }
  }
  eachDirectionSquaresArray.push(lowerRightSquaresArray);

  const updatableSquaresArray: Square[] = [];

  eachDirectionSquaresArray.forEach((squareArray) => {
    const emptySquareIndex: number = squareArray.findIndex(
      (square) => square.val === 0,
    );
    if (emptySquareIndex !== -1) {
      squareArray.splice(emptySquareIndex, squareArray.length);
    }

    const endpointSquareIndex: number = squareArray.findIndex(
      (square) => square.val === currentPlayer,
    );
    squareArray.splice(Math.max(0, endpointSquareIndex), squareArray.length);

    updatableSquaresArray.push(...squareArray);
  });

  return updatableSquaresArray;
};

export default { getUpdatableSquaresArray };
