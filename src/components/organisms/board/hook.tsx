import { useSelector, useDispatch } from 'react-redux';
import { changeGamesTurn, countScore } from 'src/redux/modules/game';
import Utils from 'src/utils';

const {
  Game: { getUpdatableSquaresArray },
} = Utils;

const useBoard = (): {
  board: Board;
  sideSquaresCount: number;
  hasCanBeTurnOverPieces: (square: Square) => boolean;
  hasPlacedPiece: (square: Square) => boolean;
  placePiece: (square: Square) => void;
} => {
  const dispatch = useDispatch();
  const { sideSquaresCount, board } = useSelector((store: Store) => store.game);

  // check if there is a stone that can be turned over
  const hasCanBeTurnOverPieces = (square: Square): boolean => {
    const updatableSquaresArray: Square[] = getUpdatableSquaresArray(square);

    return !!(square.val === 0) && !!(updatableSquaresArray.length > 0);
  };

  // check if a stone has already been placed
  const hasPlacedPiece = (square: Square): boolean => {
    return !!(square.val !== 0);
  };

  // turn over the stone that was trapped when the stone was placed and switch the current player
  const placePiece = (clickedSquare: Square) => {
    const updatableSquaresArray: Square[] = getUpdatableSquaresArray(
      clickedSquare,
    );

    dispatch(changeGamesTurn(clickedSquare, updatableSquaresArray));
    dispatch(countScore());
  };

  return {
    board,
    sideSquaresCount,
    hasCanBeTurnOverPieces,
    hasPlacedPiece,
    placePiece,
  };
};

export default useBoard;
