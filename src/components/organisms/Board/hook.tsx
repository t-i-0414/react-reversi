import { useSelector, useDispatch } from 'react-redux';
import {
  updateBoardState,
  updateCurrentPlayer,
  getShouldReversibleSquaresArray,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { PlayerVal } = Const;

const useBoard = (): {
  boardSquaresArray: BoardState;
  sideSquaresCount: number;
  hasReversiblePiece: (square: SquareState) => boolean;
  reverseSquare: (squareCount: number) => void;
  hasPlacedPiece: (square: SquareState) => boolean;
} => {
  const dispatch = useDispatch();
  const {
    sideSquaresCount,
    boardState: boardSquaresArray,
    currentPlayer,
  } = useSelector((state: StoreState) => state.game);

  // Method to check if there is a stone that can be turned over
  const hasReversiblePiece = (square: SquareState): boolean => {
    const shouldReverseSquareArray: SquareState[] = getShouldReversibleSquaresArray(
      square,
      boardSquaresArray,
      sideSquaresCount,
      currentPlayer,
    );

    return !!(square.val === 0) && !!(shouldReverseSquareArray.length > 0);
  };

  // A method to check if a stone has already been placed
  const hasPlacedPiece = (square: SquareState): boolean => {
    return !!(square.val !== 0);
  };

  // The method turns over the stone that was trapped when the stone was placed and replaces the player
  const reverseSquare = (squareCount: number) => {
    const stateCopy: typeof boardSquaresArray = boardSquaresArray.slice();
    const clickedSquare: SquareState = stateCopy[squareCount];

    // The method turns over the stone that was trapped when the stone was placed and replaces the player
    const shouldReverseSquareArray: SquareState[] = getShouldReversibleSquaresArray(
      clickedSquare,
      boardSquaresArray,
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
