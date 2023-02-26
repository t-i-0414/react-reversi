import { useSelector } from 'react-redux';
import type { Store } from '~/types';
import { PieceColor } from '~/const';
import Utils from '~/utils';

const {
  Game: { getUpdatableSquaresArray },
} = Utils;

const useGame = (): {
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
export default useGame;
