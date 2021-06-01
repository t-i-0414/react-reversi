import { useSelector } from 'react-redux';
import PieceColor from 'src/const/piece-color';
import Utils from 'src/utils';

const {
  Game: { getUpdatableSquaresArray },
} = Utils;

const useGame = (): {
  isGameStarted: boolean;
  isGameFinished: boolean;
} => {
  const { isGameStarted, board } = useSelector((store: Store) => store.game);

  const updatableSquaresArrays = board.filter((square) => {
    return getUpdatableSquaresArray(square).length > 0;
  });

  const canPlacePieces = !!updatableSquaresArrays.find(
    (square) => square.pieceColor === PieceColor.INVISIBLE,
  );

  const isGameFinished = isGameStarted && !canPlacePieces;

  return {
    isGameStarted,
    isGameFinished,
  };
};
export default useGame;
