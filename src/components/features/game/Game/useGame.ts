import { useSelector } from 'react-redux';

export const useGame = (): {
  isGameStarted: boolean;
  isGameFinished: boolean;
} => {
  const { isGameStarted, board } = useSelector((store: Store) => store.game);

  const updatableSquaresArrays = board.filter(
    square => getUpdatableSquaresArray(square).length > 0,
  );

  const canPlacePieces = !!updatableSquaresArrays.find(
    square => square.pieceColor === PieceColor.INVISIBLE,
  );

  const isGameFinished = isGameStarted && !canPlacePieces;

  return {
    isGameStarted,
    isGameFinished,
  };
};
