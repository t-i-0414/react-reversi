import { useSelector, useDispatch } from 'react-redux';
import { changeGamesTurn } from 'src/redux/modules/game';
import Utils from 'src/utils';

const {
  Game: { getUpdatableSquaresArray },
} = Utils;

const useBoard = (): {
  boardState: BoardState;
  sideSquaresCount: number;
  hasCanBeTurnOverPieces: (square: SquareState) => boolean;
  hasPlacedPiece: (square: SquareState) => boolean;
  placePiece: (square: SquareState) => void;
} => {
  const dispatch = useDispatch();
  const { sideSquaresCount, boardState } = useSelector(
    (state: StoreState) => state.game,
  );

  // check if there is a stone that can be turned over
  const hasCanBeTurnOverPieces = (square: SquareState): boolean => {
    const updatableSquaresArray: SquareState[] = getUpdatableSquaresArray(
      square,
    );

    return !!(square.val === 0) && !!(updatableSquaresArray.length > 0);
  };

  // check if a stone has already been placed
  const hasPlacedPiece = (square: SquareState): boolean => {
    return !!(square.val !== 0);
  };

  // turn over the stone that was trapped when the stone was placed and switch the current player
  const placePiece = (clickedSquare: SquareState) => {
    const updatableSquaresArray: SquareState[] = getUpdatableSquaresArray(
      clickedSquare,
    );

    dispatch(changeGamesTurn(clickedSquare, updatableSquaresArray));
  };

  return {
    boardState,
    sideSquaresCount,
    hasCanBeTurnOverPieces,
    hasPlacedPiece,
    placePiece,
  };
};

export default useBoard;
